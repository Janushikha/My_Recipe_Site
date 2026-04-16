let recipes = [];
const ADMIN_EMAIL = "janug0227@gmail.com";
let isAdminLoggedIn = false;
const API_BASE_URL =
	window.location.protocol === "file:" || window.location.port !== "3000"
		? "http://localhost:3000"
		: "";

function normalizeRecipe(row, index) {
	const normalizedIngredients = Array.isArray(row.ingredients)
		? row.ingredients
		: typeof row.ingredients === "string"   
			? row.ingredients.split("\n").map((item) => item.trim()).filter(Boolean)
			: [];

	const normalizedInstructions = Array.isArray(row.instructions)
		? row.instructions.join(" ")
		: (row.instructions || "");

	return {
		id: row.id || `rec-${String(index + 1).padStart(3, "0")}`,
		name: row.name || "Untitled Recipe",
		category: row.category || "Uncategorized",
		categories: Array.isArray(row.categories) ? row.categories : undefined,
		ingredients: normalizedIngredients,
		instructions: normalizedInstructions,
		image: row.image || "",
		alt: row.alt || (row.name ? `${row.name} recipe image` : "Recipe image")
	};
}

async function loadRecipesFromApi() {
	if (!recipesGrid) return;

	recipesGrid.innerHTML = "<p class=\"no-results\">Loading recipes...</p>";

	try {
		const response = await fetch(`${API_BASE_URL}/api/recipes`, {
			headers: {
				Accept: "application/json"
			}
		});

		if (!response.ok) {
			let errorText = `API request failed: ${response.status}`;
			try {
				const errorJson = await response.json();
				errorText = errorJson.details || errorJson.error || errorText;
			} catch (_error) {
				// Keep default error text when body is not JSON.
			}
			throw new Error(errorText);
		}

		const data = await response.json();
		recipes = Array.isArray(data) ? data.map(normalizeRecipe) : [];
		populateCategoryOptions();
		renderRecipes(recipes);
	} catch (error) {
		console.error("Failed to fetch recipes from backend API:", error);
		recipesGrid.innerHTML = `<p class="no-results">Could not load recipes from API. ${error.message}</p>`;
	}
}

const categorySelect = document.getElementById("category");
const recipeSearch = document.getElementById("recipeSearch");
const recipesGrid = document.getElementById("recipesGrid");
const recipeModal = document.getElementById("recipeModal");
const closeModalButton = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");
const navActionButton = document.querySelector(".nav-btn");

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

function updateAdminNav() {
	if (!navActionButton) return;

	if (isAdminLoggedIn) {
		navActionButton.textContent = "Admin Dashboard";
		navActionButton.href = "add_recipe.html";
	} else {
		navActionButton.textContent = "Admin Login";
		navActionButton.href = "login.html";
	}
}

async function checkAdminSession() {
	try {
		if (!window.supabaseClient || !window.supabaseClient.auth || typeof window.supabaseClient.auth.getSession !== "function") {
			isAdminLoggedIn = false;
			updateAdminNav();
			return;
		}

		const { data, error } = await window.supabaseClient.auth.getSession();
		if (error) {
			console.error("Failed to check auth session:", error);
			isAdminLoggedIn = false;
			updateAdminNav();
			return;
		}

		const sessionEmail = data && data.session && data.session.user
			? (data.session.user.email || "")
			: "";

		isAdminLoggedIn = sessionEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();
		updateAdminNav();
	} catch (error) {
		console.error("Unexpected session check error:", error);
		isAdminLoggedIn = false;
		updateAdminNav();
	}
}

function populateCategoryOptions() {
	if (!categorySelect) return;
	// Support recipes that use either `category` (string) or `categories` (array)
	const categoriesSet = new Set();
	recipes.forEach(r => {
		if (Array.isArray(r.categories)) {
			r.categories.forEach(c => categoriesSet.add(c));
		} else if (r.category) {
			categoriesSet.add(r.category);
		}
	});
	const categories = Array.from(categoriesSet).sort();
	categorySelect.innerHTML = "";
	const allOpt = document.createElement('option');
	allOpt.value = 'All';
	allOpt.textContent = 'All';
	categorySelect.appendChild(allOpt);
	categories.forEach(cat => {
		const opt = document.createElement('option');
		opt.value = cat;
		opt.textContent = cat;
		categorySelect.appendChild(opt);
	});
}

function filterRecipesByCategory(recipeList, selectedCategory) {
	if (selectedCategory === "All") {
		return recipeList;
	}

	return recipeList.filter((recipe) => {
		if (Array.isArray(recipe.categories)) {
			return recipe.categories.includes(selectedCategory);
		}
		return recipe.category === selectedCategory;
	});
}

function debounce(func, delay) {
	let timeoutId;

	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}

