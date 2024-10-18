

var checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}

function addnewrestaurant() {
  let restaurantlist = []
  const restaurantname = document.getElementById('enter-restaurant');
  const inputrestaurant = restaurantname.value;
  restaurantlist.push(inputrestaurant).value;
  localStorage.setItem(restaurantlist, JSON.stringify(restaurantlist))
  console.log(restaurantlist);
}

