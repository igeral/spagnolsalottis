const prodotti = document.querySelector(".prodotti-child");
const overlay = document.querySelector(".overlay-nav");
const prodottiLinks = document.querySelectorAll(".change-color");
const menu = document.querySelectorAll(".underline-hover-effect");
const fb = document.querySelectorAll(".fb");
const icon = document.querySelectorAll(".icon");
const openMenu = document.querySelector(".menuOpen");
const cancel = document.querySelector(".fa-times");
const text = document.querySelector(".fr2")

openMenu.addEventListener("click", () => {
  overlay.classList.toggle("showmenu");
});
// cancel.addEventListener("click", () => {
//   overlay.classList.toggle("showmenu");
// });

document.addEventListener("scroll", () => {
  overlay.classList.remove("showmenu");
});

const showMenu = (headerToggle) => {
  const toggleBtn = document.getElementById(headerToggle);
  // Validate that variables exist
  toggleBtn.addEventListener("click", () => {
    // change icon
    toggleBtn.classList.toggle("bx-x");
    document.querySelector(".menuMobile").classList.toggle("left");
  });
};
showMenu("header-toggle");
document.querySelector(".hasDropDown").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".menue").style.transform = "translateX(-100%)";
  document.querySelector(".menue").style.transitionDuration = "1s";
  document.querySelector(".items").style.transform = "translateX(0%)";
  document.querySelector(".items").style.transitionDuration = "0.5s";
});
document.querySelector(".backone").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".menue").style.transform = "translateX(0%)";
  document.querySelector(".menue").style.transitionDuration = "1s";
  document.querySelector(".items").style.transform = "translateX(100%)";
  document.querySelector(".items").style.transitionDuration = "0.5s";
});

var scrollTriggerAnimation = 60;
var minHeight = 1024

window.onscroll = function () {
  if (window.scrollY >= scrollTriggerAnimation && screen.width >= minHeight) {
    text.classList.add('scroll')
    console.log('scroll')
  } else {
    text.classList.remove('scroll')
  }

}
console.log(window.scrollY)