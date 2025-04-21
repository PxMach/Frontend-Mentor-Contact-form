// // Full Name And Email
// const inputs = document.querySelectorAll("input");

// inputs.forEach((input) => {
//    input.addEventListener("input", function () {
//       const errorId = input.getAttribute("data-error");
//       const errorMessage = document.getElementById(errorId);

//       if (!errorMessage) return;

//       if (
//          input.type === "text" &&
//          (input.value.trim() === "" || input.value.length < 8)
//       ) {
//          errorMessage.style.display = "flex";
//       } else if (input.type === "email") {
//          const emailPattern =
//             /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//          if (!emailPattern.test(input.value)) {
//             errorMessage.style.display = "flex";
//             return;
//          }
//       } else {
//          errorMessage.style.display = "none";
//       }
//    });
// });

// // Query Type
// const queryRadios = document.querySelectorAll('input[name="queryType"]');
// const queryError = document.getElementById("query-error");

// function validateRadio() {
//    const isChecked = Array.from(queryRadios).some((radio) => radio.checked);

//    if (!isChecked) {
//       queryError.style.display = "flex";
//    } else {
//       queryError.style.display = "none";
//    }
// }

// queryRadios.forEach((radio) => {
//    radio.addEventListener("change", validateRadio);
// });

// // Text Aria
// const message = document.getElementById("message");
// const messageError = document.getElementById("message-error");

// function messageRequired() {
//    if (message.value.trim() === "" || message.value.trim().length < 8) {
//       messageError.style.display = "flex";
//    } else {
//       messageError.style.display = "none";
//    }
// }

// message.addEventListener("input", messageRequired);

// // Confirm / Button

// const consent = document.getElementById("consent");
// const consentError = document.getElementById("consent-error");
// const button = document.querySelector("button");

// function confirmConsent() {
//    if (consent.checked) {
//       consentError.style.display = "none";
//    } else {
//       consentError.style.display = "flex";
//    }
// }
// consent.addEventListener("change", confirmConsent);
// button.addEventListener("click");

const form = document.querySelector("form"); // Sélection du formulaire
const inputs = document.querySelectorAll("input, textarea");
const consent = document.getElementById("consent");
const consentError = document.getElementById("consent-error");

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

   if (hasErrors) {
      event.preventDefault(); // Empêche la soumission du formulaire s’il y a des erreurs
   }
});

// Écouteur pour mettre à jour les erreurs en temps réel
inputs.forEach((input) => {
   input.addEventListener("input", () => validateInput(input));
});
consent.addEventListener("change", validateConsent);
