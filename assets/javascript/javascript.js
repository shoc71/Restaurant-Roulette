// DOM Elements
const restaurantInput = document.getElementById('enter-restaurant');
const addRestaurantBtn = document.getElementById('add-restaurant-btn');
const restaurantList = document.getElementById('restaurant-list');
const favouritesList = document.getElementById('favourites-list');
let restaurants = JSON.parse(localStorage.getItem('restaurants')) || []; // Load restaurants from localStorage
let favourites = JSON.parse(localStorage.getItem('favourites')) || []; // Load favourites from localStorage

// Store restaurants in localStorage and navigate to spinner.html
document.getElementById('spinnerIsReady').addEventListener('click', () => {
  if (restaurants.length > 0) {
      localStorage.setItem('selectedChoices', JSON.stringify(restaurants));
      window.location.href = 'spinner.html'; 
  } else {
      alert("Please add at least one restaurant before spinning.");
  }
});

// Function to render the restaurant list
function renderRestaurants() {
    restaurantList.innerHTML = '';
    restaurants.forEach((restaurant, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-12', 'mb-3', 'grey-card');
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${restaurant}</h5>
                <button class="btn btn-warning btn-sm mr-2" onclick="favouriteRestaurant(${index})">Favourite</button>
                <button class="btn btn-danger btn-sm" onclick="deleteRestaurant(${index})">Delete</button>
            </div>
        `;
        restaurantList.appendChild(card);
    });
};

// Function to render the favourites list
function renderFavourites() {
  favouritesList.innerHTML = '';
  favourites.forEach((restaurant, index) => {
      const card = document.createElement('div');
      card.classList.add('card', 'col-md-12', 'mb-3', 'grey-card');
      card.innerHTML = `
          <div class="card-body">
              <h5 class="card-title">${restaurant}</h5>
              <!-- Button to add the favourite back to the restaurant list -->
              <button class="btn btn-success btn-sm mr-2" onclick="addBackToRestaurantList(${index})">Add Back to List</button>
              <!-- Button to remove from favourites -->
              <button class="btn btn-danger btn-sm" onclick="removeFavourite(${index})">Remove</button>
          </div>
      `;
      favouritesList.appendChild(card);
  });
};

// Add restaurant to the list
addRestaurantBtn.addEventListener('click', function() {
    const restaurantName = restaurantInput.value.trim();
    if (restaurantName && !restaurants.includes(restaurantName)) { // Avoid duplicates
        restaurants.push(restaurantName);
        localStorage.setItem('restaurants', JSON.stringify(restaurants)); // Save restaurants to localStorage
        restaurantInput.value = '';
        renderRestaurants(); // Re-render the restaurant list
    }
});

// Favourite a restaurant
function favouriteRestaurant(index) {
    const restaurant = restaurants[index];
    if (!favourites.includes(restaurant)) {
        favourites.push(restaurant);
        localStorage.setItem('favourites', JSON.stringify(favourites)); // Save favourites to localStorage
        renderFavourites(); // Re-render favourites
    }
};

// Add back a favourite to the restaurant list
function addBackToRestaurantList(index) {
  const restaurant = favourites[index];
  if (!restaurants.includes(restaurant)) { // Avoid duplicates
      restaurants.push(restaurant);
      localStorage.setItem('restaurants', JSON.stringify(restaurants)); // Update localStorage
      renderRestaurants(); // Re-render the restaurant list
  }
};

// Delete a restaurant from the list
function deleteRestaurant(index) {
    restaurants.splice(index, 1);
    localStorage.setItem('restaurants', JSON.stringify(restaurants)); // Update localStorage
    renderRestaurants(); // Re-render the restaurant list
};

// Remove a restaurant from favourites
function removeFavourite(index) {
    favourites.splice(index, 1);
    localStorage.setItem('favourites', JSON.stringify(favourites)); // Update localStorage
    renderFavourites(); // Re-render the favourites list
};

// Random restaurant selection
document.getElementById('randomButton').addEventListener('click', () => {
    const output = document.getElementById("output");
    if (restaurants.length > 0) {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        output.textContent = `Randomly selected: ${restaurants[randomIndex]}`;
    } else {
        output.textContent = "No restaurants available to select.";
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderRestaurants();
    renderFavourites();
});