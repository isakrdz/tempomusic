<?php
// Eliminado: este archivo fue agregado después de la creación inicial de la base de datos.
// Se mantiene vacío por petición del usuario.
?>

if ($action === 'remove_from_library') {
    $email = $_POST['email'] ?? '';
    $music_id = intval($_POST['music_id'] ?? 0);
    if (!$email || !$music_id) { echo json_encode(['success' => false, 'message' => 'email y music_id requeridos']); exit; }
    $user_id = getUserIdByEmail($conn, $email);
    if (!$user_id) { echo json_encode(['success' => false, 'message' => 'usuario no encontrado']); exit; }

    $stmt = $conn->prepare('DELETE FROM user_library WHERE user_id = ? AND music_id = ?');
    $stmt->bind_param('ii', $user_id, $music_id);
    if ($stmt->execute()) echo json_encode(['success' => true]); else echo json_encode(['success' => false, 'message' => 'no se pudo eliminar']);
    $stmt->close();
    exit;
}

if ($action === 'get_library') {
    $email = $_GET['email'] ?? '';
    if (!$email) { echo json_encode(['success' => false, 'message' => 'email requerido']); exit; }
    $user_id = getUserIdByEmail($conn, $email);
    if (!$user_id) { echo json_encode(['success' => false, 'message' => 'usuario no encontrado']); exit; }

    $sql = "SELECT m.*, a.nombre AS artista_nombre, ul.created_at AS added_at
            FROM user_library ul
            JOIN music m ON ul.music_id = m.id
            LEFT JOIN artistas a ON m.artista_id = a.id
            WHERE ul.user_id = ? ORDER BY ul.created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $res = $stmt->get_result();
    $items = [];
    while ($row = $res->fetch_assoc()) $items[] = $row;
    $stmt->close();
    echo json_encode(['success' => true, 'items' => $items]);
    exit;
}

// Playlists
if ($action === 'create_playlist') {
    $email = $_POST['email'] ?? '';
    $name = trim($_POST['name'] ?? '');
    if (!$email || !$name) { echo json_encode(['success' => false, 'message' => 'email y name requeridos']); exit; }
    $user_id = getUserIdByEmail($conn, $email);
    if (!$user_id) { echo json_encode(['success' => false, 'message' => 'usuario no encontrado']); exit; }

    $stmt = $conn->prepare('INSERT INTO playlists (user_id, name) VALUES (?, ?)');
    $stmt->bind_param('is', $user_id, $name);
    if ($stmt->execute()) echo json_encode(['success' => true, 'playlist_id' => $stmt->insert_id]); else echo json_encode(['success' => false, 'message' => 'no se pudo crear']);
    $stmt->close();
    exit;
}

if ($action === 'delete_playlist') {
    $email = $_POST['email'] ?? '';
    $playlist_id = intval($_POST['playlist_id'] ?? 0);
    if (!$email || !$playlist_id) { echo json_encode(['success' => false, 'message' => 'email y playlist_id requeridos']); exit; }
    $user_id = getUserIdByEmail($conn, $email);
    if (!$user_id) { echo json_encode(['success' => false, 'message' => 'usuario no encontrado']); exit; }

    // Ensure playlist belongs to user
    $stmt = $conn->prepare('DELETE FROM playlists WHERE id = ? AND user_id = ?');
    $stmt->bind_param('ii', $playlist_id, $user_id);
    if ($stmt->execute()) echo json_encode(['success' => true]); else echo json_encode(['success' => false, 'message' => 'no se pudo eliminar']);
    $stmt->close();
    exit;
}

if ($action === 'add_to_playlist') {
    $playlist_id = intval($_POST['playlist_id'] ?? 0);
    $music_id = intval($_POST['music_id'] ?? 0);
    if (!$playlist_id || !$music_id) { echo json_encode(['success' => false, 'message' => 'playlist_id y music_id requeridos']); exit; }

    $stmt = $conn->prepare('INSERT IGNORE INTO playlist_items (playlist_id, music_id) VALUES (?, ?)');
    $stmt->bind_param('ii', $playlist_id, $music_id);
    if ($stmt->execute()) echo json_encode(['success' => true]); else echo json_encode(['success' => false, 'message' => 'no se pudo agregar']);
    $stmt->close();
    exit;
}

if ($action === 'remove_from_playlist') {
    $playlist_id = intval($_POST['playlist_id'] ?? 0);
    $music_id = intval($_POST['music_id'] ?? 0);
    if (!$playlist_id || !$music_id) { echo json_encode(['success' => false, 'message' => 'playlist_id y music_id requeridos']); exit; }

    $stmt = $conn->prepare('DELETE FROM playlist_items WHERE playlist_id = ? AND music_id = ?');
    $stmt->bind_param('ii', $playlist_id, $music_id);
    if ($stmt->execute()) echo json_encode(['success' => true]); else echo json_encode(['success' => false, 'message' => 'no se pudo eliminar']);
    $stmt->close();
    exit;
}

if ($action === 'get_playlists') {
    $email = $_GET['email'] ?? '';
    if (!$email) { echo json_encode(['success' => false, 'message' => 'email requerido']); exit; }
    $user_id = getUserIdByEmail($conn, $email);
    if (!$user_id) { echo json_encode(['success' => false, 'message' => 'usuario no encontrado']); exit; }

    $stmt = $conn->prepare('SELECT id, name, created_at FROM playlists WHERE user_id = ? ORDER BY created_at DESC');
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $res = $stmt->get_result();
    $playlists = [];
    while ($pl = $res->fetch_assoc()) {
        $pl_id = (int)$pl['id'];
        $stmt2 = $conn->prepare("SELECT pi.id, m.*, a.nombre AS artista_nombre FROM playlist_items pi JOIN music m ON pi.music_id = m.id LEFT JOIN artistas a ON m.artista_id = a.id WHERE pi.playlist_id = ? ORDER BY pi.created_at");
        $stmt2->bind_param('i', $pl_id);
        $stmt2->execute();
        $res2 = $stmt2->get_result();
        $items = [];
        while ($it = $res2->fetch_assoc()) $items[] = $it;
        $stmt2->close();
        $pl['items'] = $items;
        $playlists[] = $pl;
    }
    $stmt->close();
    echo json_encode(['success' => true, 'playlists' => $playlists]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'acción inválida']);
$conn->close();

?>
