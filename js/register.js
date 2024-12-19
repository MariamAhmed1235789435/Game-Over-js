const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector("#btnRegister");
const form = document.querySelector("form");

// Regular Expressions
const regexname = /^[\w\s\u0600-\u06FF]{2,20}$/; // Simplified for names
const regexemail = /^[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const regexpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regexrepassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var regexphone = /^\d{10,15}$/;



// Map inputs to their corresponding regex
const inputValidationRules = {
  Name: regexname,
  email: regexemail,
  password: regexpassword,
  rePassword: regexrepassword,
  phone: regexphone,
};

// Real-Time Validation
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    validateInput(input, inputValidationRules[input.id]);
  });
});

// Form Submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (confirmInputs()) {
    getvalueofuser();
  } else {
    alert("Please correct the errors before submitting.");
  }
});

// Real-time validation for rePassword
document.getElementById("rePassword").addEventListener("input", function () {
   const password = document.getElementById("password").value;
   const rePassword = this.value;
   const feedback = this.nextElementSibling; // Select the error message <ul>
 
   if (rePassword === "") {
     this.classList.add("is-invalid");
     this.classList.remove("is-valid");
     feedback.children[0].style.display = "block"; // Show 'rePassword is required'
     feedback.children[1].style.display = "none"; // Hide 'Passwords must match'
   } else if (password !== rePassword) {
     this.classList.add("is-invalid");
     this.classList.remove("is-valid");
     feedback.children[0].style.display = "none"; // Hide 'rePassword is required'
     feedback.children[1].style.display = "block"; // Show 'Passwords must match'
   } else {
     this.classList.add("is-valid");
     this.classList.remove("is-invalid");
     feedback.children[0].style.display = "none"; // Hide 'rePassword is required'
     feedback.children[1].style.display = "none"; // Hide 'Passwords must match'
   }
 });
 

// Validate Single Input
function validateInput(input, regex) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

// Confirm All Inputs
function confirmInputs() {
   let valid = true;
 
   // Validate all inputs
   inputs.forEach((input) => {
     const regex = inputValidationRules[input.id];
     if (!validateInput(input, regex)) {
       valid = false;
     }
   });
 
   // Confirm passwords match
   const password = document.getElementById("password").value;
   const rePassword = document.getElementById("rePassword").value;
   const rePasswordInput = document.getElementById("rePassword");
   const feedback = rePasswordInput.nextElementSibling; // Select error message <ul>
 
   if (rePassword === "") {
     rePasswordInput.classList.add("is-invalid");
     rePasswordInput.classList.remove("is-valid");
     feedback.children[0].style.display = "block"; // Show 'rePassword is required'
     feedback.children[1].style.display = "none"; // Hide 'Passwords must match'
     valid = false;
   } else if (password !== rePassword) {
     rePasswordInput.classList.add("is-invalid");
     rePasswordInput.classList.remove("is-valid");
     feedback.children[0].style.display = "none"; // Hide 'rePassword is required'
     feedback.children[1].style.display = "block"; // Show 'Passwords must match'
     valid = false;
   } else {
     rePasswordInput.classList.add("is-valid");
     rePasswordInput.classList.remove("is-invalid");
     feedback.children[0].style.display = "none"; // Hide 'rePassword is required'
     feedback.children[1].style.display = "none"; // Hide 'Passwords must match'
   }
 
   return valid;
 }
 
// Get User Data
function getvalueofuser() {
  const user = {
    name: document.getElementById("Name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    rePassword: document.getElementById("rePassword").value,
    phone: document.getElementById("phone").value,
  };
  console.log(user);
  setUserApi(user);
}

// Send Data to API
async function setUserApi(user) {
  try {
    const api = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!api.ok) {
      const errorResponse = await api.json();
      throw new Error(errorResponse.message || "Request failed.");
    }

    const response = await api.json();
    
 if(response.message=="success"){
    localStorage.setItem("token", response.token);
    location.href="home.html";
 }
 else{
document.getElementById("msg").innerHTML=response.message;
 }
    console.log("Registration Success:", response);
    alert("Registration successful!");
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert("Registration failed: " + error.message);
  
const response=await api.json();
}
}