
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const signupForm = document.getElementById("signupForm");
  const usernameInput = signupForm.querySelector("input[placeholder='Username']");
  const emailInput = signupForm.querySelector("input[placeholder='Email']");
  const passwordInput = signupForm.querySelector("#password");
  const successMessage = document.getElementById("successMessage");
  const togglePasswordIcon = document.querySelector(".eye-icon i");

  // Toggle password visibility
  function togglePassword() {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePasswordIcon.classList.toggle("fa-eye");
    togglePasswordIcon.classList.toggle("fa-eye-slash");
  }

  // Username validation (only a-zA-Z0-9_, max 12 characters)
  function isValidUsername(username) {
    const usernameRegex = /^[A-Za-z0-9_]{1,12}$/;
    return usernameRegex.test(username);
  }

  // Email validation (must be a valid email format and gmail.com)
  function isValidEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  }

  // Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character)
  function isValidPassword(password) {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= 8 && hasUpper && hasLower && hasDigit && hasSpecial;
  }

  // Handle signup
  async function handleSignup(username, email, password) {
    if (!isValidUsername(username)) {
      alert("Username can only have letters, numbers, underscores (max 12 characters).");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 8 characters and include:\n- One uppercase letter\n- One lowercase letter\n- One number\n- One special character.");
      return;
    }

    try {
      const response = await fetch("/your-app-path/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const result = await response.json();

      if (response.ok) {
        signupForm.style.display = "none";
        successMessage.style.display = "flex";

        setTimeout(() => {
          window.location.href = "./fantasy-app/frontend/html/login.html"; // redirect to login page after 3 sec
        }, 3000);
      } else {
        alert(result.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error connecting to server.");
    }
  }

  // Form submit event
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    handleSignup(username, email, password);
  });

});
