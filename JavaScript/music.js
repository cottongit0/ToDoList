"use strict";

// μμ νΈλ
const tracks = [
  {
    id: "1",
    title: "Ukulele",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
    cover: "https://www.bensound.com/bensound-img/ukulele.jpg",
  },
  {
    id: "2",
    title: "Summer",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-summer.mp3",
    cover: "https://www.bensound.com/bensound-img/summer.jpg",
  },
  {
    id: "3",
    title: "Happy Rock",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-happyrock.mp3",
    cover: "https://www.bensound.com/bensound-img/happyrock.jpg",
  },
  {
    id: "4",
    title: "Jazzy Frenchy",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
    cover: "https://www.bensound.com/bensound-img/jazzyfrenchy.jpg",
  },
  {
    id: "5",
    title: "Acoustic Breeze",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
    cover: "https://www.bensound.com/bensound-img/acousticbreeze.jpg",
  },
  {
    id: "6",
    title: "Punky",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-punky.mp3",
    cover: "https://www.bensound.com/bensound-img/punky.jpg",
  },
  {
    id: "7",
    title: "Badass",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-badass.mp3",
    cover: "https://www.bensound.com/bensound-img/badass.jpg",
  },
  {
    id: "8",
    title: "Brazil Samba",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-brazilsamba.mp3",
    cover: "https://www.bensound.com/bensound-img/brazilsamba.jpg",
  },
  {
    id: "9",
    title: "Creepy",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-creepy.mp3",
    cover: "https://www.bensound.com/bensound-img/creepy.jpg",
  },
  {
    id: "10",
    title: "High Octane",
    artist: "Bensound",
    src: "https://www.bensound.com/bensound-music/bensound-highoctane.mp3",
    cover: "https://www.bensound.com/bensound-img/highoctane.jpg",
  },
];

const player = document.querySelector("#player");
const audio = player.querySelector(".player__audio");
const audioSource = audio.querySelector("source");
const musicPanel = player.querySelector(".music-container");
const songTitle = player.querySelector(".music-info .title");
const songArtist = player.querySelector(".music-info .artist");
const prevBtn = player.querySelector(".prev");
const playBtn = player.querySelector(".play");
const nextBtn = player.querySelector(".next");
const cover = player.querySelector(".cover");
const coverImg = player.querySelector(".cover__img");
const progressBar = player.querySelector(".progressBar");
const progress = player.querySelector(".progress");

let playing = false;
let trackSwitch = false;

// μ¬μ, μ μ§ λ²νΌ μ€μ 
const togglePlay = () => {
  const method = audio.paused ? "play" : "pause";
  playing = audio.paused ? true : false;
  audio[method]();
};

// μ€νμΌλ§
const toggleMusicPanel = () => {
  if (!trackSwitch) {
    // μ»€λ² μ΄λ―Έμ§ μ€μΌμΌ
    coverImg.classList.toggle("scale");

    // μμ μ¬μ μ»¨νμ΄λ λ³΄μ¬μ£ΌκΈ° μ¬λΆ
    musicPanel.classList.toggle("playing");

    // μ¬μλ²νΌ λ³κ²½
    playBtn.classList.toggle("playing");
  }
};

// μ»€λ² μ΄λ―Έμ§ νμ  μ λλ©μ΄μ
const startSpin = () => {
  cover.classList.add("spin");
};

const stopSpin = () => {
  const spin = document.querySelector(".spin");
  spin.addEventListener(
    "animationiteration",
    () => {
      if (!playing) {
        spin.style.animation = "none";
        cover.classList.remove("spin");
        spin.style.animation = "";
      }
    },
    {
      once: true,
    }
  );
};

// νλ‘κ·Έλ μ€ λ°
const handleProgress = () => {
  // νλ‘κ·Έλμ€ λ° μλ°μ΄νΈ
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.flexBasis = `${percent}%`;

  // μμ μ€ν΅ μ
  if (percent === 100) {
    trackSwitch = true;
    handleNextButton();
  }
};

// μμ μ΄μ  λ²νΌ
const handlePrevButton = () => {
  if (audio.currentTime <= 3) {
    const currentTrackId = parseInt(audioSource.dataset.trackid);

    const previousTrackId =
      currentTrackId === 1 ? "10" : (currentTrackId - 1).toString();

    const previousTrack = tracks.find((o) => o.id === previousTrackId);
    changeTrack(previousTrack);
  } else {
    audio.currentTime = 0;
  }
};

// μμ λ€μ λ²νΌ
const handleNextButton = () => {
  const currentTrackId = parseInt(audioSource.dataset.trackid);

  const nextTrackId =
    currentTrackId === 10 ? "1" : (currentTrackId + 1).toString();

  const nextTrack = tracks.find((o) => o.id === nextTrackId);

  changeTrack(nextTrack);
};

// μμ λ³κ²½
const changeTrack = (track) => {
  if (playing) trackSwitch = true;
  audioSource.setAttribute("src", track.src);
  audioSource.dataset.trackid = track.id;
  songTitle.innerHTML = track.title;
  songArtist.innerHTML = track.artist;
  coverImg.style.backgroundImage = `url(${track.cover})`;
  audio.load();

  if (playing) {
    audio.addEventListener(
      "canplay",
      () => {
        audio.play();
      },
      {
        once: true,
      }
    );
    audio.addEventListener(
      "play",
      () => {
        trackSwitch = false;
      },
      {
        once: true,
      }
    );
  }
};

function scrub(e) {
  const scrubTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}

audio.addEventListener("play", startSpin);
audio.addEventListener("play", toggleMusicPanel);
audio.addEventListener("pause", stopSpin);
audio.addEventListener("pause", toggleMusicPanel);
audio.addEventListener("timeupdate", handleProgress);

prevBtn.addEventListener("click", handlePrevButton);
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", handleNextButton);

let mousedown = false;
progressBar.addEventListener("click", scrub);
progressBar.addEventListener("mousemove", (e) => mousedown && scrub(e));
progressBar.addEventListener("mousedown", () => (mousedown = true));
progressBar.addEventListener("mouseup", () => (mousedown = false));

// μμ μκ°
const current = document.querySelector(".current-time");
const duration = document.querySelector(".duration-time");

audio.addEventListener("timeupdate", () => {
  let curMin = Math.floor(audio.currentTime / 60);
  let curSec = Math.floor(audio.currentTime % 60);
  let durMin = Math.floor(audio.duration / 60);
  let durSec = Math.floor(audio.duration % 60);

  current.innerText = `${curMin < 10 ? "0" + curMin : curMin}:${
    curSec < 10 ? "0" + curSec : curSec
  }`;

  duration.innerText = `${durMin < 10 ? "0" + durMin : durMin}:${
    durSec < 10 ? "0" + durSec : durSec
  }`;
});
