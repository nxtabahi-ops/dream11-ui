function signup() {
    alert("Sign Up clicked!");
   
  }
  
  function login() {
    alert("Log In clicked!");

  }
  window.addEventListener("DOMContentLoaded", function() {
    const sound = document.getElementById("welcomeSound");
    
    // Try playing the sound once the page is loaded
    sound.play().catch(function(e) {
      console.log("Auto-play was prevented:", e);
      
      // Handle autoplay prevention: try to play after user interaction
      document.body.addEventListener("click", function() {
        sound.play();
      });
    });
  });

  function goToLogin() {

    window.location.href = './fantasy-app/frontend/html/login.html';
  }
  
  function goToSignup() {
    window.location.href = './fantasy-app/frontend/html/signup.html';

  }
  
  // Attach event listeners to buttons
  document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.btn.login');
    const signupButton = document.querySelector('.btn.signup');
  
    loginButton.addEventListener('click', goToLogin);
    signupButton.addEventListener('click', goToSignup);
  });

  