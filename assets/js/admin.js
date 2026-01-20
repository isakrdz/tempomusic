// admin.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const adminPanel = document.getElementById('admin-panel');
    const adminLogin = document.getElementById('admin-login');
    const loginMsg = document.getElementById('loginMsg');
    const publishForm = document.getElementById('publishForm');
    const publishMsg = document.getElementById('publishMsg');
    const listContent = document.getElementById('listContent');
    const fileDiv = document.getElementById('fileDiv');

    // Mostrar/ocultar campo de archivo según tipo
    document.getElementById('type').addEventListener('change', function(e) {
        if (e.target.value === 'cancion') {
            fileDiv.style.display = 'block';
        } else {
            fileDiv.style.display = 'none';
        }
    });

    // Login de administrador
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        const formData = new FormData();
        formData.append('action', 'login');
        formData.append('email', email);
        formData.append('password', password);
        fetch('assets/php/admin.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                adminPanel.style.display = 'block';
                adminLogin.style.display = 'none';
                loadList();
            }else{
                loginMsg.textContent = data.msg || 'Error de acceso';
            }
        });
    });

    // Publicar canción o álbum
    publishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;
        const cover = document.getElementById('cover').files[0];
        const file = document.getElementById('file').files[0];
        const date = new Date().toISOString().slice(0,10);
        const formData = new FormData();
        formData.append('action', 'publish');
        formData.append('type', type);
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('date', date);
        formData.append('cover', cover);
        if(type === 'cancion' && file){
            formData.append('file', file);
        }
        fetch('assets/php/admin.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                const redirect = document.getElementById('redirectHome').checked;
                publishMsg.textContent = redirect ? '¡Publicado correctamente! Redirigiendo...' : '¡Publicado correctamente!';
                publishForm.reset();
                if(redirect){
                    setTimeout(function(){
                        window.location.href = './home.html';
                    }, 1500);
                }else{
                    loadList();
                }
            }else{
                publishMsg.textContent = data.msg || 'Error al publicar';
            }
        });
    });

    // Cargar listado de canciones y álbumes
    function loadList(){
        fetch('assets/php/admin.php')
        .then(res => res.json())
        .then(items => {
            let html = '<div class="row">';
            items.forEach(item => {
                html += `<div class="col-md-4 mb-3">
                    <div class="card">
                        <img src="${item.cover}" class="card-img-top" alt="Portada">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">Artista: ${item.artist}</p>
                            <p class="card-text">Fecha: ${item.date}</p>
                            ${item.type === 'cancion' ? `<audio controls src="${item.file}"></audio>` : ''}
                        </div>
                    </div>
                </div>`;
            });
            html += '</div>';
            listContent.innerHTML = html;
        });
    }
});
// admin.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const adminPanel = document.getElementById('admin-panel');
    const adminLogin = document.getElementById('admin-login');
    const loginMsg = document.getElementById('loginMsg');
    const publishForm = document.getElementById('publishForm');
    const publishMsg = document.getElementById('publishMsg');
    const listContent = document.getElementById('listContent');
    const fileDiv = document.getElementById('fileDiv');

    // Mostrar/ocultar campo de archivo según tipo
    document.getElementById('type').addEventListener('change', function(e) {
        if (e.target.value === 'cancion') {
            fileDiv.style.display = 'block';
        } else {
            fileDiv.style.display = 'none';
        }
    });

    // Login de administrador
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        const formData = new FormData();
        formData.append('action', 'login');
        formData.append('email', email);
        formData.append('password', password);
        fetch('assets/php/admin.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                adminPanel.style.display = 'block';
                adminLogin.style.display = 'none';
                loadList();
            }else{
                loginMsg.textContent = data.msg || 'Error de acceso';
            }
        });
    });

    // Publicar canción o álbum
    publishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;
        const cover = document.getElementById('cover').files[0];
        const file = document.getElementById('file').files[0];
        const date = new Date().toISOString().slice(0,10);
        const formData = new FormData();
        formData.append('action', 'publish');
        formData.append('type', type);
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('date', date);
        formData.append('cover', cover);
        if(type === 'cancion' && file){
            formData.append('file', file);
        }
        fetch('assets/php/admin.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                const redirect = document.getElementById('redirectHome').checked;
                publishMsg.textContent = redirect ? '¡Publicado correctamente! Redirigiendo...' : '¡Publicado correctamente!';
                publishForm.reset();
                if(redirect){
                    setTimeout(function(){
                        window.location.href = './home.html';
                    }, 1500);
                }else{
                    loadList();
                }
            }else{
                publishMsg.textContent = data.msg || 'Error al publicar';
            }
        });
    });

    // Cargar listado de canciones y álbumes
    function loadList(){
        fetch('assets/php/admin.php')
        .then(res => res.json())
        .then(items => {
            let html = '<div class="row">';
            items.forEach(item => {
                html += `<div class="col-md-4 mb-3">
                    <div class="card">
                        <img src="${item.cover}" class="card-img-top" alt="Portada">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">Artista: ${item.artist}</p>
                            <p class="card-text">Fecha: ${item.date}</p>
                            ${item.type === 'cancion' ? `<audio controls src="${item.file}"></audio>` : ''}
                        </div>
                    </div>
                </div>`;
            });
            html += '</div>';
            listContent.innerHTML = html;
        });
    }
});
