// Archivo eliminado: artists.js
// artists.js
// Mostrar todos los artistas y sus canciones/álbumes

document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/php/artistas.php')
    .then(res => res.json())
    .then(artistas => {
        let html = '<div class="row">';
        artistas.forEach(artista => {
            html += `<div class="col-md-6 mb-4">
                <div class="card shadow">
                    <div class="card-body">
                        <h4 class="card-title text-primary"><i class="fas fa-user"></i> ${artista.nombre}</h4>
                        <div class="row">`;
            artista.musicas.forEach(musica => {
                html += `<div class="col-md-6 mb-3">
                    <div class="card">
                        <img src="${musica.cover}" class="card-img-top" alt="Portada">
                        <div class="card-body">
                            <h5 class="card-title">${musica.title}</h5>
                            <p class="card-text">Fecha: ${musica.date}</p>
                            ${musica.type === 'cancion' ? `<audio controls src="${musica.file}"></audio>` : ''}
                        </div>
                    </div>
                </div>`;
            });
            html += `</div></div></div></div>`;
        });
        html += '</div>';
        document.getElementById('artistsList').innerHTML = html;
    });
});
