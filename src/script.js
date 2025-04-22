const form = document.querySelector("form"); // Sélection du formulaire
const inputs = document.querySelectorAll("input, textarea");
const consent = document.getElementById("consent");
const consentError = document.getElementById("consent-error");
const succes = document.querySelector(".succes");

// Fonction de validation générale
function validateInput(input) {
   const errorId = input.getAttribute("data-error");
   const errorMessage = document.getElementById(errorId);
   if (!errorMessage) return;

   // Vérification des champs texte (minimum 8 caractères)
   if (input.type === "text" && input.value.trim().length < 8) {
      errorMessage.style.display = "flex";
      return false;
   }

   // Vérification des emails
   if (input.type === "email") {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailPattern.test(input.value.trim())) {
         errorMessage.style.display = "flex";
         return false;
      }
   }

   // Vérification des cases non remplies
   if (input.value.trim() === "") {
      errorMessage.style.display = "flex";
      return false;
   } else {
      errorMessage.style.display = "none";
   }
   return true;
}

// Vérification des boutons radio (Query Type)
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

// Validation du consentement (checkbox)
function validateConsent() {
   if (!consent.checked) {
      consentError.style.display = "flex";
      return false;
   } else {
      consentError.style.display = "none";
   }
   return true;
}

// Validation du formulaire avant soumission
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
      succes.classList.add("show"); // Affiche le message de succès
      setTimeout(() => {
         form.reset(); // Réinitialise le formulaire après succès
         succes.classList.remove("show"); // Cache après 3 secondes (ajustable)
      }, 3000); // Ajuste la durée ici
   }
});

// Écouteur pour mettre à jour les erreurs en temps réel
inputs.forEach((input) => {
   input.addEventListener("input", () => validateInput(input));
});
consent.addEventListener("change", validateConsent);
