const pianoKeys = document.querySelector(".piano-keys");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let mapedKeys = [];
let audios = {};

document.querySelectorAll(".piano-keys .key").forEach((key) => {
  const keyNote = key.dataset.key;
  mapedKeys.push(keyNote);
  audios[keyNote] = new Audio(`src/tunes/${keyNote}.wav`);
});

const playTune = (key) => {
  const audio = audios[key];
  audio.currentTime = 0;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.addEventListener("click", (e) => {
  if (e.target.classList.contains("key")) {
    playTune(e.target.dataset.key);
  }
});

document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

const handleVolume = (e) => {
  for (let key in audios) {
    audios[key].volume = e.target.value;
  }
};

const showHideKeys = () => {
  document.querySelectorAll(".piano-keys .key").forEach((key) => key.classList.toggle("hide"));
};

volumeSlider.addEventListener("input", handleVolume);
keysCheck.addEventListener("click", showHideKeys);

