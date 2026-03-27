const recipeForm = document.getElementById("recipe-form");
const categoryCheckboxes = document.querySelectorAll("input[name='category']");
const selectedCategoriesDisplay = document.getElementById("selected-categories");

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

if (recipeForm) {
	recipeForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(recipeForm);
		const ingredients = (formData.get("ingredients") || "")
			.toString()
			.split(/\r?\n/)
			.map((item) => item.trim())
			.filter(Boolean);

		const categories = Array.from(categoryCheckboxes)
			.filter((checkbox) => checkbox.checked)
			.map((checkbox) => checkbox.value);

		const recipe = {
			id: `rec-${Date.now()}`,
			name: (formData.get("name") || "").toString().trim(),
			category: categories,
			imageUrl: (formData.get("imageUrl") || "").toString().trim(),
			altText: (formData.get("altText") || "").toString().trim(),
			ingredients,
			instructions: (formData.get("instructions") || "").toString().trim()
		};

		try {
			const response = await fetch("http://localhost:3000/api/recipes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(recipe)
			});

			if (!response.ok) {
				throw new Error("Failed to add recipe");
			}

			alert("Recipe Added!");
			window.location.href = "index.html";
		} catch (error) {
			alert("Could not add recipe. Please try again.");
			console.error(error);
		}
	});
}
