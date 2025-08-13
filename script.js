"use strict";
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

// slider show at mobile view
const slider = function () {
  const sliderContainer = document.querySelector(".slider");
  const slides = document.querySelectorAll(".product-preview");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  let curSlide = 0;
  let maxSlide = slides.length;

  sliderContainer.style.overflow = "hidden";
  // curSlide: -100% 0% 100% 200%
  const gotoSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    gotoSlide(curSlide);
  };
  btnRight.addEventListener("click", nextSlide);

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    gotoSlide(curSlide);
  };

  const init = function () {
    gotoSlide(0);
  };
  init();

  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};
slider();

// slider show at dekstop view
const mainImage = document.querySelector(".main-image");
const thumbnails = document.querySelectorAll(".thumbnail");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    thumbnails.forEach((el) => el.classList.remove("active"));
    this.classList.add("active");
    mainImage.src = this.src;
  });
});
// quantity select with amount
const minusBtn = document.querySelector(".minus");
const pluBtn = document.querySelector(".add");
const quantity = document.querySelector(".quantity");
const amountDisplay = document.querySelector(".right-thick");

let quantityDecreaseIncrease = 0;
const unitPerSale = 125;

const updateSale = function () {
  quantity.textContent = quantityDecreaseIncrease;
  amountDisplay.textContent = unitPerSale * quantityDecreaseIncrease;
};

minusBtn.addEventListener("click", function () {
  if (quantityDecreaseIncrease > 1) quantityDecreaseIncrease--;
  updateSale();
});
pluBtn.addEventListener("click", function () {
  quantityDecreaseIncrease++;
  updateSale();
});

const cartImage = document.querySelector(".cart-image");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".close-cart");

cartImage.addEventListener("click", () => cart.classList.add("active"));
closeCart.addEventListener("click", () => cart.classList.remove("active"));

const cartBtn = document.querySelector(".btn-cart");
const cartBoxContainerContent = document.querySelector(".cart-content");

const cartTotal = document.querySelector(".cart-total");
let total = 0;
const arrayP = [];
const totalSum = function () {
  total += +amountDisplay.textContent;
  console.log(total);
  cartTotal.textContent = `Total: $${total}.00`;
};
const cartItemClass = document.querySelectorAll(".cart-box");
const totalBox = document.querySelector(".total-box");
const dollaSign = document.querySelector(".dolla").textContent;
cartBtn.addEventListener("click", (e) => {
  const cartBox = e.target.closest(".main-page-container");
  console.log(cartBox);
  // if (cartItemClass.length === 0) {
  //   alert("error");
  //   return;
  // }
  addToCart(cartBox);
});
const addToCart = (cartBox) => {
  // Get the src of the active thumbnail image
  const activeThumbnail = cartBox.querySelector(".thumbnail.active");
  const cartBoxImgSrc = activeThumbnail ? activeThumbnail.src : "";
  console.log(cartBoxImgSrc);
  const cartBoxTitle = cartBox.querySelector(".sub-title").textContent;
  console.log(cartBoxTitle);

  const cartItem = cartBoxContainerContent.querySelectorAll(".image-cart");
  console.log(cartItem);
  for (const item of cartItem) {
    if (item.src === cartBoxImgSrc) {
      alert("This item is already in the cart");
      return; // Exit the function if duplicate found
    }
  }

  const cartBoxPrice = cartBox.querySelector(
    ".sale-amount .right-thick"
  ).textContent;
  console.log(cartBoxPrice);

  const cartBoxContainer = document.createElement("div");

  cartBoxContainer.className = "box_Class";
  console.log(cartBoxContainer);
  cartBoxContainer.classList.add("cart-box");

  console.log(cartItemClass);
  cartBoxContainer.innerHTML = `
              <img
                src="${cartBoxImgSrc}"
                width="75"
                height="75"
                alt=""
                class="image-cart"
              />
              <div class="cart-text">
                <h1 class="cart-name">${cartBoxTitle}</h1>
                <div class="dolla">${dollaSign}<span class="cart-price each-price" data-price="1">${cartBoxPrice}.00</span>
                </div>
              
              </div>
              <button class="delete-btn">
                <img src="./images/icon-delete.svg" alt="delete-btn"  class="remove"/>
              </button> 
              
              `;

  cartBoxContainerContent.appendChild(cartBoxContainer);
  // Deletion of an item
  cartBoxContainer.querySelector(".remove").addEventListener("click", () => {
    const itemPrice = parseInt(
      cartBoxContainer.querySelector(".cart-price").textContent
    );

    total -= itemPrice;
    cartBoxContainer.remove();

    cartTotal.textContent = `Total: $${total}.00`;
    letCount(-1);
  });

  totalSum();
  letCount(1);
};
// Item count
let count = 0;
function letCount(clickCount) {
  const countNumber = document.querySelector(".cart-number");
  count += clickCount;
  if (count > 0) {
    countNumber.style.display = "block";
    countNumber.textContent = count;
  } else {
    countNumber.style.display = "none";
    countNumber.textContent = "";
  }
}
