"use strict";

let btntoggler = document.querySelector(".btn-toggler"),
  menuList = document.querySelector(".menu-items-list"),
  mainOverlay = document.querySelector(".main-wrapper"),
  btnBookmark = document.querySelector(".btn-bookmark"),
  btnBackProject = document.querySelector(".btn-back"),
  wrapper = document.querySelector(".wrapper"),
  pledge = document.querySelectorAll(".pledge"),
  success = document.querySelector(".success"),
  btnSuccess = document.querySelector(".btn-success");

btntoggler.addEventListener("click", btnToggler_handleClick);
btnBookmark.addEventListener("click", btnBookmark_handleClick);
btnBackProject.addEventListener("click", btnBackProject_handleClick);
btnSuccess.addEventListener("click", function () {
  wrapper.classList.remove("overlay");
  success.style.display = "none";
  document.querySelector(".selections-option.modal").remove();
});

// Open and close Menu
function btnToggler_handleClick() {
  this.classList.toggle("opened");
  mainOverlay.classList.toggle("overlay");
  setTimeout(() => {
    menuList.classList.toggle("opened");
  }, 300);
}

// Bookmark and Unbookmark the page
function btnBookmark_handleClick() {
  this.classList.toggle("bookmarked");
  this.classList.contains("bookmarked")
    ? (this.firstElementChild.textContent = "Bookmarked")
    : (this.firstElementChild.textContent = "Bookmark");
}

// Back This project
function btnBackProject_handleClick() {
  // Take a clone of the main design sections and create the model sections
  let newSelection = document.createElement("section");
  newSelection.innerHTML = document.querySelector(
    ".selections-option"
  ).innerHTML;
  newSelection.className = "selections-option modal";
  wrapper.appendChild(newSelection);
  wrapper.classList.add("overlay");

  // Define the cloned and the created controls and their events after the sections creations
  let btnCloseModal = document.querySelector(".btn-close-modal"),
    optionTitle = document.querySelectorAll(".option-title h4"),
    chkSelection = document.querySelectorAll(".checkbox input"),
    btncontinue = document.querySelectorAll(".continue");

  btnCloseModal.addEventListener("click", function () {
    wrapper.classList.remove("overlay");
    document.querySelector(".selections-option.modal").remove();
  });

  optionTitle.forEach((ele) => {
    ele.addEventListener("click", chkSelection_handleClick);
  });

  chkSelection.forEach((ele) => {
    ele.addEventListener("click", chkSelection_handleClick);
  });

  btncontinue.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      newSelection.style.display = "none";
      success.style.display = "block";
    });
  });
}

// Handle radio buttons check and the title click to select option
function chkSelection_handleClick(e) {
  let options = this.parentNode.parentNode.parentNode,
    othrsCkeckBoxs = document.querySelectorAll(".option"),
    lastSelectedPladge = document.querySelector(".pledge.show");

  // remove the last shown pledge if it was exist
  if (lastSelectedPladge != null) {
    lastSelectedPladge.classList.remove("show");
  }

  // remove any selected option
  othrsCkeckBoxs.forEach((e) => {
    e.classList.remove("selected");
    e.children[0].children[0].children[0].checked = false;
  });

  // check event happend by radio button OR by the title header
  let theCheckBox;
  e.target.nodeName.toLowerCase() === "input"
    ? (theCheckBox = this)
    : (theCheckBox = this.parentNode.previousElementSibling.children[0]);
  theCheckBox.checked = true;

  options.classList.toggle("selected");
  Array.from(options.children).forEach((ele) => {
    if (ele.classList.contains("pledge")) {
      ele.classList.add("show");
    }
  });
}
