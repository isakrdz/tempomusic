document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    alert(`Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`);
});
