const tnaSongs = [
    { title: "The Adults Are Talking", src: "audio/tna/theadultsaretalking.mp3", duration: "5:08" },
    { title: "Selfless", src: "audio/tna/baddecisions.mp3", duration: "4:11" },
    { title: "Brooklyn Bridge To Chorus", src: "audio/tna/brooklynbridgetochorus.mp3", duration: "3:55" },
    { title: "Bad Decisions", src: "albumes/TNA/The Strokes - Bad Decisions.mp3", duration: "4:11" },
    { title: "At The Door", src: "audio/tna/atthedoor.mp3", duration: "5:03" },
    { title: "Why Are Sundays So Depressing", src: "audio/tna/whyare.sundays.mp3", duration: "3:35" },
    { title: "Eternal Summer", src: "audio/tna/eternalsummer.mp3", duration: "3:42" },
    { title: "Not The Same Anymore", src: "audio/tna/notthesameanymore.mp3", duration: "4:05" },
    { title: "At The Door", src: "audio/tna/atthedoorreprise.mp3", duration: "1:55" },
    { title: "Ode To The Mets", src: "audio/tna/odetothemets.mp3", duration: "5:56" }
];

function renderSongs() {
    const list = document.getElementById('songList');
    list.innerHTML = tnaSongs.map((song, idx) => `
        <div class="song-row" data-index="${idx}">
            <div>
                <span class="song-title">${song.title}</span><br>
                <small class="text-muted">The Strokes</small>
                <span class="text-muted ms-3">${song.duration}</span>
            </div>
            <div class="song-actions">
                <i class="fas fa-play" onclick="playSong(${idx})" title="Reproducir"></i>
            </div>
        </div>
    `).join('');
}

function playSong(idx) {
    const song = tnaSongs[idx];
    const footer = document.getElementById('footerPlayer');
    const audio = document.getElementById('footerAudio');
    document.getElementById('footerTitle').textContent = song.title;
    document.getElementById('footerArtist').textContent = "The Strokes";
    document.getElementById('footerImg').src = "resources/tna.jpg";
    audio.src = song.src;
    audio.play();
    footer.style.display = "flex";
}

document.getElementById('footerPause').onclick = function () {
    document.getElementById('footerAudio').pause();
};

// Reproducción automática desde parámetro en URL
function getSongParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('song');
}

document.addEventListener('DOMContentLoaded', function () {
    renderSongs();
    const songParam = getSongParam();
    if (songParam) {
        const idx = tnaSongs.findIndex(s => s.title.toLowerCase() === songParam.toLowerCase());
        if (idx !== -1) {
            playSong(idx);
        }
    }
});
