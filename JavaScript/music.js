"use strict";

// 음악 트랙
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

// 재생, 정지 버튼 설정
const togglePlay = () => {
  const method = audio.paused ? "play" : "pause";
  playing = audio.paused ? true : false;
  audio[method]();
};

// 스타일링
const toggleMusicPanel = () => {
  if (!trackSwitch) {
    // 커버 이미지 스케일
    coverImg.classList.toggle("scale");

    // 음악 재생 컨테이너 보여주기 여부
    musicPanel.classList.toggle("playing");

    // 재생버튼 변경
    playBtn.classList.toggle("playing");
  }
};

// 커버 이미지 회전 애니메이션
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

// 프로그레스 바
const handleProgress = () => {
  // 프로그래스 바 업데이트
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.flexBasis = `${percent}%`;

  // 음악 스킵 시
  if (percent === 100) {
    trackSwitch = true;
    handleNextButton();
  }
};

// 음악 이전 버튼
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

// 음악 다음 버튼
const handleNextButton = () => {
  const currentTrackId = parseInt(audioSource.dataset.trackid);

  const nextTrackId =
    currentTrackId === 10 ? "1" : (currentTrackId + 1).toString();

  const nextTrack = tracks.find((o) => o.id === nextTrackId);

  changeTrack(nextTrack);
};

// 음악 변경
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

// 음악 시간
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
