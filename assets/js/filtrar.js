document.getElementById('notiBell').addEventListener('click', function() {
    var modal = new bootstrap.Modal(document.getElementById('notiModal'));
    modal.show();
});


function filtrarTarjetas() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const tarjetas = document.querySelectorAll('.row-cols-2.row-cols-md-6.g-3.mb-4 .col');
    let encontrados = 0;

    tarjetas.forEach(col => {
        const titulo = col.querySelector('.card-title').textContent.toLowerCase();
        if (titulo.includes(input) || input === "") {
            col.style.display = '';
            encontrados++;
        } else {
            col.style.display = 'none';
        }
    });

    
    let mensaje = document.getElementById('no-result-message');
    if (mensaje) mensaje.remove();

   
    if (encontrados === 0) {
        const div = document.createElement('div');
        div.id = 'no-result-message';
        div.className = 'alert alert-warning mt-3';
        div.innerHTML = `Lo sentimos, lo que buscas no está en nuestro catálogo. <a href="contacto.html" class="alert-link">Haz clic aquí para tus sugerencias</a>.`;

        document.querySelector('.row-cols-2.row-cols-md-6.g-3.mb-4').parentNode.insertBefore(div, document.querySelector('.row-cols-2.row-cols-md-6.g-3.mb-4').nextSibling);
    }
}