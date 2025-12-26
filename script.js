// 🎵 Track List
const tracks = [
    { name: "Enthinee Mizhi", src: "audio/enthinee_mizhi.mp3" },
    { name: "Devakanyaka", src: "audio/devakanyaka.mp3" },
    { name: "Etho Saayaana", src: "audio/etho_saayaana.mp3" },
    { name: "Kaana Chembaka Poo", src: "audio/kaana_chembaka_poo.mp3" },
    { name: "Kanmanipoove", src: "audio/kanmanipoove.mp3" }
];

// 🎧 State
let currentTrackIndex = 0;
let isPlaying = false;

// 🎯 DOM Elements
const trackNameEl = document.getElementById("track-name");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressSlider = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");

// 🔊 Audio Object
const audio = new Audio();
audio.src = tracks[currentTrackIndex].src;
audio.volume = 0.5;

// 🔄 Load Track
function loadTrack() {
    audio.src = tracks[currentTrackIndex].src;
    trackNameEl.textContent = tracks[currentTrackIndex].name;
    progressSlider.value = 0;
}
loadTrack();

// ▶️ Play / ⏸ Pause
playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
});

audio.addEventListener("play", () => {
    isPlaying = true;
    playPauseBtn.textContent = "⏸️";
});

audio.addEventListener("pause", () => {
    isPlaying = false;
    playPauseBtn.textContent = "▶️";
});

// ⏭ Next Track
nextBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
    audio.play();
});

// ⏮ Previous Track
prevBtn.addEventListener("click", () => {
    currentTrackIndex =
        (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack();
    audio.play();
});

// 📊 Update Progress Bar
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        const progressPercent =
            (audio.currentTime / audio.duration) * 100;
        progressSlider.value = progressPercent;
    }
});

// 🎯 Seek Song
progressSlider.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progressSlider.value / 100) * audio.duration;
    }
});

// 🔊 Volume Control
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

// 🔁 Auto Play Next Track
audio.addEventListener("ended", () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack();
    audio.play();
});
