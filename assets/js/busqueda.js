function filtrarResultados() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultados = document.querySelectorAll('#resultados .col');
    let encontrados = 0;

    resultados.forEach(col => {
        const titulo = col.getAttribute('data-title').toLowerCase();
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
        document.getElementById('resultados').parentNode.insertBefore(div, document.getElementById('resultados').nextSibling);
    }
}
