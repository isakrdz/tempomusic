const clancySongs = [
            { title: "Overcompensate", src: "albumes/Clancy/01. Overcompensate.wav", duration: "3:56" },
            { title: "Next Semester", src: "albumes/Clancy/02. Next Semester.wav", duration: "3:54" },
            { title: "Backslide", src: "albumes/Clancy/03. Backslide.wav", duration: "3:00" },
            { title: "Midwest Indigo", src: "albumes/Clancy/04. Midwest Indigo.wav", duration: "3:16" },
            { title: "Routines In The Night", src: "albumes/Clancy/05. Routines In The Night.wav", duration: "3:22" },
            { title: "Vignette", src: "albumes/Clancy/06. Vignette.wav", duration: "3:22" },
            { title: "The Craving (Jenna's Version)", src: "albumes/Clancy/07. The Craving (Jenna's version).wav", duration: "2:54" },
            { title: "Lavish", src: "albumes/Clancy/08. Lavish.wav", duration: "2:38" },
            { title: "Navigating", src: "albumes/Clancy/09. Navigating.wav", duration: "3:43" },
            { title: "Snap Back", src: "albumes/Clancy/10. Snap Back.wav", duration: "3:30" },
            { title: "Oldies Station", src: "albumes/Clancy/11. Oldies Station.wav", duration: "3:48" },
            { title: "At The Risk Of Feeling Dumb", src: "albumes/Clancy/12. At The Risk Of Feeling Dumb.wav", duration: "3:23" },
            { title: "Paladin Strait", src: "albumes/Clancy/13. Paladin Strait.wav", duration: "6:28" }
        ];

        function renderSongs() {
            const list = document.getElementById('songList');
            list.innerHTML = clancySongs.map((song, idx) => `
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
            const song = clancySongs[idx];
            const footer = document.getElementById('footerPlayer');
            const audio = document.getElementById('footerAudio');
            document.getElementById('footerTitle').textContent = song.title;
            document.getElementById('footerArtist').textContent = "twenty one pilots";
            document.getElementById('footerImg').src = "resources/clancy.jpg";
            audio.src = song.src;
            audio.play();
            footer.style.display = "flex";
        }

        document.getElementById('footerPause').onclick = function () {
            document.getElementById('footerAudio').pause();
        };

        // Parámetro para reproducción automática
        function getSongParam() {
            const params = new URLSearchParams(window.location.search);
            return params.get('song');
        }

        document.addEventListener('DOMContentLoaded', function () {
            renderSongs();
            const songParam = getSongParam();
            if (songParam) {
                const idx = clancySongs.findIndex(s => s.title.toLowerCase() === songParam.toLowerCase());
                if (idx !== -1) {
                    playSong(idx);
                }
            }
        });