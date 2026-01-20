const breachSongs = [
    { title: "City Walls", src: "albumes/breach/01_City_Walls.mp3", duration: "5:22" },
    { title: "RAWFEAR", src: "albumes/breach/02_RAWFEAR.mp3", duration: "3:22" },
    { title: "Drum Show", src: "albumes/breach/03_Drum_Show.mp3", duration: "3:23" },
    { title: "Garbage", src: "albumes/breach/04_Garbage.mp3", duration: "3:16" },
    { title: "The Contract", src: "albumes/breach/05_The_Contract.mp3", duration: "3:48" },
    { title: "Downstairs", src: "albumes/breach/06_Downstairs.mp3", duration: "5:26" },
    { title: "Robot Voices", src: "albumes/breach/07_Robot_Voices.mp3", duration: "3:57" },
    { title: "Center Mass", src: "albumes/breach/08_Center_Mass.mp3", duration: "3:48" },
    { title: "Cottonwood", src: "albumes/breach/09_Cottonwood.mp3", duration: "3:08" },
    { title: "One Way", src: "albumes/breach/10_One_Way.mp3", duration: "2:43" },
    { title: "Days Lie Dormant", src: "albumes/breach/11_Days_Lie_Dormant.mp3", duration: "3:26" },
    { title: "Tally", src: "albumes/breach/12_Tally.mp3", duration: "3:32" },
    { title: "Intentions", src: "albumes/breach/13_Intentions.mp3", duration: "2:15" },
    { title: "Drag Path (BT)", src: "albumes/breach/14_Drag_Path.mp3", duration: "5:04" }  // bonus track del Digital Remains 
];

function renderSongs() {
    const list = document.getElementById('songList');
    list.innerHTML = breachSongs.map((song, idx) => `
        <div class="song-row" data-index="${idx}">
            <div>
                <span class="song-title">${song.title}</span>
                <span class="text-muted ms-3">${song.duration}</span>
            </div>
            <div class="song-actions">
                <i class="fas fa-play" onclick="playSong(${idx})" title="Reproducir"></i>
            </div>
        </div>
    `).join('');
}

function playSong(idx) {
    const song = breachSongs[idx];
    const footer = document.getElementById('footerPlayer');
    const audio = document.getElementById('footerAudio');
    document.getElementById('footerTitle').textContent = song.title;
    document.getElementById('footerArtist').textContent = "twenty one pilots";
    document.getElementById('footerImg').src = "resources/breach.jpeg";  // cambiar la imagen si quieres
    audio.src = song.src;
    audio.play();
    footer.style.display = "flex";
}

document.getElementById('footerPause').onclick = function () {
    document.getElementById('footerAudio').pause();
};

function getSongParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('song');
}

document.addEventListener('DOMContentLoaded', function () {
    renderSongs();
    const songParam = getSongParam();
    if (songParam) {
        const idx = breachSongs.findIndex(s => s.title.toLowerCase() === songParam.toLowerCase());
        if (idx !== -1) {
            playSong(idx);
        }
    }
});