function handleSearch() {
	const selectedCategory = categorySelect.value;
	const searchTerm = recipeSearch.value.toLowerCase();

	const filteredRecipes = recipes.filter((recipe) => {
		// Check category match
		let categoryMatch = true;
		if (selectedCategory !== "All") {
			if (Array.isArray(recipe.categories)) {
				categoryMatch = recipe.categories.includes(selectedCategory);
			} else {
				categoryMatch = recipe.category === selectedCategory;
			}
		}

		// Check search term match in name or ingredients
		let searchMatch = true;
		if (searchTerm) {
			const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
			const ingredientsMatch = recipe.ingredients.some((ingredient) =>
				ingredient.toLowerCase().includes(searchTerm)
			);
			searchMatch = nameMatch || ingredientsMatch;
		}

		return categoryMatch && searchMatch;
	});

	renderRecipes(filteredRecipes);
}

const debouncedHandleSearch = debounce(handleSearch, 300);

function renderRecipes(recipeList) {
	if (recipeList.length === 0) {
		recipesGrid.innerHTML = "<p class=\"no-results\">No recipes found in this category.</p>";
		return;
	}

	const cardsMarkup = recipeList
		.map(
			(recipe) => `
				<article class="recipe-card" data-recipe-id="${recipe.id}" data-recipe-name="${recipe.name}">
					<img src="${recipe.image}" alt="${recipe.alt}">
					<div class="card-body">
						<h3>${recipe.name}</h3>
						<div class="button-row ${isAdminLoggedIn ? "button-row--admin" : "button-row--single"}">
							<button class="view-btn" type="button">View Recipe</button>
							${isAdminLoggedIn
								? `<div class="right-actions">
									<button class="edit-btn" type="button" data-recipe-id="${recipe.id}">Edit</button>
									<button class="delete-btn" type="button" data-recipe-id="${recipe.id}">Delete</button>
								</div>`
								: ""
							}
						</div>
					</div>
				</article>
			`
		)
		.join("");

	recipesGrid.innerHTML = cardsMarkup;
}

function showRecipeDetails(recipe) {
	const ingredientsText = recipe.ingredients.map((item) => `- ${item}`).join("\n");
	const categoriesText = Array.isArray(recipe.categories) ? recipe.categories.join(', ') : (recipe.category || '');

	if (!recipeModal || !modalTitle || !modalIngredients || !modalInstructions) {
		alert(
			`${recipe.name}${categoriesText ? '\nCategory: ' + categoriesText : ''}\n\nIngredients:\n${ingredientsText}\n\nInstructions:\n${recipe.instructions}`
		);
		return;
	}

	modalTitle.textContent = recipe.name;
	modalIngredients.innerHTML = recipe.ingredients.map((item) => `<li>${item}</li>`).join("");
	modalInstructions.textContent = recipe.instructions;
	recipeModal.classList.add("show");
	recipeModal.setAttribute("aria-hidden", "false");
}

function hideRecipeModal() {
	recipeModal.classList.remove("show");
	recipeModal.setAttribute("aria-hidden", "true");
}

async function deleteRecipeById(recipeId) {
	if (!recipeId) return;

	const confirmation = window.confirm("Are you sure you want to delete this recipe?");
	if (!confirmation) return;

	const accessToken = await getAccessToken();
	if (!accessToken) {
		window.alert("Please log in as admin before deleting a recipe.");
		window.location.href = "login.html";
		return;
	}

	try {
		const response = await fetch(`${API_BASE_URL}/api/recipes/${encodeURIComponent(recipeId)}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		if (!response.ok) {
			let details = `Failed to delete recipe (${response.status})`;
			try {
				const body = await response.json();
				details = body.details || body.error || details;
			} catch (_error) {
				// Keep default details if body is not JSON
			}
			throw new Error(details);
		}

		// Remove from local array and refresh view
		recipes = recipes.filter((recipe) => recipe.id !== recipeId);
		handleSearch();
	} catch (error) {
		console.error("Failed to delete recipe:", error);
		window.alert(`Could not delete recipe. ${error.message}`);
	}
}

categorySelect.addEventListener("change", handleSearch);

recipeSearch.addEventListener("input", debouncedHandleSearch);

recipesGrid.addEventListener("click", (event) => {
	const editButton = event.target.closest(".edit-btn");
	if (editButton) {
		const recipeId = editButton.getAttribute("data-recipe-id");
		window.location.href = `add_recipe.html?id=${encodeURIComponent(recipeId)}`;
		return;
	}

	const deleteButton = event.target.closest(".delete-btn");
	if (deleteButton) {
		const recipeId = deleteButton.getAttribute("data-recipe-id");
		void deleteRecipeById(recipeId);
		return;
	}

	const card = event.target.closest(".recipe-card");
	if (!card) {
		return;
	}

	const recipeName = card.getAttribute("data-recipe-name");
	const matchedRecipe = recipes.find((recipe) => recipe.name === recipeName);

	if (matchedRecipe) {
		showRecipeDetails(matchedRecipe);
	}
});

closeModalButton.addEventListener("click", hideRecipeModal);

recipeModal.addEventListener("click", (event) => {
	if (event.target === recipeModal) {
		hideRecipeModal();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && recipeModal.classList.contains("show")) {
		hideRecipeModal();
	}
});

void (async function initPage() {
	await checkAdminSession();
	await loadRecipesFromApi();
})();
