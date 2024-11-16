document.getElementById("fio").addEventListener("input", function() {
    const fioPattern = /^[A-Z][a-z]+\s[A-Z][a-z]+\s[A-Z][a-z]+$/;
    const feedback = document.getElementById("fioFeedback");

    if (fioPattern.test(this.value)) {
        this.classList.remove("invalid");
        this.classList.add("valid");
        feedback.textContent = "Valid input!";
        feedback.classList.add("valid");
    } else {
        this.classList.remove("valid");
        this.classList.add("invalid");
        feedback.textContent = "FIO must consist of 3 words and each word start with a capital letter. Use only letters";
        feedback.classList.remove("valid");
    }
});

document.getElementById("password").addEventListener("input", function() {
    const password = this.value;
    const feedback = document.getElementById("passwordFeedback");

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
    const hasNoInvalidChars = !/[*/^\\]/.test(password);

    if (isLongEnough && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasNoInvalidChars) {
        this.classList.add("valid");
        this.classList.remove("invalid");
        feedback.textContent = "Strong password!";
        feedback.style.color = "#4caf50";
    } else {
        this.classList.add("invalid");
        this.classList.remove("valid");
        feedback.textContent = "Password must be at least 8 characters, contain uppercase, lowercase, a number, a special character, and not use * / ^ \\";
        feedback.style.color = "#ff4d4d";
    }
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    const passwordInput = document.getElementById("password");
    const fioInput = document.getElementById("fio");
    
    if (!passwordInput.classList.contains("valid") || !fioInput.classList.contains("valid")) {
        event.preventDefault();
        alert("Please enter a valid FIO and password.");
    }
});