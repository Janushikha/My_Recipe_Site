const loginForm = document.getElementById("login-form");
const loginStatus = document.getElementById("login-status");
const loginSubmit = document.getElementById("login-submit");

function showStatus(message, type) {
	if (!loginStatus) return;
	loginStatus.textContent = message;
	loginStatus.classList.remove("error", "success");
	if (type) {
		loginStatus.classList.add(type);
	}
}

function getCleanErrorMessage(error) {
	if (!error) {
		return "Login failed. Please try again.";
	}

	const raw = (error.message || "").toLowerCase();
	if (raw.includes("invalid login credentials")) {
		return "Invalid email or password.";
	}
	if (raw.includes("email not confirmed")) {
		return "Please confirm your email before logging in.";
	}
	return error.message || "Login failed. Please try again.";
}

async function handleLoginSubmit(event) {
	event.preventDefault();

	if (!window.supabaseClient) {
		showStatus("Supabase is not configured on this page.", "error");
		return;
	}

	const formData = new FormData(loginForm);
	const email = (formData.get("email") || "").toString().trim();
	const password = (formData.get("password") || "").toString();

	if (!email || !password) {
		showStatus("Please enter both email and password.", "error");
		return;
	}

	showStatus("Signing in...", "");
	if (loginSubmit) {
		loginSubmit.disabled = true;
	}

	try {
		const { error } = await window.supabaseClient.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			throw error;
		}

		showStatus("Login successful. Redirecting...", "success");
		window.location.href = "index.html";
	} catch (error) {
		showStatus(getCleanErrorMessage(error), "error");
	} finally {
		if (loginSubmit) {
			loginSubmit.disabled = false;
		}
	}
}

if (loginForm) {
	loginForm.addEventListener("submit", handleLoginSubmit);
}
