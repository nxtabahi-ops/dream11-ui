
document.addEventListener('DOMContentLoaded', () => {
  // Access the form and input elements
  const createForm = document.getElementById('create-form'); // Assuming create-form exists in your HTML
  const newPasswordInput = document.getElementById('new-password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const strengthBar = document.getElementById('strength-bar');
  const lockIcon = document.getElementById('lockIcon');
  const unlockSound = document.getElementById('unlock-sound');
  const toast = document.getElementById('toast');
  
  // Password visibility toggle function

  function toggleVisibility(id, icon) {
    const field = document.getElementById(id);
    if (field.type === "password") {
      field.type = "text";
      icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      field.type = "password";
      icon.classList.replace("fa-eye-slash", "fa-eye");
    }
  }

  // Password strength check function
  function checkStrength() {
    const password = newPasswordInput.value;

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&#]/.test(password)) strength++;


    strengthBar.style.width = `${strength * 25}%`;
    strengthBar.style.background = ["red", "orange", "yellowgreen", "green"][strength - 1] || "transparent";
  }

  // Validate and submit new password
  async function validatePasswords() {
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();


    // Client-side validations
    if (newPassword === "" || confirmPassword === "") {
      alert("Please fill out both password fields.");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }


    try {
      // Example payload: include email/token if needed
      const response = await fetch("/fantasy-app/api/reset-password", {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: newPassword,

          // Optional: include email/token if necessary

        })
      });

      const result = await response.json();

      if (response.ok) {

        // Unlocking animation
        const box = document.getElementById("lockerBox");
        lockIcon.innerHTML = '<i class="fas fa-unlock"></i>';
        unlockSound.play();

        box.classList.add("unlocking");
        showToast();

        // Optional: redirect after delay
        setTimeout(() => {
          window.location.href = "./html/login.html";
        }, 3000);
      } else {
        alert("Reset failed: " + (result.message || "Unknown error."));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Network or server error occurred.");
    }
  }


  // Show toast notification
  function showToast() {

    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // Attach event listeners to form and password inputs
  createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validatePasswords();
  });

  newPasswordInput.addEventListener('input', checkStrength);
  confirmPasswordInput.addEventListener('input', checkStrength);
});

