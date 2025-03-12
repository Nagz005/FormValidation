document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); 

    let userName = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm").value.trim();

    let unamePattern = /^[A-Za-z]+ [A-Za-z0-9]+$/;
    let emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;

    let isValid = true;

    // Username Validation
    if (userName === "") {
        document.getElementById("UnameError").innerText = "* Username is required";
        isValid = false;
    } else if (!unamePattern.test(userName)) {
        document.getElementById("UnameError").innerText = "* Enter your full name";
        isValid = false;
    } else {
        document.getElementById("UnameError").innerText = "";
    }

    // Email Validation
    if (email === "") {
        document.getElementById("emailerror").innerText = "* Email is required";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailerror").innerText = "* Enter a valid email";
        isValid = false;
    } else {
        document.getElementById("emailerror").innerText = "";
    }

    // Password Validation
    if (password === "") {
        document.getElementById("pwderror").innerText = "* Password is required";
        isValid = false;
    } else if (password.length < 3) {
        document.getElementById("pwderror").innerText = "* Enter a minimum of 3 characters";
        isValid = false;
    } else {
        document.getElementById("pwderror").innerText = "";
    }

    // Confirm Password Validation
    if (confirmPassword === "") {
        document.getElementById("cpwderror").innerText = "* Confirm password is required";
        isValid = false;
    } else if (confirmPassword !== password) {
        document.getElementById("cpwderror").innerText = "* Passwords do not match";
        isValid = false;
    } else {
        document.getElementById("cpwderror").innerText = "";
    }

    // If form is valid, submit the form
    if (isValid) {
        alert(`Hi ${userName}, welcome to our website!`);
        document.getElementById("form").submit();
    }
});
