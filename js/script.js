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
  const toggleBtn = document.querySelectorAll(headerToggle);
  // Validate that variables exist
  toggleBtn.forEach(btn => btn.addEventListener("click", () => {
    // change icon
    btn.classList.toggle("bx-x");
    document.querySelector(".menuMobile").classList.toggle("left");
  }));
};
showMenu("#header-toggle");
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

// window.onscroll = function () {
//   if (!text) return;
//   if (window.scrollY >= scrollTriggerAnimation && screen.width >= minHeight) {
//     text.classList.add('scroll')
//     console.log('scroll')
//   } else {
//     text.classList.remove('scroll')
//   }

// }

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  reveals.forEach(reveal => {
    var windowHeight = window.innerHeight;
    var elementTop = reveal.getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  })
}

function revealleft() {
  var revealsleft = document.querySelectorAll(".revealleft");
  revealsleft.forEach(reveal => {
    var windowHeight = window.innerHeight;
    var elementTop = reveal.getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  })
}

function revealright() {
  var revealsright = document.querySelectorAll(".revealright");
  revealsright.forEach(reveal => {
    var windowHeight = window.innerHeight;
    var elementTop = reveal.getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  })
}

window.addEventListener("scroll", reveal);
window.addEventListener("scroll", revealleft);
window.addEventListener("scroll", revealright);

localStorage.setItem('language', 'it')
const italian = document.querySelector('.italian')
const english = document.querySelector('.english')
const russian = document.querySelector('.russian')
const spanish = document.querySelector('.spanish')
const german = document.querySelector('.german')

const language = document.querySelector('.language')

language.addEventListener('click', function (e) {
  if (e.target.classList.contains('it')) {
    localStorage.setItem('language', 'it');
  } else if (e.target.classList.contains('en')) {
    localStorage.setItem('language', 'en');
  } else if (e.target.classList.contains('ru')) {
    localStorage.setItem('language', 'ru');
  } else if (e.target.classList.contains('es')) {
    localStorage.setItem('language', 'es');
  } else if (e.target.classList.contains('de')) {
    localStorage.setItem('language', 'de');
  }

  changeLaguage();
})

function changeLaguage() {

  if (localStorage.getItem('language') === 'en') {
    english.classList.remove('hidetext')
    italian.classList.add('hidetext')
    russian.classList.add('hidetext');
    spanish.classList.add('hidetext');
    german.classList.add('hidetext');
  } else if (localStorage.getItem('language') === 'it') {
    italian.classList.remove('hidetext')
    english.classList.add('hidetext')
    russian.classList.add('hidetext');
    spanish.classList.add('hidetext');
    german.classList.add('hidetext');
  } else if (localStorage.getItem('language') === 'ru') {
    italian.classList.add('hidetext')
    english.classList.add('hidetext')
    russian.classList.remove('hidetext');
    spanish.classList.add('hidetext');
    german.classList.add('hidetext');
  } else if (localStorage.getItem('language') === 'es') {
    italian.classList.add('hidetext')
    english.classList.add('hidetext')
    russian.classList.add('hidetext');
    spanish.classList.remove('hidetext');
    german.classList.add('hidetext');
  } else if (localStorage.getItem('language') === 'de') {
    italian.classList.add('hidetext')
    english.classList.add('hidetext')
    russian.classList.add = ('hidetext');
    spanish.classList.add('hidetext');
    german.classList.remove('hidetext');
  }
}

changeLaguage();



