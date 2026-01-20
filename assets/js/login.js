function mostrarMensaje(texto, tipo) {
    let msg = document.getElementById('loginMsg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'loginMsg';
        msg.className = 'mt-3';
        document.querySelector('.login-card').appendChild(msg);
    }
    msg.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
}

document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    // Enviar datos al backend PHP para validar usuario
    fetch('/Pagina4/Pagina/assets/php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Guardar usuario en sessionStorage para user.html, incluyendo foto
            sessionStorage.setItem('usuarioLogueado', JSON.stringify({ name: data.name, email: email, profileImg: data.profileImg }));
            mostrarMensaje('¡Bienvenido, ' + data.name + '!', 'success');
            setTimeout(() => window.location.href = "user.html", 1200);
        } else {
            mostrarMensaje(data.message || 'Correo o contraseña incorrectos', 'danger');
        }
    })
    .catch(() => mostrarMensaje('Error de conexión', 'danger'));
});
// ...existing code...
