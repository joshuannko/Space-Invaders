// Global variables used by all functions
var emailInput = document.getElementById("email");
var usernameInput = document.getElementById("username");
var dobInput = document.getElementById("dob");
var addressInput = document.getElementById("address");
var passwordInput = document.getElementById("password");

var register = document.getElementById("registerBtn");
var login = document.getElementById("loginBtn");


// When buttons are clicked on the HTML pages, run these...
register.addEventListener("click",()=>{
    saveUser();
});

login.addEventListener("click",()=>{
    loginCheck();
});

// Function to validate password and store user in localStorage
function saveUser(){
    const PasswrdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;
    event.preventDefault();

    if (PasswrdRegex.test(passwordInput)){
        alert("Password must contain uppercase, lowercase, special & numeric characters and be minimum 8 characters");
        // break;
    } else {
        user = {
            username: usernameInput.value, 
            password: passwordInput.value, 
            email: emailInput.value, 
            dob: dobInput.value, 
            address: addressInput.value
        };
        localStorage.setItem(usernameInput.value, JSON.stringify(user));
        alert("Sign Up Successful!");
        console.log(user);
    }
}

// Function to validate user and log them in
function loginCheck(){
    event.preventDefault();
    localStorage.getItem(usernameInput.value);
    var tempUser = JSON.parse(localStorage.getItem(usernameInput.value));

    if (usernameInput.value == tempUser.username) {
        alert("login successful");
    }
    else{
        alert("login unsuccessful");
    }
}
