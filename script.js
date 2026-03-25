const SUPABASE_PROJECT_URL = "https://tntbdasgrqvtcrpfwjgd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudGJkYXNncnF2dGNycGZ3amdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNTAzNjYsImV4cCI6MjA4OTkyNjM2Nn0.LgqLlC2kb4gaLRkuoU4-Uze5YjJQTvsFmbKdrzf9PEQ";

let recipes = [];

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

async function loadRecipesFromSupabase() {
	if (!recipesGrid) return;

	recipesGrid.innerHTML = "<p class=\"no-results\">Loading recipes...</p>";

	try {
		const response = await fetch(`${SUPABASE_PROJECT_URL}/rest/v1/Recipes?select=*`, {
			headers: {
				apikey: SUPABASE_ANON_KEY,
				Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
				Accept: "application/json"
			}
		});

		if (!response.ok) {
			throw new Error(`Supabase request failed: ${response.status}`);
		}

		const data = await response.json();
		recipes = Array.isArray(data) ? data.map(normalizeRecipe) : [];
		populateCategoryOptions();
		renderRecipes(recipes);
	} catch (error) {
		console.error("Failed to fetch recipes from Supabase:", error);
		recipesGrid.innerHTML = "<p class=\"no-results\">Could not load recipes from Supabase. Check your Project URL and Anon Key.</p>";
	}
}

const categorySelect = document.getElementById("category");
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

categorySelect.addEventListener("change", (event) => {
	const filteredRecipes = filterRecipesByCategory(recipes, event.target.value);
	renderRecipes(filteredRecipes);
});

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

loadRecipesFromSupabase();
