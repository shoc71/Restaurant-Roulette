

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
function clickMe(){
  const click = document.getElementById("myTextbox");

  if(click.style.display === "none"){
    click.style.display = "block";
  }
  else{
    click.style.display = "none";
  }
}
function clickMeComment(){
  const click = document.getElementById("myTextboxLable");

  if(click.style.display === "none"){
    click.style.display = "block";
  }
  else{
    click.style.display = "none";
  }
}