const hybridTheorySongs = [
    { title: "Papercut", src: "albumes/HT/Linkin Park - Papercut.mp3", duration: "3:05" },
    { title: "One Step Closer", src: "albumes/HT/Linkin Park - One Step Closer.mp3", duration: "2:35" },
    { title: "With You", src: "audio/hybridtheory/withyou.mp3", duration: "3:23" },
    { title: "Points of Authority", src: "albumes/HT/Linkin Park - Points of Authority.mp3", duration: "3:20" },
    { title: "Crawling", src: "audio/hybridtheory/crawling.mp3", duration: "3:29" },
    { title: "Runaway", src: "audio/hybridtheory/runaway.mp3", duration: "3:04" },
    { title: "By Myself", src: "albumes/HT/Linkin Park - By Myself.mp3", duration: "3:10" },
    { title: "In the End", src: "albumes/HT/Linkin Park - In the End.mp3", duration: "3:36" },
    { title: "A Place for My Head", src: "audio/hybridtheory/aplaceformyhead.mp3", duration: "3:04" },
    { title: "Forgotten", src: "audio/hybridtheory/forgotten.mp3", duration: "3:14" },
    { title: "Cure for the Itch", src: "audio/hybridtheory/curefortheitch.mp3", duration: "2:37" },
    { title: "Pushing Me Away", src: "audio/hybridtheory/pushingmeaway.mp3", duration: "3:11" }
];

function renderSongs() {
    const list = document.getElementById('songList');
    list.innerHTML = hybridTheorySongs.map((song, idx) => `
        <div class="song-row" data-index="${idx}">
            <div>
                <span class="song-title">${song.title}</span><br>
                <small class="text-muted">Linkin Park</small>
                <span class="text-muted ms-3">${song.duration}</span>
            </div>
            <div class="song-actions">
                <i class="fas fa-play" onclick="playSong(${idx})" title="Reproducir"></i>
            </div>
        </div>
    `).join('');
}

function playSong(idx) {
    const song = hybridTheorySongs[idx];
    const footer = document.getElementById('footerPlayer');
    const audio = document.getElementById('footerAudio');
    document.getElementById('footerTitle').textContent = song.title;
    document.getElementById('footerArtist').textContent = "Linkin Park";
    document.getElementById('footerImg').src = "resources/HT.jpg";
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
        const idx = hybridTheorySongs.findIndex(s => s.title.toLowerCase() === songParam.toLowerCase());
        if (idx !== -1) {
            playSong(idx);
        }
    }
});
