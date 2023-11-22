//retrieve data from HTML storage and compare
//if the same, forward to "AccountPart2" or similar
//if not the same, don't update page
function submitLogIn(){
    const loginForm = document.getElementById("login");
    let checkEmail = document.getElementById("username").value;
    let checkPassword = document.getElementById("password").value;


    //update text on form validation
    const feedbackLine = document.querySelector("#feedbackLogin");

}