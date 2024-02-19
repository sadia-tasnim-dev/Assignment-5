// * dom elements * \\
const seatButtonsDom = document.getElementsByClassName("seatButton");
const remainingSeatsDom = document.getElementById("remainingSeats");
const bookingContainerDom = document.getElementById("bookingContainer");
const noSeatDom = document.getElementById("noSeat");
const totalPriceDom = document.getElementById("totalPrice");
const grandTotalDom = document.getElementById("grandTotal");
const couponInputDom = document.getElementById("couponInput");
const applyCouponButtonDom = document.getElementById("applyCouponButton");
const totalBookingDom = document.getElementById("totalBooking");
const discountContainerDom = document.getElementById("discountContainer");
const couponContainerDom = document.getElementById("couponContainer");
const phoneInputDom = document.getElementById("phoneInput");
const submitButtonDom = document.getElementById("submitButton");
const modalDom = document.getElementById("modal");
const continueButtonDom = document.getElementById("continueButton");

// * variables * \\
const totalSeats = 20;
const pricePerSeat = 550;
let totalSeatSelected = 0;
const selectedSeatsObject = {};
const bookingRowClass = "flex justify-between mt-4 font-medium text-gray-500";
const discountCouponObject = {
  NEW15: 0.15,
  "Couple 20": 0.2,
};

let phone = "";

// adding event lister for each seats
for (const button of seatButtonsDom) {
  button.addEventListener("click", function () {
    const buttonInnerHtml = button.innerHTML.trim();
    handleSelectSeats(buttonInnerHtml, button);
  });
}

// event listener to the apply coupon button
applyCouponButtonDom.addEventListener("click", applyCoupon);

// handle when any seat is selected
function handleSelectSeats(seatNumber, element) {
  totalSeatSelected = Object.keys(selectedSeatsObject).length;
  // checking if user already selected 4 seats
  if (totalSeatSelected === 4) {
    alert("You can not book more than 4 seats");
    return;
  }

  // adding clicked seat into the objects
  if (selectedSeatsObject[seatNumber]) return;
  selectedSeatsObject[seatNumber] = seatNumber;
  // updating total seats number and selected seats and totalBooking
  totalSeatSelected = Object.keys(selectedSeatsObject).length;
  // activating the next button
  activeNextButton();
  remainingSeatsDom.innerHTML = totalSeats - totalSeatSelected;
  totalBookingDom.innerHTML = totalSeatSelected;
  // coloring seats
  element.style.backgroundColor = "#1DD100";
  element.style.color = "white";
  //  hiding the no seat selected text
  noSeatDom.style.display = "none";
  // adding to the booking lists
  const divElement = document.createElement("div");
  divElement.className = bookingRowClass;
  divElement.innerHTML = `<h1>${seatNumber}</h1> <h2>Economy</h2> <h3>550</h3>`;
  bookingContainerDom.appendChild(divElement);
  //  updating total Price and grandTotal
  totalPriceDom.innerHTML = totalSeatSelected * pricePerSeat;
  grandTotalDom.innerHTML = totalSeatSelected * pricePerSeat;

  // enabling the coupon button
  if (totalSeatSelected === 4) {
    applyCouponButtonDom.disabled = false;
    couponInputDom.removeAttribute("readonly");
  }
}

// applying coupon
function applyCoupon() {
  const couponInputValue = couponInputDom.value;
  // checking if coupon is valid or not
  if (!discountCouponObject[couponInputValue]) {
    alert("Invalid Coupon");
    couponInputDom.value = "";
    return;
  }

  // applying discount
  const totalPrice = totalSeatSelected * pricePerSeat;
  const discountPrice = totalPrice * discountCouponObject[couponInputValue];
  const grandTotal = totalPrice - discountPrice;

  // now updating
  const discountElement = document.createElement("div");
  discountElement.className = "flex justify-between mt-4 font-bold mb-4";
  discountElement.innerHTML = `<h1>Total Discount</h1>
  <h2>BDT ${discountPrice} </h2>`;
  // appending into the discountContainer
  discountContainerDom.appendChild(discountElement);
  // updating the grand total
  grandTotalDom.innerHTML = grandTotal;
  couponContainerDom.style.display = "none";
}

phoneInputDom.addEventListener("keyup", function () {
  phone = phoneInputDom.value;
  // active the next button
  activeNextButton();
});

// this function will active the next button if user has selected at-least one seat and wrote down his/her phone
function activeNextButton() {
  if (totalSeatSelected > 0 && phone) {
    submitButtonDom.disabled = false;
  } else {
    submitButtonDom.disabled = true;
  }
}

// open the modal
submitButtonDom.addEventListener("click", function () {
  modalDom.style.display = "flex";
});

// closing the modal
continueButtonDom.addEventListener("click", function () {
  modalDom.style.display = "none";
  window.location.reload();
});
