
// Wait for form to be loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  const forgotForm = document.getElementById('forgot-form');
  const emailInput = document.getElementById('emailInput');
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const otpBoxes = document.querySelectorAll('.otp-box');

  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Send OTP to backend
  sendOtpBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();


    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }


    try {
      const response = await fetch('/fantasy-app/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        alert('OTP sent to your email!');
      } else {
        alert('Error sending OTP: ' + data.message);
      }
    } catch (error) {
      alert('Server error while sending OTP.');
      console.error(error);
    }
  });


  // Auto move to next OTP input and handle backspace

  otpBoxes.forEach((box, index) => {
    box.addEventListener('input', () => {
      if (box.value.length === 1 && index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && box.value === '' && index > 0) {
        otpBoxes[index - 1].focus();
      }
    });
  });


  // Verify OTP with backend
  verifyOtpBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const otp = Array.from(otpBoxes).map(box => box.value).join('');


    if (otp.length < 6) {
      alert('Please enter all 6 digits of the OTP.');
      return;
    }

    try {
      const response = await fetch('/fantasy-app/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });

      const data = await response.json();

      if (response.ok) {
        alert('OTP verified successfully!');
        window.location.href = './fantasy-app/frontend/html/create.html';
      } else {
        alert('OTP verification failed: ' + data.message);
      }
    } catch (error) {
      alert('Server error while verifying OTP.');
      console.error(error);
    }
  });

});

