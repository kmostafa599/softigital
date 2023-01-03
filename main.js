var slider = document.getElementById("rangeBar");
var output = document.getElementById("valueRange");
// output.innerHTML = slider.value;

// slider.oninput = function () {
//   output.innerHTML = this.value;
// };

function cartBox() {
  document.getElementById("cartBox").style.display = "none";
}

document.querySelector(".show-controller-buttons").onclick = function () {
  document.querySelector(".f-nav-btn").classList.toggle("show");
};

document.querySelector(".show-login-buttons").onclick = function () {
  document.querySelector(".menu-list").classList.toggle("show");
};
document.querySelector(".close-chat-bar").onclick = function () {
  document.querySelector(".chat-bar").classList.remove("show");
};
document.querySelector(".open-chat-bar").onclick = function () {
  document.querySelector(".chat-bar").classList.add("show");
};
