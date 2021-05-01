"use strict";
const userSection = document.getElementById("user");
const userForm = userSection.querySelector(".form-user-name");
const userInput = userSection.querySelector(".form-user-name input");
const greeting = document.querySelector(".greeting");

const USER_NAME = "CURRENT_USER";

// 유저 팝업 열고 닫기
document.querySelector(".user").addEventListener("click", () => {
  userSection.style.display = "flex";
});
userSection.querySelector(".close").addEventListener("click", () => {
  userSection.style.display = "none";
});

// 유저 이름 입력
userForm.addEventListener("submit", () => {
  const currentValue = userInput.value;
  localStorage.setItem(USER_NAME, currentValue);
  greetingUser(currentValue);
});

// 인사 출력
function greetingUser() {
  const currentUser = localStorage.getItem(USER_NAME);
  if (currentUser === null) {
    greeting.innerHTML = "유저 이름이 입력되지 않았습니다.";
  } else {
    greeting.innerHTML = `안녕하세요. ${currentUser}님`;
    renewUserName();
  }
}

function renewUserName() {
  const infoDescription = document.querySelector("#user .container h2");
  infoDescription.innerHTML = "유저이름을 바꾸시겠습니까?";
}

(function init() {
  greetingUser();
})();
