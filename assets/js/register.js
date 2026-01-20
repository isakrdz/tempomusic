function mostrarMensajeRegistro(texto, tipo) {
    let msg = document.getElementById('registerMsg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'registerMsg';
        msg.className = 'mt-3';
        document.querySelector('.register-card').appendChild(msg);
    }
    msg.innerHTML = `<div class="alert alert-${tipo}">${texto}</div>`;
}

document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Enviar datos al backend PHP para registrar usuario
    fetch('/Pagina4/Pagina/assets/php/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password })
    })
    .then(async res => {
        // Si el servidor hizo una redirección (ej. header Location -> login), fetch la sigue pero no
        // cambia la URL de la ventana, así que si hubo redirección forzamos la navegación.
        console.log('Register response status:', res.status, 'redirected:', res.redirected, 'url:', res.url);
        if (res.redirected) {
            // Forzar la navegación a la URL final (por ejemplo login.html)
            window.location.href = res.url;
            return {}; // detener el flujo
        }

        // intentar parsear JSON; si falla, intentar leer texto para depuración
        try {
            const data = await res.json();
            return data;
        } catch (err) {
            const txt = await res.text().catch(() => '');
            console.warn('Respuesta no-JSON en registro:', txt);
            return {};
        }
    })
    .then(data => {
        if (data && data.success) {
            // Redirigir a login (ruta absoluta para evitar confusiones de path)
            window.location.href = '/Pagina4/Pagina/login.html';
            return;
        }
        // Si no obtuvimos success, mostrar mensaje recibido o genérico
        mostrarMensajeRegistro((data && data.message) ? data.message : 'Error en el registro', 'danger');
    })
    .catch((err) => {
        console.error('Registro error:', err);
        mostrarMensajeRegistro('Error de conexión', 'danger');
    })
    .finally(() => { if (submitBtn) submitBtn.disabled = false; });
});
// ...existing code...