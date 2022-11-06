const prodotti = document.querySelector(".prodotti-child");
const overlay = document.querySelector(".overlay-nav");
const prodottiLinks = document.querySelectorAll(".change-color");
const menu = document.querySelectorAll(".underline-hover-effect");
const fb = document.querySelectorAll(".fb");
const icon = document.querySelectorAll(".icon");
const openMenu = document.querySelector(".menuOpen");
const cancel = document.querySelector(".fa-times");


openMenu.addEventListener("click", () => {
  overlay.classList.toggle("showmenu");
});
// cancel.addEventListener("click", () => {
//   overlay.classList.toggle("showmenu");
// });

document.addEventListener("scroll", () => {
  overlay.classList.remove("showmenu");
});
// function sendEmail() {
//   Email.send({
//     // SecureToken: "885e77be-3730-4a22-b70a-8dd7151a842b",
//     Host: "smtp.elasticemail.com",
//     Username: "geraldegbuna07@gmail.com",
//     // Password: "073767CDA3126FDD7B2E27568A5AAFDF1E18",
//     Password: "3FFB6770777FC6C12ABFCEDAA89525471729",
//     To: "ogoayorindeshekinah@gmail.com",
//     From: document.getElementById("email").value,
//     Subject: "Contact form enquiry",
//     Body:
//       "Name: " +
//       document.getElementById("name").value +
//       "<br> Cognome: " +
//       document.getElementById("surname") +
//       "<br> Phone no: " +
//       document.getElementById("number").value +
//       "<br> Request: " +
//       document.getElementById("request").value,
//   }).then(swal("Submited successfully"));

//   console.log(
//     "Name: " +
//       document.getElementById("name").value +
//       "<br> Cognome: " +
//       document.getElementById("surname") +
//       "<br> Phone no: " +
//       document.getElementById("number").value +
//       "<br> Request: " +
//       document.getElementById("request").value
//   );
// }
// document.getElementById("submit").addEventListener("click", (e) => {
//   e.preventDefault();
//   sendEmail();
// });


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


