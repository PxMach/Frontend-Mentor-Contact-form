const form = document.querySelector("form");
const inputs = document.querySelectorAll("input, textarea");
const consent = document.getElementById("consent");
const consentError = document.getElementById("consent-error");
const succes = document.querySelector(".succes");

// General validation function
function validateInput(input) {
   const errorId = input.getAttribute("data-error");
   const errorMessage = document.getElementById(errorId);
   if (!errorMessage) return;

   // Check text fields (minimum 8 characters)
   if (input.type === "text" && input.value.trim().length < 8) {
      errorMessage.style.display = "flex";
      return false;
   }

   // Check emails
   if (input.type === "email") {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailPattern.test(input.value.trim())) {
         errorMessage.style.display = "flex";
         return false;
      }
   }

   // Checking boxes not filled in
   if (input.value.trim() === "") {
      errorMessage.style.display = "flex";
      return false;
   } else {
      errorMessage.style.display = "none";
   }
   return true;
}

// Checking radio buttons (Query Type)
function validateRadio() {
   const queryRadios = document.querySelectorAll('input[name="queryType"]');
   const queryError = document.getElementById("query-error");
   const isChecked = Array.from(queryRadios).some((radio) => radio.checked);

   if (!isChecked) {
      queryError.style.display = "flex";
      return false;
   } else {
      queryError.style.display = "none";
   }
   return true;
}

// Consent validation (checkbox)
function validateConsent() {
   if (!consent.checked) {
      consentError.style.display = "flex";
      return false;
   } else {
      consentError.style.display = "none";
   }
   return true;
}

// Form validation before submission
form.addEventListener("submit", function (event) {
   let hasErrors = false;

   inputs.forEach((input) => {
      if (!validateInput(input)) {
         hasErrors = true;
      }
   });

   if (!validateConsent() || !validateRadio()) {
      hasErrors = true;
   }

   if (!hasErrors) {
      succes.classList.add("show"); // Displays the success message
      setTimeout(() => {
         form.reset(); // Reset the form after success
         succes.classList.remove("show"); // Hide after 3 seconds (adjustable)
      }, 3000);
   }
});

// Listener to update errors in real time
inputs.forEach((input) => {
   input.addEventListener("input", () => validateInput(input));
});
consent.addEventListener("change", validateConsent);
