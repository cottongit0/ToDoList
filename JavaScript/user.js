"use strict";
const userSection = document.getElementById("user");
const userForm = userSection.querySelector(".form-user-name");
const userInput = userSection.querySelector(".form-user-name input");
const greeting = document.querySelector(".greeting");

const USER_NAME = "CURRENT_USER";

userForm.addEventListener("submit", () => {
  const currentValue = userInput.value;
  localStorage.setItem(USER_NAME, currentValue);
});

function greetingUser() {
  const currentUser = localStorage.getItem(USER_NAME);
  if (USER_NAME === null) {
    greeting.innerHTML = "유저 이름이 입력되지 않았습니다.";
  } else {
    greeting.innerHTML = `안녕하세요. ${currentUser}님`;
  }
}

function renewUser() {
  const renewUser = document.querySelector();
}
