const gymSongs = [
    { title: "Chop Suey!", src: "audio/gym/chopsuey.mp3", duration: "3:30", artist: "System Of A Down" },
    { title: "Bring Me To Life", src: "audio/gym/bringmetolife.mp3", duration: "3:56", artist: "Evanescence" },
    { title: "Numb", src: "albumes/meteora/Linkin Park - Numb.mp3", duration: "3:07", artist: "Linkin Park" },
    { title: "Killing In The Name", src: "audio/gym/killinginthename.mp3", duration: "5:14", artist: "Rage Against The Machine" },
    { title: "Freak on a Leash", src: "audio/gym/freakonaleash.mp3", duration: "4:15", artist: "Korn" },
    { title: "In The End", src: "albumes/HT/Linkin Park - In the End.mp3", duration: "3:36", artist: "Linkin Park" },
    { title: "Duality", src: "audio/gym/duality.mp3", duration: "3:42", artist: "Slipknot" },
    { title: "Papercut", src: "albumes/HT/Linkin Park - Papercut.mp3", duration: "3:05", artist: "Linkin Park" },
    { title: "One Step Closer", src: "albumes/HT/Linkin Park - One Step Closer.mp3", duration: "2:36", artist: "Linkin Park" },
    { title: "Bulls On Parade", src: "audio/gym/bullsonparade.mp3", duration: "3:52", artist: "Rage Against The Machine" },
    { title: "Faint", src: "audio/gym/faint.mp3", duration: "2:42", artist: "Linkin Park" },
    { title: "Got The Life", src: "audio/gym/gotthelife.mp3", duration: "3:48", artist: "Korn" }
];

function renderSongs() {
    const list = document.getElementById('songList');
    list.innerHTML = gymSongs.map((song, idx) => `
        <div class="song-row" data-index="${idx}">
            <div>
                <span class="song-title">${song.title}</span><br>
                <small class="text-muted">${song.artist}</small>
                <span class="text-muted ms-3">${song.duration}</span>
            </div>
            <div class="song-actions">
                <i class="fas fa-play" onclick="playSong(${idx})" title="Reproducir"></i>
            </div>
        </div>
    `).join('');
}

function playSong(idx) {
    const song = gymSongs[idx];
    const footer = document.getElementById('footerPlayer');
    const audio = document.getElementById('footerAudio');
    document.getElementById('footerTitle').textContent = song.title;
    document.getElementById('footerArtist').textContent = song.artist;
    document.getElementById('footerImg').src = "resources/GYM.jpg"; // portada playlist
    audio.src = song.src;
    audio.play();
    footer.style.display = "flex";
}

document.getElementById('footerPause').onclick = function () {
    document.getElementById('footerAudio').pause();
};

// Parámetro para reproducción automática desde URL
function getSongParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('song');
}

document.addEventListener('DOMContentLoaded', function () {
    renderSongs();
    const songParam = getSongParam();
    if (songParam) {
        const idx = gymSongs.findIndex(s => s.title.toLowerCase() === songParam.toLowerCase());
        if (idx !== -1) {
            playSong(idx);
        }
    }
});
