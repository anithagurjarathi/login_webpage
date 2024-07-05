window.addEventListener('DOMContentLoaded', (event) => {
    const rememberedUsername = localStorage.getItem('rememberedUsername')

    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
    }

    if (rememberedUsername) {
        document.getElementById('rememberMe').checked = true;
    }
});
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const responseMessage = document.getElementById('responseMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loginForm = document.getElementById('loginForm');
    const rememberMe = document.getElementById('rememberMe').checked;


    usernameError.textContent = '';
    passwordError.textContent = '';
    responseMessage.textContent = '';


    let isValid = true;

    if (!username || !validateEmail(username)) {
        usernameError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!password || password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    if (!isValid) {
        return;
    }
    loadingSpinner.style.display = 'block';
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none';
            responseMessage.textContent = 'Login successful!';
            responseMessage.style.color = 'green';

            if (rememberMe) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
            responseMessage.textContent = 'Login failed. Please try again.';
            responseMessage.style.color = 'red';
        });
});
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
