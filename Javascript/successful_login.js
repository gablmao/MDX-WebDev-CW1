function DisplaySuccessfulLogInUsername(){
    // Retrieve the keys from sessionStorage
    const keys = Object.keys(sessionStorage);
    const retrieveUserData = sessionStorage.getItem(keys[1]);
    const userDataToObject = JSON.parse(retrieveUserData);
    const storedUsername = userDataToObject.username;

    document.querySelector("#updateUsername").innerHTML = storedUsername;
}

window.onload = DisplaySuccessfulLogInUsername;