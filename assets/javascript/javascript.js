// DOM Elements
const restaurantInput = document.getElementById('enter-restaurant');
const addRestaurantBtn = document.getElementById('add-restaurant-btn');
const restaurantList = document.getElementById('restaurant-list');
const favouritesList = document.getElementById('favourites-list');
const spinnerLink = document.getElementById('spinnerLink');
let restaurants = JSON.parse(localStorage.getItem('restaurants')) || []; // Load restaurants from localStorage
let favourites = JSON.parse(localStorage.getItem('favourites')) || []; // Load favourites from localStorage
let currentIndex = 0; // To keep track of the current recommendation

// Restaurant Options
const recommended = [
    'Pizza Palace',
    'Sushi World',
    'Burger Haven',
    'Pasta Paradise',
    'Steakhouse Deluxe',
    'Vegan Bistro',
    'Taco Tower',
    'Dim Sum Delight',
    'BBQ Barn',
    'Pizzaville',
    'Saffron',
    'Maharaja Bhog',
    'PizzaPizza',
    'Seafood Shack',
    'Taco Bell',
    'Chick-Fil-A',
    'McDonalds',
    'Burger King',
    'Five Guys',
    'Wendys',
    'Indian Sweet Master',
    'Restaurant Pearl Morissette',
    'Mon Lapin',
    'Alo',
    'Portico Restaurant and Bar',
    'New York Deli',
    'Galaxy Diner',
    'Sensi',
    'Qdoba'
];

spinnerLink.addEventListener('click', function(event) {
    event.preventDefault();

    if (restaurants.length > 1) {
        window.location.href = 'spinner.html';
    } else {
        alert('Please add at least two restaurant before spinning.');
    }
});

// Store restaurants in localStorage and navigate to spinner.html
document.getElementById('spinnerIsReady').addEventListener('click', () => {
  if (restaurants.length > 1) {
      localStorage.setItem('selectedChoices', JSON.stringify(restaurants));
      window.location.href = 'spinner.html'; 
  } else {
      alert("Please add at least two restaurant before spinning.");
  }
});

// Function to render the restaurant list
function renderRestaurants() {
    restaurantList.innerHTML = '';
    restaurants.forEach((restaurant, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-12', 'mb-3');
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${restaurant}</h5>
                <button class="btn btn-warning btn-sm mr-2" onclick="favouriteRestaurant(${index})">Favourite</button>
                <button class="btn btn-danger btn-sm" onclick="deleteRestaurant(${index})">Remove</button>
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
      card.classList.add('card', 'col-md-12', 'mb-3');
      card.innerHTML = `
          <div class="card-body">
              <h5 class="card-title">${restaurant}</h5>
              <!-- Button to add the favourite back to the restaurant list -->
              <button class="btn btn-success btn-sm mr-2" onclick="addBackToRestaurantList(${index})">Add to List</button>
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
    if (restaurantName && !restaurants.includes(restaurantName)) { 
        restaurants.push(restaurantName);
        localStorage.setItem('restaurants', JSON.stringify(restaurants)); 
        restaurantInput.value = '';
        renderRestaurants(); 
    }
});

// Favourite a restaurant
function favouriteRestaurant(index) {
    const restaurant = restaurants[index];
    if (!favourites.includes(restaurant)) {
        favourites.push(restaurant);
        localStorage.setItem('favourites', JSON.stringify(favourites)); 
        renderFavourites(); 
    }
};

// Add back a favourite to the restaurant list
function addBackToRestaurantList(index) {
  const restaurant = favourites[index];
  if (!restaurants.includes(restaurant)) { 
      restaurants.push(restaurant);
      localStorage.setItem('restaurants', JSON.stringify(restaurants)); 
      renderRestaurants(); 
  }
};

function addToFavourites(restaurant) {
    if (!favourites.includes(restaurant)) {
        favourites.push(restaurant);
        saveFavorites();  
        renderFavourites();  
    }
}

// Remove a restaurant from favourites
function removeFavourite(index) {
    favourites.splice(index, 1);
    saveFavorites();  
    renderFavourites();  
}

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

// Function to render recommended options
function renderRecommended() {
    const recommendedList = document.getElementById('recommended-list');
    recommendedList.innerHTML = ''; // Clear the current content

    // Display 5 recommended options, and loop back if necessary
    for (let i = 0; i < 5; i++) {
        const currentOptionIndex = (currentIndex + i) % recommended.length; // Loop back when needed
        const restaurant = recommended[currentOptionIndex];
    
        // Create the card for the current recommended option
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-12', 'mb-3');
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${restaurant}</h5>
                <!-- Button to add back to restaurant list -->
                <button class="btn btn-success btn-sm mr-2">Add to List</button>
                <!-- Button to add to favourites -->
                <button class="btn btn-warning btn-sm">Add to Favourites</button>
            </div>
        `;
        
        // Add event listener for 'Add to Favourites' button
        const addToFavBtn = card.querySelector('.btn-warning');
        addToFavBtn.addEventListener('click', () => addToFavourites(restaurant));

        // Add event listener for 'Add to List' button (directly adds to the restaurants list)
        const addToListBtn = card.querySelector('.btn-success');
        addToListBtn.addEventListener('click', () => {
            if (!restaurants.includes(restaurant)) {  // Avoid duplicates
                restaurants.push(restaurant);
                localStorage.setItem('restaurants', JSON.stringify(restaurants));  // Update localStorage
                renderRestaurants();  // Re-render the restaurant list
            }
        });

        recommendedList.appendChild(card);
    }

    // Update index and loop back if necessary
    currentIndex = (currentIndex + 5) % recommended.length;
}

// Function to continuously rotate recommended options
function startRotatingRecommendations() {
    renderRecommended(); // Show the first recommended option
    setInterval(renderRecommended, 10000); // Change option every 10 seconds
}

// Function to add a recommended item to favourites
function addToFavourites(restaurant) {
    favourites.push(restaurant);
    renderFavourites(); // Re-render favourites list
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderRestaurants();
    renderFavourites();
    startRotatingRecommendations();
});