// Mock "database" for user credentials stored in JSON
let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
let currentUser = null; // Check if user is logged in

// Function to handle login
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = user // Store logged-in user
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        document.getElementById('message').textContent = 'Login successful!';
        loadUserFavourites();
        window.location.href = 'index.html' // redirect link
        // setTimeout(() => {
        // });
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
        const newUser = { username, password, favourites : [] }
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('message').textContent = 'Sign up successful! You can now login.';
    }
}

// Load user's favorites after login
function loadUserFavorites() {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser && storedUser.favourites) {
        favourites = storedUser.favourites;
        renderFavourites();  // Update the UI to display user-specific favourites
    }
}

// Save favorites when updated
function saveFavorites() {
    currentUser.favourites = favourites;
    const updatedUsers = users.map(u => u.username === currentUser.username ? currentUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));  // Update the localStorage with new favourites
}

document.addEventListener('DOMContentLoaded', () => {
    const userSection = document.getElementById('user-section');
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUser) {
        // User is logged in, display their name and a dropdown menu
        userSection.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-light dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Welcome, ${storedUser.username}
                </button>
                <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="#" id="logout">Logout</a></li>
                </ul>
            </div>
        `;

        // Add logout functionality
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('currentUser');  // Remove the current user from localStorage
            window.location.href = 'login.html';  // Redirect to login page
        });
    } else {
        // User is not logged in, show the login button
        userSection.innerHTML = `<a href="login.html" class="btn btn-outline-light">Login</a>`;
    }
});