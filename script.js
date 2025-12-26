const tracks = [
  { name: "Enthinee Mizhi", src: "audio/enthinee_mizhi.mp3" },
  { name: "Devakanyaka", src: "audio/devakanyaka.mp3" },
  { name: "Etho Saayaana", src: "audio/etho_saayaana.mp3" },
  { name: "Kaana Chembaka Poo", src: "audio/kaana_chembaka_poo.mp3" },
  { name: "Kanmanipoove", src: "audio/kanmanipoove.mp3" }
];

let currentTrack = 0;
let isPlaying = false;

const audio = new Audio();
audio.volume = 0.5;

// DOM
const trackName = document.getElementById("track-name");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// Load Track
function loadTrack(index) {
  audio.src = tracks[index].src;
  trackName.textContent = tracks[index].name;
  progress.value = 0;
}

loadTrack(currentTrack);

// Play / Pause
playPauseBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  isPlaying = true;
  playPauseBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playPauseBtn.textContent = "▶️";
});

// Next
nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
});

// Previous
prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
});

// Progress
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

// Seek
progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Auto Next
audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
});

// Debug (important)
audio.addEventListener("error", () => {
  console.error("❌ Audio not found:", audio.src);
});
