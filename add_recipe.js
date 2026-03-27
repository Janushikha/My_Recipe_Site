const recipeForm = document.getElementById("recipe-form");

if (recipeForm) {
	recipeForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(recipeForm);
		const ingredients = (formData.get("ingredients") || "")
			.toString()
			.split(/\r?\n/)
			.map((item) => item.trim())
			.filter(Boolean);

		const recipe = {
			id: `rec-${Date.now()}`,
			name: (formData.get("name") || "").toString().trim(),
			category: (formData.get("category") || "").toString().trim(),
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
