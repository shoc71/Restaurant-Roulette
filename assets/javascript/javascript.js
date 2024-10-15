

var checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}
let restaurantlist = []

function addnewrestaurant() {
  const restaurantname = document.getElementById('enter-restaurant');
  const inputrestaurant = restaurantname.value;
  restaurantlist.push(inputrestaurant).value;
  localStorage.setItem(restaurantlist, JSON.stringify(restaurantlist))
  console.log(restaurantlist);
}



const restaurantInput = document.getElementById('enter-restaurant');
const addRestaurantBtn = document.getElementById('add-restaurant-btn');
const restaurantList = document.getElementById('restaurant-list');

addRestaurantBtn.addEventListener('click', function() {
  const restaurantName = restaurantInput.value.trim(); 
  if (restaurantName) { 
      const li = document.createElement('li');
      li.textContent = restaurantName;
      restaurantList.appendChild(li);
      restaurantInput.value = '';
  }
});

console.log(restaurantList)