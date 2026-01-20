<?php
require_once "db.php";
header('Content-Type: application/json');

// Solo permitir acceso si el usuario es admin (puedes mejorar esto con sesiones)
$admin_email = "admin@musicapp.com";
$admin_password = "admin123";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    if ($action === 'login') {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        if ($email === $admin_email && $password === $admin_password) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "msg" => "Credenciales incorrectas"]);
        }
        exit;
    }
    if ($action === 'publish') {
        $type = $_POST['type'] ?? '';
        $title = $_POST['title'] ?? '';
        $artist = trim($_POST['artist'] ?? '');
        $date = $_POST['date'] ?? date('Y-m-d');
        $cover = '';
        $file = '';

        // Verificar si el artista existe
        $stmt = $conn->prepare("SELECT id FROM artistas WHERE nombre = ?");
        $stmt->bind_param("s", $artist);
        $stmt->execute();
        $result = $stmt->get_result();
        if($row = $result->fetch_assoc()){
            $artista_id = $row['id'];
        }else{
            // Crear artista si no existe
            $stmt_insert = $conn->prepare("INSERT INTO artistas (nombre) VALUES (?)");
            $stmt_insert->bind_param("s", $artist);
            $stmt_insert->execute();
            $artista_id = $stmt_insert->insert_id;
        }
        // Guardar portada
        if (isset($_FILES['cover'])) {
            $cover_name = uniqid() . '_' . basename($_FILES['cover']['name']);
            $cover_path = __DIR__ . '/../uploads/' . $cover_name;
            if(move_uploaded_file($_FILES['cover']['tmp_name'], $cover_path)){
                $cover = 'assets/uploads/' . $cover_name;
            }
        }
        // Guardar archivo de audio si es canción
        if ($type === 'cancion' && isset($_FILES['file'])) {
            $file_name = uniqid() . '_' . basename($_FILES['file']['name']);
            $file_path = __DIR__ . '/../uploads/' . $file_name;
            if(move_uploaded_file($_FILES['file']['tmp_name'], $file_path)){
                $file = 'assets/uploads/' . $file_name;
            }
        }
        // Insertar en la base de datos
        $stmt = $conn->prepare("INSERT INTO music (type, title, artist, date, cover, file, artista_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssi", $type, $title, $artist, $date, $cover, $file, $artista_id);
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "msg" => "Error al publicar"]);
        }
        exit;
    }
}
// Listar canciones y álbumes
$result = $conn->query("SELECT * FROM music ORDER BY date DESC");
$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}
echo json_encode($items);
?>
