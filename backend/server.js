const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, "..", "frontend");

app.use(cors());
app.use(express.json());
app.use(express.static(frontendDir));

// app.get("/", (_req, res) => {
// 	res.sendFile(path.join(frontendDir, "index.html"));
// });

app.get("/api/recipes", async (req, res) => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;

	if (!supabaseUrl || !supabaseKey) {
		return res.status(500).json({
			error: "Missing SUPABASE_URL or SUPABASE_KEY in environment variables",
			details: "Create backend/.env with SUPABASE_URL and SUPABASE_KEY, then restart the server."
		});
	}

	try {
		const response = await fetch(`${supabaseUrl}/rest/v1/Recipes?select=*`, {
			headers: {
				apikey: supabaseKey,
				Authorization: `Bearer ${supabaseKey}`,
				Accept: "application/json"
			}
		});

		if (!response.ok) {
			const errorBody = await response.text();
			return res.status(response.status).json({
				error: "Failed to fetch recipes from Supabase",
				details: errorBody
			});
		}

		const recipes = await response.json();
		return res.json(recipes);
	} catch (error) {
		return res.status(500).json({
			error: "Unexpected server error while fetching recipes",
			details: error.message
		});
	}
});

app.get("/api/recipes/:id", async (req, res) => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;

	if (!supabaseUrl || !supabaseKey) {
		return res.status(500).json({
			error: "Missing SUPABASE_URL or SUPABASE_KEY in environment variables",
			details: "Create backend/.env with SUPABASE_URL and SUPABASE_KEY, then restart the server."
		});
	}

	const recipeId = req.params.id;
	if (!recipeId) {
		return res.status(400).json({
			error: "Missing recipe id in request URL"
		});
	}

	try {
		const response = await fetch(
			`${supabaseUrl}/rest/v1/Recipes?id=eq.${encodeURIComponent(recipeId)}&select=*`,
			{
				headers: {
					apikey: supabaseKey,
					Authorization: `Bearer ${supabaseKey}`,
					Accept: "application/json"
				}
			}
		);

		if (!response.ok) {
			const errorBody = await response.text();
			return res.status(response.status).json({
				error: "Failed to fetch recipe from Supabase",
				details: errorBody
			});
		}

		const rows = await response.json();
		if (!Array.isArray(rows) || rows.length === 0) {
			return res.status(404).json({
				error: "Recipe not found"
			});
		}

		return res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({
			error: "Unexpected server error while fetching recipe",
			details: error.message
		});
	}
});

async function createRecipe(req, res) {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;

	if (!supabaseUrl || !supabaseKey) {
		return res.status(500).json({
			error: "Missing SUPABASE_URL or SUPABASE_KEY in environment variables",
			details: "Create backend/.env with SUPABASE_URL and SUPABASE_KEY, then restart the server."
		});
	}

	try {
		const recipe = req.body;

		if (!recipe.name || !recipe.categories || !recipe.instructions) {
			return res.status(400).json({
				error: "Missing required fields: name, categories, instructions"
			});
		}

		const response = await fetch(`${supabaseUrl}/rest/v1/Recipes`, {
			method: "POST",
			headers: {
				apikey: supabaseKey,
				Authorization: `Bearer ${supabaseKey}`,
				"Content-Type": "application/json",
				Prefer: "return=representation"
			},
			body: JSON.stringify(recipe)
		});

		if (!response.ok) {
			const errorBody = await response.text();
			return res.status(response.status).json({
				error: "Failed to insert recipe into Supabase",
				details: errorBody
			});
		}

		const result = await response.json();
		return res.status(201).json(result);
	} catch (error) {
		return res.status(500).json({
			error: "Unexpected server error while adding recipe",
			details: error.message
		});
	}
}

app.post("/api/recipes", createRecipe);
app.post("/api/recipesi", createRecipe);

app.put("/api/recipes/:id", async (req, res) => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;

	if (!supabaseUrl || !supabaseKey) {
		return res.status(500).json({
			error: "Missing SUPABASE_URL or SUPABASE_KEY in environment variables",
			details: "Create backend/.env with SUPABASE_URL and SUPABASE_KEY, then restart the server."
		});
	}

	const recipeId = req.params.id;
	if (!recipeId) {
		return res.status(400).json({
			error: "Missing recipe id in request URL"
		});
	}

	try {
		const recipe = req.body;

		if (!recipe.name || !recipe.categories || !recipe.instructions) {
			return res.status(400).json({
				error: "Missing required fields: name, categories, instructions"
			});
		}

		const response = await fetch(
			`${supabaseUrl}/rest/v1/Recipes?id=eq.${encodeURIComponent(recipeId)}`,
			{
				method: "PATCH",
				headers: {
					apikey: supabaseKey,
					Authorization: `Bearer ${supabaseKey}`,
					"Content-Type": "application/json",
					Prefer: "return=representation"
				},
				body: JSON.stringify(recipe)
			}
		);

		if (!response.ok) {
			const errorBody = await response.text();
			return res.status(response.status).json({
				error: "Failed to update recipe in Supabase",
				details: errorBody
			});
		}

		const result = await response.json();
		if (!Array.isArray(result) || result.length === 0) {
			return res.status(404).json({
				error: "Recipe not found"
			});
		}

		return res.json(result[0]);
	} catch (error) {
		return res.status(500).json({
			error: "Unexpected server error while updating recipe",
			details: error.message
		});
	}
});

app.delete("/api/recipes/:id", async (req, res) => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;

	if (!supabaseUrl || !supabaseKey) {
		return res.status(500).json({
			error: "Missing SUPABASE_URL or SUPABASE_KEY in environment variables",
			details: "Create backend/.env with SUPABASE_URL and SUPABASE_KEY, then restart the server."
		});
	}

	const recipeId = req.params.id;
	if (!recipeId) {
		return res.status(400).json({
			error: "Missing recipe id in request URL"
		});
	}

	try {
		const response = await fetch(
			`${supabaseUrl}/rest/v1/Recipes?id=eq.${encodeURIComponent(recipeId)}`,
			{
				method: "DELETE",
				headers: {
					apikey: supabaseKey,
					Authorization: `Bearer ${supabaseKey}`,
					Prefer: "return=minimal"
				}
			}
		);

		if (!response.ok) {
			const errorBody = await response.text();
			return res.status(response.status).json({
				error: "Failed to delete recipe from Supabase",
				details: errorBody
			});
		}

		return res.status(204).send();
	} catch (error) {
		return res.status(500).json({
			error: "Unexpected server error while deleting recipe",
			details: error.message
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
