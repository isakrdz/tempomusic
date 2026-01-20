
    // Canciones del álbum Trench
    const trenchSongs = [
        { title: "Jumpsuit", src: "", duration: "3:58" },
        { title: "Levitate", src: "albumes/Trench/twenty one pilots - Levitate.flac", duration: "2:25" },
        { title: "Morph", src: "audio/morph.mp3", duration: "4:18" },
        { title: "My Blood", src: "audio/myblood.mp3", duration: "3:49" },
        { title: "Chlorine", src: "audio/chlorine.mp3", duration: "5:24" },
        { title: "Smithereens", src: "audio/smithereens.mp3", duration: "2:57" },
        { title: "Neon Gravestones", src: "audio/neongravestones.mp3", duration: "4:00" },
        { title: "The Hype", src: "audio/thehype.mp3", duration: "4:25" },
        { title: "Nico And The Niners", src: "audio/nicoandtheniners.mp3", duration: "3:45" },
        { title: "Cut My Lip", src: "audio/cutmylip.mp3", duration: "4:42" },
        { title: "Bandito", src: "audio/bandito.mp3", duration: "5:30" },
        { title: "Pet Cheetah", src: "audio/petcheetah.mp3", duration: "3:18" },
        { title: "Legend", src: "audio/legend.mp3", duration: "2:52" },
        { title: "Leave The City", src: "audio/leavethecity.mp3", duration: "4:40" }
    ];

    function renderSongs() {
        const list = document.getElementById('songList');
        list.innerHTML = trenchSongs.map((song, idx) => `
            <div class="song-row" data-index="${idx}">
                <div>
                    <span class="song-title">${song.title}</span><br>
                    <small class="text-muted">twenty one pilots</small>
                    <span class="text-muted ms-3">${song.duration}</span>
                </div>
                <div class="song-actions">
                    <i class="fas fa-play" onclick="playSong(${idx})" title="Reproducir"></i>
                </div>
            </div>
        `).join('');
    }

    function playSong(idx) {
        const song = trenchSongs[idx];
        const footer = document.getElementById('footerPlayer');
        const audio = document.getElementById('footerAudio');
        document.getElementById('footerTitle').textContent = song.title;
        document.getElementById('footerArtist').textContent = "twenty one pilots";
        document.getElementById('footerImg').src = "resources/trench.jpg";
        audio.src = song.src;
        audio.play();
        footer.style.display = "flex";
    }

    document.getElementById('footerPause').onclick = function() {
        document.getElementById('footerAudio').pause();
    };

    renderSongs();

    function getSongParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('song');
}

document.addEventListener('DOMContentLoaded', function() {
    const songParam = getSongParam();
    if (songParam) {
        // Busca el índice de la canción
        const idx = trenchSongs.findIndex(s => s.title.toLowerCase() === songParam.toLowerCase());
        if (idx !== -1) {
            playSong(idx);
        }
    }
});
