# Importar la base de datos `tempomusic` en phpMyAdmin

Pasos rápidos:

1. Abrir phpMyAdmin en tu XAMPP (normalmente http://localhost/phpmyadmin).
2. Seleccionar la pestaña "Importar".
3. Hacer clic en "Elegir archivo" y seleccionar `tempomusic_schema.sql` (ubicado en `Pagina/assets/php`).
4. Presionar el botón "Continuar" para ejecutar el script.

Notas importantes:
- El archivo crea la base de datos `tempomusic` y las tablas `usuarios`, `artistas` y `music`.
- Los scripts PHP del proyecto (`assets/php/*.php`) usan el nombre de base de datos `tempomusic`, que coincide con `db.php`.
- Actualmente los scripts PHP almacenan contraseñas en texto plano. Se recomienda actualizar `register` para usar `password_hash` y `login` para usar `password_verify`.
- Recursos (imágenes/archivos) referenciados en las filas de ejemplo apuntan a rutas relativas del proyecto (por ejemplo `resources/trench.jpg`). Asegúrate de que esas rutas existan o ajusta los valores.

Comandos alternativos (MySQL CLI):

```bash
mysql -u root -p < Pagina/assets/php/tempomusic_schema.sql
```

Si quieres que importe y cree usuarios de prueba distintos, dime qué correos/contraseñas prefieres y lo actualizo.

