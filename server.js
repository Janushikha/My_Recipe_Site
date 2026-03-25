const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/recipes", async (req, res) => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;

	if (!supabaseUrl || !supabaseKey) {
		return res.status(500).json({
			error: "Missing SUPABASE_URL or SUPABASE_KEY in environment variables"
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

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
