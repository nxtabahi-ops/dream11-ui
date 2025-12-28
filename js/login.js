
document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const loginForm = document.querySelector(".login-form");
  const emailInput = loginForm.querySelector("input[type='text']");
  const submitButton = loginForm.querySelector("button[type='submit']");

  // Toggle password visibility
  togglePasswordBtn.addEventListener("click", function () {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });

  // Email or username validation
  function isValidEmailOrUsername(input) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    const usernameRegex = /^[A-Za-z0-9_]{1,12}$/;
    return emailRegex.test(input) || usernameRegex.test(input);
  }

  // Password validation
  function isValidPassword(password) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasUpper && hasLower && hasDigit && hasSpecial;
  }

  // Handle login logic
  async function handleLogin(email, password) {
    if (!isValidEmailOrUsername(email)) {
      alert("Enter a valid Gmail address or username (max 12 characters).");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters and include:\n- One uppercase letter\n- One lowercase letter\n- One number\n- One special character.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        window.location.href = "dashboard.html"; // adjust as needed
      } else {
        alert(result.message || "Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error connecting to server.");
    }
  }

  // On form submit
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    handleLogin(email, password);
  });
});

