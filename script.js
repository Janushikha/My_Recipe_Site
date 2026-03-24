/*const recipes =[ { "id": "rec-001", "name": "Greek Yogurt Berry Parfait", "category": "Breakfast", "ingredients": [ "1 cup Greek yogurt", "1/2 cup granola", "1/2 cup mixed berries (strawberries, blueberries, raspberries)", "1 tbsp honey", "1 tbsp chopped pistachios (optional)" ], "instructions": [ "Spoon half of the Greek yogurt into a glass or bowl.", "Layer half of the mixed berries over the yogurt.", "Sprinkle half of the granola on top of the berries.", "Repeat the yogurt, berries, and granola layers.", "Drizzle honey over the top and finish with chopped pistachios." ] },
 { "id": "rec-002", "name": "Chickpea & Avocado Grain Bowl", "category": "Lunch", "ingredients": [ "1 cup cooked quinoa", "1/2 can chickpeas, drained and rinsed", "1/2 avocado, sliced", "1 cup mixed salad greens", "1/4 cup cherry tomatoes, halved", "1 tbsp olive oil", "1 tbsp lemon juice", "Salt and pepper to taste" ], "instructions": [ "Place cooked quinoa in a bowl as the base.", "Top with mixed greens, chickpeas, cherry tomatoes, and avocado slices.", "Whisk olive oil, lemon juice, salt, and pepper to make a dressing.", "Drizzle dressing over the bowl and toss gently to combine.", "Adjust seasoning and serve immediately." ] }, { "id": "rec-003", "name": "One-Pan Lemon Herb Chicken with Vegetables", "category": "Dinner", "ingredients": [ "4 bone-in chicken thighs (about 700 g)", "2 tbsp olive oil", "1 lemon (zest and juice)", "1 tsp dried oregano", "1 tsp dried thyme", "2 cups baby potatoes, halved", "1 cup baby carrots", "Salt and black pepper to taste" ], "instructions": [ "Preheat oven to 200°C (400°F).", "Toss potatoes and carrots with 1 tbsp olive oil, salt, and pepper and spread in a roasting pan.", "Rub chicken thighs with remaining olive oil, lemon zest, oregano, thyme, salt, and pepper; place on top of vegetables.", "Squeeze lemon juice over the chicken and vegetables.", "Roast 35–45 minutes until chicken reaches 74°C (165°F) and vegetables are tender, basting once with pan juices.", "Rest 5 minutes before serving." ] }, { "id": "rec-004", "name": "Salted Caramel Apple Crumble", "category": "Dessert", "ingredients": [ "4 medium apples (Granny Smith or Honeycrisp), peeled and sliced", "1/4 cup granulated sugar", "1 tsp cinnamon", "1 cup rolled oats", "1/2 cup all-purpose flour", "1/3 cup brown sugar", "1/3 cup cold unsalted butter, cubed", "Pinch of sea salt" ], "instructions": [ "Preheat oven to 180°C (350°F).", "Toss apple slices with granulated sugar and cinnamon and place in a buttered baking dish.", "Combine oats, flour, brown sugar, and a pinch of salt; cut in cold butter until mixture resembles coarse crumbs.", "Scatter crumble topping evenly over the apples.", "Bake 30–35 minutes until topping is golden and apples are bubbling.", "Let cool slightly; serve warm with ice cream if desired." ] },
 { "id": "rec-005", 
	"name": "Spicy Garlic Shrimp Noodles", 
	"category": "Spicy",
	"ingredients": [ "200 g egg noodles or spaghetti", "250 g shrimp, peeled and deveined", "3 cloves garlic, minced", "1 tbsp chili garlic sauce (adjust to taste)", "2 tbsp soy sauce", "1 tbsp rice vinegar", "2 tbsp vegetable oil", "2 spring onions, sliced", "1/2 cup shredded cabbage (optional)" ], 
	"instructions": [ "Cook noodles according to package instructions; drain and set aside.", "Heat oil in a large pan or wok over medium-high heat and sauté minced garlic until fragrant (about 30 seconds).", "Add shrimp and cook 1–2 minutes per side until pink and opaque; remove and set aside.", "Stir in chili garlic sauce, soy sauce, and rice vinegar; add shredded cabbage and cook 1–2 minutes until slightly wilted.", "Add cooked noodles and shrimp back to the pan; toss to coat evenly in the sauce.", "Garnish with sliced spring onions and serve hot." ] } ]]
*/
const recipes = [
	{
		id: "rec-001",
		name: "Berry Bliss Pancakes",
		category: "Breakfast",
		ingredients: ["1 cup all-purpose flour", "1 large egg", "1 cup milk", "1 cup mixed berries (fresh or frozen)", "1 tbsp granulated sugar", "1 tsp baking powder", "Pinch of salt"],
		instructions: "Whisk flour, egg, milk, and sugar. Cook batter on a greased pan until golden. Top with fresh berries.",
		image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
		alt: "Berry pancakes stacked on a plate"
	},
	{
		id: "rec-002",
		name: "Smoky Chicken Grain Bowl",
		category: "Lunch",
		ingredients: ["250 g grilled chicken, sliced", "1 1/2 cups cooked quinoa", "1 1/2 cups mixed roasted vegetables (peppers, zucchini, carrots)", "2 tbsp olive oil", "1 tbsp lemon juice", "Salt and pepper to taste"],
		instructions: "Layer warm cooked quinoa, roasted vegetables and sliced grilled chicken in a bowl. Whisk olive oil, lemon juice, salt and pepper to make a light dressing and drizzle over the bowl. Toss lightly and serve immediately.",
		image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80",
		alt: "Grilled chicken bowl with vegetables"
	},
	{
		id: "rec-003",
		name: "Firehouse BBQ Burger",
		category: "Dinner",
		ingredients: ["500 g ground beef (makes 3-4 patties)", "4 burger buns", "4 tbsp BBQ sauce", "4 slices cheddar cheese", "1 small red onion, thinly sliced", "Salt & pepper to season"],
		instructions: "Season ground beef with salt and pepper, form into patties and grill or pan-sear to desired doneness. Place a slice of cheddar on each patty to melt. Toast buns lightly, spread BBQ sauce, add patty and top with sliced onion. Serve with fries or a side salad.",
		image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=900&q=80",
		alt: "Gourmet beef burger with toppings"
	},
	{
		id: "rec-004",
		name: "Velvet Cocoa Torte",
		category: "Dessert",
		ingredients: ["200 g dark chocolate (70% recommended)", "120 g unsalted butter", "3 large eggs", "3/4 cup granulated sugar", "2 tbsp unsweetened cocoa powder", "Pinch of salt"],
		instructions: "Preheat oven and prepare a springform pan. Melt chocolate and butter together until smooth. Whisk eggs with sugar until slightly thickened, fold in the chocolate mixture gently, then sift in cocoa powder and a pinch of salt. Pour into the pan and bake until just set in the center. Cool before slicing to achieve clean cuts.",
		image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
		alt: "Chocolate dessert with berries"
	},
	{
		id: "rec-005",
		name: "Rustic Rosemary Bread",
		category: "Baking",
		ingredients: ["3 cups bread flour", "1 to 1 1/4 cups warm water (adjust as needed)", "2 1/4 tsp active dry yeast (1 packet)", "1 tsp salt", "1 tbsp fresh rosemary, chopped", "1 tbsp olive oil (for brushing)"],
		instructions: "Combine flour, yeast and salt, add warm water and mix into a shaggy dough. Knead until smooth and elastic, then fold in chopped rosemary. Let the dough rise until doubled (about 1-1.5 hours). Shape into a loaf, allow a final proof, brush with olive oil, and bake in a preheated oven until the crust is deep golden and the loaf sounds hollow when tapped.",
		image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
		alt: "Freshly baked rustic bread loaf"
	},
	{
		id: "rec-006",
		name: "Crispy Herb Fried Chicken",
		category: "Frying",
		ingredients: ["1 kg chicken pieces (drumsticks/thighs)", "1 1/2 cups all-purpose flour", "1 tsp paprika", "1 tsp garlic powder", "1 tsp salt", "1/2 tsp black pepper", "Vegetable oil for deep frying (enough to submerge)"],
		instructions: "Pat chicken pieces dry, season with salt and pepper. Dredge in seasoned flour and shake off excess. Heat oil to 170-180°C (340-360°F) and fry in batches until golden brown and cooked through (internal temperature 74°C/165°F). Drain on a rack and rest briefly before serving.",
		image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=900&q=80",
		alt: "Golden fried chicken with herbs"
	},
	{
		id: "rec-007",
		name: "Honey Almond Macarons",
		category: "Sweet",
		ingredients: ["1 3/4 cups (175 g) almond flour", "4 large egg whites, room temperature", "1 cup (120 g) powdered sugar", "1/4 cup (60 g) granulated sugar", "Honey buttercream (1/2 cup unsalted butter, 1/4 cup honey, 1 1/2 cups powdered sugar)", "A pinch of salt"],
		instructions: "Sift almond flour and powdered sugar together. Whip egg whites to soft peaks, gradually add granulated sugar and beat to stiff glossy peaks. Fold dry ingredients into the meringue, pipe rounds onto baking sheets, rest until a skin forms, then bake at moderate temperature until set. Once cooled, sandwich with honey buttercream and chill briefly for best texture.",
		image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
		alt: "Colorful macarons on a tray"
	},
	{
		id: "rec-008",
		name: "Chili Garlic Noodles",
		category: "Spicy",
		categories: ["Spicy", "Dinner"],
		ingredients: ["250 g noodles (egg or wheat)", "4 cloves garlic, minced", "1 tsp chili flakes (adjust to taste)", "2 tbsp soy sauce", "2 spring onions, sliced", "1 tbsp vegetable oil"],
		instructions: "Cook noodles according to package instructions and drain. Heat oil in a wok, add minced garlic and chili flakes and fry until aromatic. Add cooked noodles, toss with soy sauce and sliced spring onions, and stir-fry until everything is heated through. Adjust seasoning and serve hot.",
		image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
		alt: "Spicy noodles served in a bowl"
	}
	,{
		id: "rec-009",
		name: "Butter Chicken (Murgh Makhani)",
		category: "Dinner",
		ingredients: [
			"800g boneless chicken, cut into cubes",
			"1 cup thick yogurt",
			"2 tbsp ginger-garlic paste",
			"2 tsp red chili powder",
			"1 tsp garam masala",
			"4 tbsp butter",
			"1 cup tomato puree",
			"1/2 cup heavy cream",
			"Salt to taste",
			"2 tbsp oil"
		],
		instructions: "Marinate the chicken in yogurt, ginger-garlic paste, chili powder, and salt for at least 1 hour (overnight is best). Heat oil in a pan and sear the chicken pieces until lightly browned; remove and set aside. In the same pan, melt 2 tbsp butter, add tomato puree and simmer for 8-10 minutes until thick and oil separates. Add garam masala and return the chicken to the sauce, cover and cook on low heat for 12-15 minutes until cooked through. Stir in cream and remaining butter, simmer 2-3 minutes, adjust salt, and garnish with a drizzle of cream and chopped cilantro. Serve hot with naan or steamed rice.",
		image: "https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken-.jpg",
		alt: "Butter chicken in a bowl"
	},
	{
		id: "rec-010",
		name: "Masala Dosa",
		category: "Breakfast",
		ingredients: [
			"2 cups dosa batter (fermented)",
			"2 medium potatoes, boiled and mashed",
			"1 small onion, finely chopped",
			"1 green chili, chopped",
			"1/2 tsp mustard seeds",
			"1/2 tsp turmeric powder",
			"2 tbsp oil",
			"Salt to taste",
			"Coriander leaves for garnish"
		],
		instructions: "Prepare a spiced potato filling by heating oil, adding mustard seeds until they splutter, then sautéing onions and green chili until soft. Add turmeric and mashed potatoes, season with salt, and mix well; garnish with coriander. Heat a non-stick tawa and spread a ladle of dosa batter into a thin circle; drizzle a little oil around edges and cook until crisp and golden. Place a portion of the potato masala in the center, fold the dosa, and serve immediately with coconut chutney and sambar. For best results, the batter should be well-fermented and the tawa smoking hot before pouring.",
		image: "https://thumbs.dreamstime.com/b/delicious-masala-dosa-sambar-chutney-south-indian-culinary-delight-crispy-served-classic-breakfast-snack-367699781.jpg?w=992",
		alt: "Masala dosa served with chutney"
	},
	{
		id: "rec-011",
		name: "Gulab Jamun",
		category: "Dessert",
		categories: ["Dessert", "Sweet"], 
		ingredients: [
			"1 cup milk powder",
			"1/4 cup all-purpose flour",
			"1/4 tsp baking soda",
			"2 tbsp ghee",
			"1/4 cup milk (adjust as needed)",
			"Oil/ghee for frying",
			"1 1/2 cups sugar",
			"1 1/2 cups water",
			"4-5 cardamom pods, crushed",
			"Few strands saffron (optional)"
		],
		instructions: "To make the syrup, combine sugar, water, crushed cardamom and saffron in a pan; bring to a simmer and cook until slightly thickened. Keep syrup warm. For the dough, mix milk powder, flour and baking soda, add ghee and mix into a crumbly texture, then knead gently with milk into a soft smooth dough (do not overwork). Divide into small smooth balls with no cracks. Heat oil/ghee on medium-low and deep-fry the balls in batches until they are light golden (they will darken slightly after soaking). Transfer fried balls directly into warm sugar syrup and let them soak for at least 30 minutes so they become soft and syrupy. Serve warm or at room temperature, garnished with slivered pistachios.",
		image: "https://www.theflourishingabode.com/wp-content/uploads/2025/03/Soft-and-Juicy-Gulab-Jamuns-Served-in-a-White-Bowl-with-Sugar-Syrup-9889737.png",
		alt: "Gulab jamun in syrup"
	}
]; 

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

populateCategoryOptions();

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

renderRecipes(recipes);
