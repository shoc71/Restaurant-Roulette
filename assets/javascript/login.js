// Mock "database" for user credentials stored in JSON
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Function to handle login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        document.getElementById('message').textContent = 'Login successful!';
    } else {
        document.getElementById('message').textContent = 'Invalid username or password.';
    }
}

// Function to handle sign-up
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (users.find(u => u.username === username)) {
        document.getElementById('message').textContent = 'Username already exists.';
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('message').textContent = 'Sign up successful! You can now login.';
    }
}
