const recipeForm = document.getElementById("recipe-form");
const categoryCheckboxes = document.querySelectorAll("input[name='category']");
const selectedCategoriesDisplay = document.getElementById("selected-categories");
const pageTitle = document.querySelector("#admin-panel h1");
const submitButton = recipeForm ? recipeForm.querySelector("button[type='submit']") : null;
const API_BASE_URL = "http://localhost:3000";
const editRecipeId = new URLSearchParams(window.location.search).get("id");

async function getAccessToken() {
	if (!window.supabaseClient || !window.supabaseClient.auth || typeof window.supabaseClient.auth.getSession !== "function") {
		return "";
	}

	const { data, error } = await window.supabaseClient.auth.getSession();
	if (error) {
		throw new Error(error.message || "Failed to read Supabase session.");
	}

	return data && data.session && data.session.access_token ? data.session.access_token : "";
}

function normalizeIngredientLines(rawIngredients) {
	return (rawIngredients || "")
		.toString()
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => line.replace(/^\d+[.)]\s*/, "").replace(/^[-*•]\s*/, "").trim())
		.filter(Boolean);
}

function formatIngredientsAsNumberedList(lines) {
	return lines.map((line, index) => `${index + 1}. ${line}`).join("\n");
}

function applyIngredientNumbering() {
	if (!recipeForm) return;
	const ingredientsField = recipeForm.elements.ingredients;
	const ingredientLines = normalizeIngredientLines(ingredientsField.value);
	ingredientsField.value = formatIngredientsAsNumberedList(ingredientLines);
}

function isHttpUrl(urlValue) {
	try {
		const parsed = new URL(urlValue);
		return parsed.protocol === "http:" || parsed.protocol === "https:";
	} catch (_error) {
		return false;
	}
}

function validateImageUrl(urlValue) {
	if (!isHttpUrl(urlValue)) {
		return Promise.resolve({
			ok: false,
			message: "Please enter a valid image URL starting with http:// or https://"
		});
	}

	return new Promise((resolve) => {
		const img = new Image();
		const timeoutMs = 8000;
		const timeoutId = setTimeout(() => {
			resolve({
				ok: false,
				message: "Could not verify the image URL (timeout). Please check the URL and try again."
			});
		}, timeoutMs);

		img.onload = () => {
			clearTimeout(timeoutId);
			resolve({ ok: true });
		};

		img.onerror = () => {
			clearTimeout(timeoutId);
			resolve({
				ok: false,
				message: "The URL could not be loaded as an image."
			});
		};

		img.src = urlValue;
	});
}

// Function to update the selected categories display
function updateCategoryDisplay() {
	if (!selectedCategoriesDisplay) return;
	
	const checkedBoxes = Array.from(categoryCheckboxes).filter((checkbox) => checkbox.checked);
	selectedCategoriesDisplay.innerHTML = "";

	if (checkedBoxes.length > 0) {
		checkedBoxes.forEach((checkbox) => {
			const tag = document.createElement("div");
			tag.className = "category-tag";
			tag.textContent = checkbox.value;
			selectedCategoriesDisplay.appendChild(tag);
		});
	}
}

// Update display when checkbox changes
categoryCheckboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", updateCategoryDisplay);
});

// Initialize display on page load
document.addEventListener("DOMContentLoaded", updateCategoryDisplay);

function setCategorySelections(categories) {
	const selected = new Set(Array.isArray(categories) ? categories : []);
	categoryCheckboxes.forEach((checkbox) => {
		checkbox.checked = selected.has(checkbox.value);
	});
	updateCategoryDisplay();
}

async function loadRecipeForEditing(recipeId) {
	if (!recipeId || !recipeForm) return;

	if (pageTitle) {
		pageTitle.textContent = "Update Recipe";
	}

	if (submitButton) {
		submitButton.textContent = "Update Recipe";
	}

	document.title = "Update Recipe";

	try {
		const response = await fetch(`${API_BASE_URL}/api/recipes/${encodeURIComponent(recipeId)}`, {
			headers: {
				Accept: "application/json"
			}
		});

		if (!response.ok) {
			let details = `Failed to load recipe (${response.status})`;
			try {
				const parsed = await response.json();
				details = parsed.details || parsed.error || details;
			} catch (_error) {
				// Keep default details when body is not JSON.
			}
			throw new Error(details);
		}

		const recipe = await response.json();
		recipeForm.elements.name.value = recipe.name || "";
		recipeForm.elements.imageUrl.value = recipe.image || "";
		recipeForm.elements.altText.value = recipe.alt || "";
		recipeForm.elements.ingredients.value = Array.isArray(recipe.ingredients)
			? recipe.ingredients.join("\n")
			: (recipe.ingredients || "");
		recipeForm.elements.instructions.value = Array.isArray(recipe.instructions)
			? recipe.instructions.join("\n")
			: (recipe.instructions || "");

		const recipeCategories = Array.isArray(recipe.categories)
			? recipe.categories
			: recipe.category
				? [recipe.category]
				: [];
		setCategorySelections(recipeCategories);
	} catch (error) {
		alert(`Could not load recipe for editing. ${error.message}`);
		console.error(error);
	}
}

void loadRecipeForEditing(editRecipeId);

if (recipeForm) {
	const ingredientsField = recipeForm.elements.ingredients;
	ingredientsField.addEventListener("blur", applyIngredientNumbering);
}

if (recipeForm) {
	recipeForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(recipeForm);
		const imageUrl = (formData.get("imageUrl") || "").toString().trim();
		const ingredients = normalizeIngredientLines(formData.get("ingredients") || "");

		const categories = Array.from(categoryCheckboxes)
			.filter((checkbox) => checkbox.checked)
			.map((checkbox) => checkbox.value);

		if (categories.length === 0) {
			alert("Please select at least one category.");
			return;
		}

		if (ingredients.length === 0) {
			alert("Please add at least one ingredient, one per line.");
			return;
		}

		const imageCheck = await validateImageUrl(imageUrl);
		if (!imageCheck.ok) {
			alert(imageCheck.message);
			return;
		}

		const recipe = {
			id: editRecipeId || `rec-${Date.now()}`,
			name: (formData.get("name") || "").toString().trim(),
			categories: categories,
			image: imageUrl,
			alt: (formData.get("altText") || "").toString().trim(),
			ingredients,
			instructions: (formData.get("instructions") || "").toString().trim()
		};

		const isEditMode = Boolean(editRecipeId);
		const requestUrl = isEditMode
			? `${API_BASE_URL}/api/recipes/${encodeURIComponent(editRecipeId)}`
			: `${API_BASE_URL}/api/recipes`;
		const requestMethod = isEditMode ? "PUT" : "POST";
		const accessToken = await getAccessToken();

		if (!accessToken) {
			alert("Please log in as admin before saving a recipe.");
			window.location.href = "login.html";
			return;
		}

		try {
			const response = await fetch(requestUrl, {
				method: requestMethod,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`
				},
				body: JSON.stringify(recipe)
			});

			if (!response.ok) {
				const responseText = await response.text();
				let details = responseText;

				try {
					const parsed = JSON.parse(responseText);
					details = parsed.details || parsed.error || responseText;
				} catch (_error) {
					// Keep plain text details when response is not JSON.
				}

				throw new Error(`Failed to add recipe (${response.status}): ${details}`);
			}

			alert(isEditMode ? "Recipe Updated!" : "Recipe Added!");
			window.location.href = "index.html";
		} catch (error) {
			alert(`Could not add recipe. ${error.message}`);
			console.error(error);
		}
	});
}
