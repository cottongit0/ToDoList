"use strict";

let DARK_MODE = localStorage.getItem("DARK-MODE");
const modeBtn = document.querySelector(".dark-toggle");

// 다크 모드 설정
const enableDarkMode = () => {
  document.body.classList.add("darkMode");
  localStorage.setItem("DARK-MODE", "enabled");
  modeBtn.innerHTML = "dark_mode";
};
const disableDarkMode = () => {
  document.body.classList.remove("darkMode");
  localStorage.setItem("DARK-MODE", null);
  modeBtn.innerHTML = "brightness_5";
};

if (DARK_MODE === "enabled") {
  enableDarkMode();
} else {
  modeBtn.innerHTML = "brightness_5";
}

modeBtn.addEventListener("click", () => {
  DARK_MODE = localStorage.getItem("DARK-MODE");
  if (DARK_MODE !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
