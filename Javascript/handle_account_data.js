//adds new data to HTML storage
//------ THIS IS FOR AccountPart1.html ------
function validateForm() {
    const newUsername = document.getElementById("createUsername").value;
    const newEmail = document.getElementById("createEmail").value;
    const newPhone = document.getElementById("createTel").value;
    const newPassword = document.getElementById("createPassword").value;

    /* -------------- CHECKS FOR VALIDATION IN FORMS --------------*/
    const feedbackUsername = document.getElementById("feedbackUsername");
    const feedbackEmail = document.getElementById("feedbackEmail");
    const feedbackPhone = document.getElementById("feedbackPhone");
    const feedbackPassword = document.getElementById("feedbackPassword");
    feedbackUsername.innerHTML = "";
    feedbackEmail.innerHTML = "";
    feedbackPhone.innerHTML = "";
    feedbackPassword.innerHTML = "";

    if (newUsername === "") {
        feedbackUsername.innerHTML = "empty username field!";
        return false;
    }
    if (newEmail == "") {
        feedbackEmail.innerHTML = "empty email field!";
        return false;
    }

    /*
    const emailRegex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
    if (!emailRegex.test(newEmail)) {
        feedbackEmail.innerHTML = "Incorrect Email format!"
        return false;
    }
    */

    if (newPhone == "") {
        feedbackPhone.innerHTML = "empty phone number field!";
        return false;
    }

    const phoneRegex = new RegExp("[0-9]{5} [0-9]{6}");
    if (!phoneRegex.test(newPhone)) {
        feedbackPhone.innerHTML = "Incorrect Phone Number format!"
        return false;
    }

    if (newPassword == "") {
        feedbackPassword.innerHTML = "empty password field!";
        return false;
    }

    //checks format of password if it has AT LEAST the following:
    //an uppercase, lowercase, digits, and the length is minimum 6 characters
    const passRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*{6,})");

    //if it DOESN'T match the regex/requirements
    if (!passRegex.test(newPassword)) {
        feedbackPassword.innerHTML =
            "Password is weak! You're possibly missing at least the following: an Uppercase, lowercase, digit or the password is too short."
        return false;
    }

    return true;
}

function submitRegister() {

    //const registerForm = document.getElementById("register");
    const newUsername = document.getElementById("createUsername").value;
    const newEmail = document.getElementById("createEmail").value;
    const newPhone = document.getElementById("createTel").value;
    const newPassword = document.getElementById("createPassword").value;


    /* STORES USER DATA TO HTML LOCAL STORAGE*/
    //declare user object and store data to it

    const userObject = {
        username: newUsername,
        email: newEmail,
        password: newPassword,
        telephone: newPhone,
        score: 0,
    };

    const userData = JSON.stringify(userObject);
    //save string version of user data in local storage
    //each data will be unique as each key is the "email"
    localStorage.setItem(userObject.email, userData);
    sessionStorage.setItem(userObject.email, userData);

    window.location.href = "AccountPart2.html";
    alert("Account Creation Successful!");
}



//retrieve data from HTML storage and compare
//if the same, forward to "AccountPart2" or similar
//if not the same, don't update page

function validateLoginForm() {
    const checkEmail = document.getElementById("emailLogin").value;
    const checkPassword = document.getElementById("passwordLogin").value;
    const feedbackLoginEmail = document.getElementById("feedbackLoginEmail");
    const feedbackLoginPassword = document.getElementById("feedbackLoginPassword");
    feedbackLoginEmail.innerHTML = "";
    feedbackLoginPassword.innerHTML = "";

    if (checkEmail === "") {
        feedbackLoginEmail.innerHTML = "empty email field!";
        return false;
    }

    if (checkPassword === "") {
        feedbackLoginPassword.innerHTML = "empty password field!";
        return false;
    }
}


function submitLogIn() {

    const checkEmail = document.getElementById("emailLogin").value;
    const checkPassword = document.getElementById("passwordLogin").value;
    let emailFound = false;

    //check if email is stored in localStorage
    for (var i = 0; i < localStorage.length; i++) {
        const storedEmail = localStorage.key(i);

        if (checkEmail == storedEmail) {
            emailFound = true;

            const userData = localStorage.getItem(storedEmail);
            const parseUserData = JSON.parse(userData);

            if (checkPassword == parseUserData.password) {
                //password matches, store user data to sessionStorage
                sessionStorage.setItem(checkEmail, userData);
                window.location.href = "AccountPart2.html";
                alert("Login Successful!");

                //exit the loop as user is found and password matches
                break;
            } else {
                alert("Wrong Password");
                //exit loop as password doesn't match
                break;
            }
        }
    }

    //if it iterated through every key and hasn't found the email
    if (emailFound == false) {
        alert("Email cannot be found");
    }

}



