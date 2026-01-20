const blurryfaceSongs = [
            { title: "Heavydirtysoul", src: "audio/blurryface/heavydirtysoul.mp3", duration: "3:54" },
            { title: "Stressed Out", src: "audio/blurryface/stressedout.mp3", duration: "3:22" },
            { title: "Ride", src: "audio/blurryface/ride.mp3", duration: "3:34" },
            { title: "Fairly Local", src: "audio/blurryface/fairlylocal.mp3", duration: "3:27" },
            { title: "Tear In My Heart", src: "audio/blurryface/tearinmyheart.mp3", duration: "3:08" },
            { title: "Lane Boy", src: "audio/blurryface/laneboy.mp3", duration: "4:13" },
            { title: "The Judge", src: "audio/blurryface/thejudge.mp3", duration: "4:58" },
            { title: "Doubt", src: "audio/blurryface/doubt.mp3", duration: "3:11" },
            { title: "Polarize", src: "audio/blurryface/polarize.mp3", duration: "3:46" },
            { title: "We Don't Believe What's On TV", src: "audio/blurryface/wedontbelievewhatsonTV.mp3", duration: "2:57" },
            { title: "Message Man", src: "audio/blurryface/messageman.mp3", duration: "4:00" },
            { title: "Hometown", src: "albumes/BF/Twenty One Pilots - Hometown.mp3", duration: "3:54" },
            { title: "Not Today", src: "audio/blurryface/nottoday.mp3", duration: "3:58" },
            { title: "Goner", src: "audio/blurryface/goner.mp3", duration: "3:56" }
        ];

        function renderSongs() {
            const list = document.getElementById('songList');
            list.innerHTML = blurryfaceSongs.map((song, idx) => `
            <div class="song-row" data-index="${idx}">
                <div>
                    <span class="song-title">${song.title}</span><br>
                        <small class="text-muted">twenty one pilots</small><br>
                        <span class="text-muted ms-3">${song.duration}</span>
                    <span class="text-muted ms-3">${song.duration}</span>
                </div>
                <div class="song-actions">
                    <i class="fas fa-play" onclick="playSong(${idx})" title="Reproducir"></i>
                </div>
            </div>
        `).join('');
        }

        function playSong(idx) {
            const song = blurryfaceSongs[idx];
            const footer = document.getElementById('footerPlayer');
            const audio = document.getElementById('footerAudio');
            document.getElementById('footerTitle').textContent = song.title;
            document.getElementById('footerArtist').textContent = "twenty one pilots";
            document.getElementById('footerImg').src = "resources/Blurryface.webp";
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
                const idx = blurryfaceSongs.findIndex(s => s.title.toLowerCase() === songParam.toLowerCase());
                if (idx !== -1) {
                    playSong(idx);
                }
            }
        });