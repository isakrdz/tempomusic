const cancionesFavoritas = [
    { titulo: "Levitate", artista: "twenty one pilots", img: "resources/trench.jpg" },
    { titulo: "505", artista: "Arctic Monkeys", img: "resources/fwn.jpeg" },
    { titulo: "Kids", artista: "MGMT", img: "artistas/mgmt.jpg" },
    { titulo: "Selfless", artista: "The Strokes", img: "resources/tna.jpg" },
    { titulo: "Somebody T...", artista: "The Killers", img: "resources/hotfuss.jpeg" },
    { titulo: "Morph", artista: "twenty one pilots", img: "resources/trench.jpg" }
];

const albumesFavoritos = [
    { titulo: "Trench", artista: "twenty one pilots", img: "resources/trench.jpg", href: "trench.html" },
    { titulo: "Favourite W. N.", artista: "Arctic Monkeys", img: "resources/fwn.jpeg" },
    { titulo: "Oracular S.", artista: "MGMT", img: "artistas/mgmt.jpg" },
    { titulo: "Hot Fuss", artista: "The Killers", img: "resources/hotfuss.jpeg" }
];

function crearCardFavorito(item, tipo) {
    return `
    <div class="col" data-title="${item.titulo}">
        <div class="card card-custom">
            <img src="${item.img}" class="playlist-img" alt="${item.titulo}">
            <div class="card-body d-flex flex-column align-items-start">
                <h6 class="card-title text-white mb-1">${item.titulo}</h6>
                <p class="card-text text-muted mb-2">${item.artista}</p>
                <button class="fav-btn" onclick="toggleFavorito(this)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    </div>
    `;
}

function mostrarFavoritos() {
    document.getElementById('favCanciones').innerHTML = cancionesFavoritas.map(c => crearCardFavorito(c, 'cancion')).join('');
    document.getElementById('favAlbumes').innerHTML = albumesFavoritos.map(a => crearCardFavorito(a, 'album')).join('');
}

function filtrarFavoritos() {
    const input = document.getElementById('favSearch').value.toLowerCase();
    document.querySelectorAll('#favCanciones .col, #favAlbumes .col').forEach(card => {
        const titulo = card.getAttribute('data-title').toLowerCase();
        card.style.display = titulo.includes(input) ? '' : 'none';
    });
}

function toggleFavorito(btn) {
    btn.classList.toggle('favorited');
}

document.addEventListener('DOMContentLoaded', mostrarFavoritos);
