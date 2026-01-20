// assets/js/data.js
// JS para la página del álbum DATA de Tainy

document.addEventListener('DOMContentLoaded', function() {
    const songRows = document.querySelectorAll('.song-row');
    const footerPlayer = document.getElementById('footerPlayer');
    const footerImg = document.getElementById('footerImg');
    const footerTitle = document.getElementById('footerTitle');
    const footerArtist = document.getElementById('footerArtist');
    const footerAudio = document.getElementById('footerAudio');
    const footerPause = document.getElementById('footerPause');

    // Lista de canciones con rutas de audio (simulado)
    const songs = [
        { title: 'obstáculo', artist: 'Tainy', src: 'resources/data/obstaculo.mp3' },
        { title: 'Fantasma', artist: 'Tainy, Jhayco', src: 'resources/data/fantasma.mp3' },
        { title: 'La Baby', artist: 'Tainy, Daddy Yankee, Feid, Sech', src: 'resources/data/lababy.mp3' },
        { title: 'Paranormal', artist: 'Tainy, Álvaro Díaz', src: 'resources/data/paranormal.mp3' },
        { title: '11 y Once', artist: 'Tainy, Rauw Alejandro', src: 'resources/data/11yonce.mp3' },
        { title: 'me jodiste', artist: 'Tainy, Myke Towers', src: 'resources/data/mejodiste.mp3' },
        { title: 'Volver', artist: 'Tainy, Sech', src: 'resources/data/volver.mp3' },
        { title: 'En Visto', artist: 'Tainy, Mora', src: 'resources/data/envisto.mp3' },
        { title: 'La Vida Es Una', artist: 'Tainy, Arcangel', src: 'resources/data/lavidaesuna.mp3' },
        { title: 'Si Preguntan...', artist: 'Tainy, Rauw Alejandro, Myke Towers', src: 'resources/data/sipreguntan.mp3' },
        { title: 'Lo Siento BB:/', artist: 'Tainy, Bad Bunny, Julieta Venegas', src: 'resources/data/losientobb.mp3' },
        { title: 'En La Calle', artist: 'Tainy, J Balvin', src: 'resources/data/enlacalle.mp3' },
        { title: 'El Cielo', artist: 'Tainy, Myke Towers', src: 'resources/data/elcielo.mp3' },
        { title: 'Bandida', artist: 'Tainy, Jhayco', src: 'resources/data/bandida.mp3' },
        { title: 'La Baby (Remix)', artist: 'Tainy, Daddy Yankee, Feid, Sech, J Balvin', src: 'resources/data/lababyremix.mp3' },
        { title: 'obstáculo (Remix)', artist: 'Tainy', src: 'resources/data/obstaculoremix.mp3' },
        { title: 'Fantasma (Remix)', artist: 'Tainy, Jhayco, Rauw Alejandro', src: 'resources/data/fantasmaremix.mp3' },
        { title: 'DATA', artist: 'Tainy', src: 'resources/data/data.mp3' }
    ];

    songRows.forEach((row, idx) => {
        row.addEventListener('click', function() {
            const song = songs[idx];
            footerImg.src = 'resources/data.jpg';
            footerTitle.textContent = song.title;
            footerArtist.textContent = song.artist;
            footerAudio.src = song.src;
            footerPlayer.style.display = 'flex';
            footerAudio.play();
            footerPause.className = 'fas fa-pause';
        });
    });

    footerPause.addEventListener('click', function() {
        if (footerAudio.paused) {
            footerAudio.play();
            footerPause.className = 'fas fa-pause';
        } else {
            footerAudio.pause();
            footerPause.className = 'fas fa-play';
        }
    });
});
