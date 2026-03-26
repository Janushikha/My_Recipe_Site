let recipes = [];
const API_BASE_URL = window.location.protocol === "file:" ? "http://localhost:3000" : "";

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
			throw new Error(`API request failed: ${response.status}`);
		}

		const data = await response.json();
		recipes = Array.isArray(data) ? data.map(normalizeRecipe) : [];
		populateCategoryOptions();
		renderRecipes(recipes);
	} catch (error) {
		console.error("Failed to fetch recipes from backend API:", error);
		recipesGrid.innerHTML = "<p class=\"no-results\">Could not load recipes from API. Make sure your server is running.</p>";
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

function renderRecipes(recipeList) {
	if (recipeList.length === 0) {
		recipesGrid.innerHTML = "<p class=\"no-results\">No recipes found in this category.</p>";
		return;
	}

	const cardsMarkup = recipeList
		.map(
			(recipe) => `
				<article class="recipe-card" data-recipe-name="${recipe.name}">
					<img src="${recipe.image}" alt="${recipe.alt}">
					<div class="card-body">
						<h3>${recipe.name}</h3>
						<button class="view-btn" type="button">View Recipe</button>
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

categorySelect.addEventListener("change", handleSearch);

recipeSearch.addEventListener("input", handleSearch);

recipesGrid.addEventListener("click", (event) => {
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

loadRecipesFromApi();
