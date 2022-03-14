let logForm = document.getElementById('loginForm');
let btnLogin = document.getElementById('login-submit');
let user = document.querySelector('#username');
let password = document.querySelector('#password');
let errorUser = document.querySelector('#error-user')
let errorPassword = document.querySelector('#error-password')
let usernameSet = 'Qwerty123'
let passwordSet = 'Qwerty123';

console.log(password.value);

// Login functions

function checkUser() {
    let userMinValue = 8;
    let userVal = user.value.trim();

    console.log(userVal);
    if (userVal.length < userMinValue) {
        errorUser.textContent = 'Minimum character for username is 8';
        return false;
    } else {
        if (userVal === usernameSet) {
            errorUser.textContent = '';
            return true;

        } else {
            errorUser.textContent = 'Invalid username';
            return false;
        }
    }
}

function checkPassword() {
    console.log('jirah');
    let pwdExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
    let passwordVal = password.value.trim();
    console.log(passwordVal);

    if (passwordVal !== passwordSet) {
        errorPassword.textContent = 'Invalid password'
        return false;
    } else {
        return true;
    }
}

//login handler
logForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (checkUser()) {
        if(checkPassword()){
            location.replace("clinic_registration.html");
        } else{
            alert('Username and password does not match.');
        }
    }else{
        // alert('Username not match')
    }
})