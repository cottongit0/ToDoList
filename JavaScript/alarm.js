const sectionAlarm = document.getElementById("alarm");
const ampmSelect = sectionAlarm.querySelector("#ampm-select");

let sound = new Audio("/Sounds/alarmSound.mp3");
sound.loop = "true";

let hours = sectionAlarm.querySelector(".alarm-hours");
const hrIncreas = sectionAlarm.querySelector(".hours-increase");
const hrDecreas = sectionAlarm.querySelector(".hours-decrease");

let minutes = sectionAlarm.querySelector(".alarm-minutes");
const minIncreas = sectionAlarm.querySelector(".minutes-increase");
const minDecreas = sectionAlarm.querySelector(".minutes-decrease");

document
  .querySelector(".material-icons.alarm")
  .addEventListener("click", () => {
    sectionAlarm.style.display = "flex";
  });

sectionAlarm.querySelector(".fas.fa-times").addEventListener("click", () => {
  sectionAlarm.style.display = "none";
});

const current = new Date();
hrCount = current.getHours();
minCount = current.getMinutes();

let optionAmpm = ["오전", "오후"];

if (hrCount > 12) {
  hrCount -= 12;
  hours.value = hrCount;
  sectionAlarm.querySelector(".optionPM").selected = "true";
} else {
  sectionAlarm.querySelector(".optionAM").selected = "true";
  hours.value = hrCount;
}

// Hours setting
hrIncreas.addEventListener("click", () => {
  if (hrCount < 12) {
    hrCount++;
    hours.value = hrCount;
  }
});

hrDecreas.addEventListener("click", () => {
  if (hrCount > 0) {
    hrCount--;
    hours.value = hrCount;
  }
});

// Minutes setting
minutes.value = minCount;

minIncreas.addEventListener("click", () => {
  if (minCount < 59) {
    minCount++;
    minutes.value = minCount;
  }
});

minDecreas.addEventListener("click", () => {
  if (minCount > 0) {
    minCount--;
    minutes.value = minCount;
  }
});
