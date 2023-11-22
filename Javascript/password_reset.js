//when user request for password reset
function submitReset() {
    let checkEmail = document.getElementById("requestReset").email.value;
    const feedbackLine = document.querySelector("#feedbackResetPass");

    //check if user input correct email or not
    if (localStorage[checkEmail] === undefined){
        feedbackLine.innerHTML = "Email not recognised. Please try again.";
        return;
    } else {
        window.location.href = "AccountResetPass.html";
    }
}

//handles updating password key for specific user in HTML storage
function resetPassword() {
    let comparePass = document.getElementById("resetPass").initialPassword.value;
    let reset = document.getElementById("resetPass").password.value;
    //set new password to local storage
    localStorage.setItem("password", reset)
}

//button for requesting password reset
window.onload = ()=> {
    const submitButton = document.querySelector("#SubmitRequestResetPass");
    submitButton.onclick =  submitReset;
}