function validateReqPass() {
    const currentEmail = document.getElementById("email").value;
    const feedbackResetPass = document.getElementById("feedbackResetPass");
    feedbackResetPass.innerHTML = "";


    if (currentEmail == "") {
        feedbackResetPass.innerHTML = "empty email field!";
        return false;
    }
}


function reqResetPass() {
    const currentEmail = document.getElementById("email").value;
    let emailFound = false;

    for (var i = 0; i < localStorage.length; i++) {
        if (currentEmail == localStorage.key(i)) {
            emailFound = true;
            alert("Email sent. Check your inbox (or Junk mail).");
            return false;
        }
    }

    //if it iterated through every key and hasn't found the email
    if (emailFound == false) {
        alert("Email not found.");
        return false;
    }
}

//------ THIS IS FOR AccountPart1.html ------
//-----------------------------------------------------------------
//------ THIS IS FOR AccountPart2.html ------

function DisplaySuccessfulLogInUsername() {
    // Retrieve the keys from sessionStorage

    const retrieveUserData = sessionStorage.getItem(sessionStorage.key(1));
    const userDataToObject = JSON.parse(retrieveUserData);
    const storedUsername = userDataToObject.username;
    const feedbackSuccess = document.getElementById("updateUsername");
    feedbackSuccess.innerHTML = "";

    feedbackSuccess.innerHTML = storedUsername;
}


function logOutAccount() {
    sessionStorage.clear();
    window.location.href = "AccountPart1.html";
}

//------ THIS IS FOR AccountPart2.html ------
//-----------------------------------------------------------------
//------ THIS IS FOR Leaderboard.html ------

//javascript to extract name and score from localStorage
function displayLeaderboardData() {
    //if localstorage is empty OR the first key is 'loglevel' (live server creates sometimes)
    //use the template instead
    if (localStorage.length == 0 || localStorage.key(0) == 'loglevel') {
        displayLeaderboardTemplate();
    }

    
    const rankingTable = document.querySelector("#RankingBox");
    //beginning of table creation
    let rankingStr = "<h1> Leaderboards </h1><table class='RankingPageTable'><tr><th>Position</th><th>Name</th><th>Highest Score</th></tr>";

    //leaderboard position
    let count = 0;

    //retrieve each key, parse it, retrieve the username and score
    for (var i = 0; i < localStorage.length; i++) {
        count++;
        const storedEmail = localStorage.key(i);

        //check if key is 'W'/'loglevel' as sometimes live server creates this when live
        if (storedEmail == 'loglevel') {
            continue; //skip to next loop
        }
        const userData = localStorage.getItem(storedEmail);
        const parseUserData = JSON.parse(userData);

        //add-on table
        rankingStr += `<tr class="RankingPageTableRow"><td>${count}</td><td>${parseUserData.username}</td><td>${parseUserData.score}</td></tr>`;

    }

    //end of table creation
    rankingStr += "</table>";
    rankingTable.innerHTML = rankingStr;
}

//use only if localStorage is empty
function displayLeaderboardTemplate() {
    const rankingTable = document.querySelector("#RankingBox");
    //beginning of table creation
    let rankingStr = "<h1> Leaderboard Template </h1><table class='RankingPageTable'><tr><th>Position</th><th>Name</th><th>Highest Score</th></tr>";

    rankingStr += "<tr class='RankingPageTableRow'><td>#1</td><td> Player Name 1 </td><td>123456789</td></tr>"
    rankingStr += "<tr class='RankingPageTableRow'><td>#2</td><td> Player Name 2 </td><td>12345678</td></tr>"
    rankingStr += "<tr class='RankingPageTableRow'><td>#3</td><td> Player Name 3 </td><td>12345673</td></tr>"
    rankingStr += "<tr class='RankingPageTableRow'><td>#4</td><td> Player Name 4 </td><td>1234567</td></tr>"
    rankingStr += "<tr class='RankingPageTableRow'><td>#5</td><td> Player Name 5 </td><td>12345678</td></tr>"

    rankingStr += "</table>";
    rankingTable.innerHTML = rankingStr;
}