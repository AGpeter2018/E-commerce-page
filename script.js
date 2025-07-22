const menu = document.querySelector(".menu");
const closeBtn = document.querySelector(".close-btn");
const sideBar = document.querySelector(".side-bar");
const overlay = document.querySelector(".overlay");

const openBar = function () {
  sideBar.style.transform = "translateX(-100px)";
  sideBar.classList.remove("hidden");
  //   overlay.classList.remove("hidden");
};

const closeBar = function () {
  sideBar.style.transform = "";
  sideBar.classList.add("hidden");
  overlay.classList.add("hidden");
};
menu.addEventListener("click", openBar);
closeBtn.addEventListener("click", closeBar);

document.addEventListener("keydown", function (e) {
  // console.log(e);
  if (e.key === "Escape") closeBar();
});
