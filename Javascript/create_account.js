//adds new data to HTML storage
function submitRegister() {

    const registerForm = document.getElementById("register");
    const newUsername = document.getElementById("username").value;
    const newEmail = document.getElementById("email").value;
    const newPassword = document.getElementById("password").value;

        /* -------------- CHECKS FOR VALIDATION IN FORMS -------------- */
        const feedbackLine = document.querySelector("#feedback");

        if (newUsername == ""){
            feedbackLine.innerHTML = "empty username field!";
            return;
        }
    
        else if (newEmail == ""){
            feedbackLine.innerHTML = "empty email field!";
            return;
        }
    
        else if (newPassword == ""){
            feedbackLine.innerHTML = "empty password field!";
            return;
        }
    
        /*
        //checks format of password if it has AT LEAST the following:
        //an uppercase, lowercase, digits, and the length is minimum 6 characters
        var passRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*{6,})");
        let compPassword = document.getElementById("register").password.value;
    
    
        //if it DOESN'T match the regex/requirements
        if (!passRegex.test(compPassword)) {
            feedbackLine.innerHTML = "Password is weak! You're possibly missing at least the following: an Uppercase, lowercase, digit or the password is too short."
            return false;
        }
        */
    
        /* -------------- END OF CHECKS FOR VALIDATION IN FORMS --------------*/
        
    registerForm.addEventListener('submit', function(event) {
        //stops from HTML page from reloading
        event.preventDefault();
        

        /* STORES USER DATA TO HTML LOCAL STORAGE*/
        //declare user object and store data to it
        
        const userObject = {
            username: newUsername,
            email: newEmail,
            password: newPassword
        };

        const userData = JSON.stringify(userObject);
        //save string version of user data in local storage
        //each data will be unique as each key is the "email"
        localStorage.setItem(userObject.email, userData);
        sessionStorage.setItem(userObject.email, userData);

        window.location.href = "AccountPart2.html";
    })
}

window.onload = ()=> {
    const submitButton = document.querySelector("#SubmitRegister");
    submitButton.onclick =  submitRegister;
}