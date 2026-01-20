const mutemathSongs = [
    { title: "Collapse", src: "albumes/mutemath/Collapse.mp3", duration: "1:13" },
    { title: "Typical", src: "albumes/mutemath/Typical.mp3", duration: "4:12" },
    { title: "After We Have Left Our Homes", src: "albumes/mutemath/AfterWeHaveLeftOurHomes.mp3", duration: "1:14" },
    { title: "Chaos", src: "albumes/MM/Mutemath - Chaos.mp3", duration: "4:54" },
    { title: "Noticed", src: "albumes/mutemath/Noticed.mp3", duration: "4:29" },
    { title: "Plan B", src: "albumes/mutemath/PlanB.mp3", duration: "4:46" },
    { title: "Stare at the Sun", src: "albumes/mutemath/StareAtTheSun.mp3", duration: "4:33" },
    { title: "Obsolete", src: "albumes/mutemath/Obsolete.mp3", duration: "4:30" },
    { title: "Break the Same", src: "albumes/mutemath/BreakTheSame.mp3", duration: "6:00" },
    { title: "You Are Mine", src: "albumes/mutemath/YouAreMine.mp3", duration: "4:43" },
    { title: "Control", src: "albumes/mutemath/Control.mp3", duration: "4:39" },
    { title: "Picture", src: "albumes/mutemath/Picture.mp3", duration: "5:26" },
    { title: "Stall Out", src: "albumes/mutemath/StallOut.mp3", duration: "7:10" },
    { title: "Reset", src: "albumes/mutemath/Reset.mp3", duration: "5:25" }
];

function renderSongs() {
    const list = document.getElementById('songList');
    list.innerHTML = mutemathSongs.map((song, idx) => `
        <div class="song-row" data-index="${idx}">
            <div>
                <span class="song-title">${song.title}</span><br>
                    <small class="text-muted">Mutemath</small><br>
                <span class="text-muted ms-3">${song.duration}</span>
            </div>
            <div class="song-actions">
                <i class="fas fa-play" onclick="playSong(${idx})" title="Reproducir"></i>
            </div>
        </div>
    `).join('');
}

function playSong(idx) {
    const song = mutemathSongs[idx];
    const footer = document.getElementById('footerPlayer');
    const audio = document.getElementById('footerAudio');
    document.getElementById('footerTitle').textContent = song.title;
    document.getElementById('footerArtist').textContent = "Mutemath";
    document.getElementById('footerImg').src = "resources/mutemath.jpeg";
    audio.src = song.src;
    audio.play();
    footer.style.display = "flex";
}

document.getElementById('footerPause').onclick = function () {
    document.getElementById('footerAudio').pause();
};

document.addEventListener('DOMContentLoaded', () => {
    renderSongs();
});
