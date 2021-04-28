"use strict";

// CLCOK - DATE
function onLoadDate() {
  const date = document.querySelector(".date");
  let year = date.querySelector(".year");
  let month = date.querySelector(".month");
  let day = date.querySelector(".day");
  let week = date.querySelector(".week");

  const getDate = new Date();
  const weekends = ["일", "월", "화", "수", "목", "금", "토"];
  let y = getDate.getFullYear();
  let m = getDate.getMonth();
  let d = getDate.getDate();
  let w = getDate.getDay();

  year.innerHTML = y + "년";
  month.innerHTML = m + 1 < 10 ? `0${m + 1}월` : m + "월";
  day.innerHTML = d < 10 ? `0${d}일` : d + "일";
  week.innerHTML = weekends[w];
}

// CLODK - TIME
function onLoadTime() {
  const time = document.querySelector(".time");
  let hour = time.querySelector(".hour");
  let minutes = time.querySelector(".minutes");
  let seconds = time.querySelector(".seconds");

  const getClock = new Date();
  let h = getClock.getHours();
  let m = getClock.getMinutes();
  let s = getClock.getSeconds();

  let ampm = document.querySelector(".AMPM");
  if (AMPM_MODE === "enabled") {
    if (h >= 12) {
      h -= 12;
      ampm.innerHTML = "PM";
    } else {
      ampm.innerHTML = "AM";
    }
  }

  hour.innerHTML = h < 10 ? `0${h}` : h;
  minutes.innerHTML = m < 10 ? `0${m}` : m;
  seconds.innerHTML = s < 10 ? `0${s}` : s;
}

// AMPM MODE
let AMPM_MODE = localStorage.getItem("AMPM-MODE");
const ampmModeBtn = document.querySelector("#ampmBtn");

const enableAmPm = () => {
  localStorage.setItem("AMPM-MODE", "enabled");
};
const disableAmPm = () => {
  localStorage.setItem("AMPM-MODE", null);
};

const ampmContainer = document.querySelector(".ampm-container");
if (AMPM_MODE === "enabled") {
  ampmContainer.classList.add("hide");
} else {
  ampmContainer.classList.remove("hide");
}

ampmModeBtn.addEventListener("click", () => {
  AMPM_MODE = localStorage.getItem("AMPM-MODE");
  if (AMPM_MODE !== "enabled") {
    enableAmPm();
  } else {
    disableAmPm();
  }
  location.reload();
});

function init() {
  setInterval(onLoadDate, 1000);
  setInterval(onLoadTime, 1000);
}
init();
