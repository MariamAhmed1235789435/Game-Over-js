// Global Variables
const inputs = document.querySelectorAll("input"),
   formLogin = document.getElementById("login"),
   btnLogin = document.getElementById("btnLogin"),
   modeBtn = document.getElementById("mode");

let isValid = false;

// Initialize Theme
if (localStorage.getItem("theme")) {
   const theme = localStorage.getItem("theme");
   document.documentElement.dataset.theme = theme;
   modeBtn.classList.replace(
      theme === "light" ? "fa-sun" : "fa-moon",
      theme === "light" ? "fa-moon" : "fa-sun"
   );
}

// Form Events
formLogin.addEventListener("submit", function (e) {
   e.preventDefault();
   if (isValid) setForm();
});

formLogin.addEventListener("input", function () {
   isValid = validationEmail() && validationPassword();
   btnLogin.disabled = !isValid;
});

modeBtn.addEventListener("click", function (e) {
   toggleTheme(e.target);
});

// Functions
function toggleTheme(element) {
   const root = document.documentElement;
   const isLight = root.dataset.theme === "light";
   root.dataset.theme = isLight ? "dark" : "light";
   element.classList.replace(
      isLight ? "fa-moon" : "fa-sun",
      isLight ? "fa-sun" : "fa-moon"
   );
   localStorage.setItem("theme", isLight ? "dark" : "light");
}

async function setForm() {
   const newUser = {
      email: inputs[0].value,
      password: inputs[1].value,
   };

   try {
      const response = await loginApi(newUser);
      const msgElement = document.getElementById("msg");

      if (response?.message === "success") {
         localStorage.setItem("uToken", response.token);
         location.href = "./home.html";
      } else {
         msgElement.innerText = response?.message || "An error occurred.";
      }
   } catch (error) {
      console.error("Error:", error);
   }
}

async function loginApi(user) {
   btnLogin.disabled = true;

   try {
      const api = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(user),
      });

      btnLogin.disabled = false;
      return await api.json();
   } catch (error) {
      btnLogin.disabled = false;
      console.error("API Error:", error);
   }
}

function validationEmail() {
   const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
   const emailInput = inputs[0];
   const isValid = emailRegex.test(emailInput.value);
   emailInput.classList.toggle("is-invalid", !isValid);
   emailInput.classList.toggle("is-valid", isValid);
   return isValid;
}

function validationPassword() {
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
   const passwordInput = inputs[1];
   const isValid = passwordRegex.test(passwordInput.value);
   passwordInput.classList.toggle("is-invalid", !isValid);
   passwordInput.classList.toggle("is-valid", isValid);
   return isValid;
}
