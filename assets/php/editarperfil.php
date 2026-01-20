<?php
header('Content-Type: application/json');
require_once('db.php');

// Obtener datos del usuario
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';

// Manejo de imagen
$profileImg = '';
if (isset($_FILES['profileImg']) && $_FILES['profileImg']['error'] === UPLOAD_ERR_OK) {
    $imgName = uniqid() . '_' . basename($_FILES['profileImg']['name']);
    $imgPath = '../../resources/' . $imgName;
    if (move_uploaded_file($_FILES['profileImg']['tmp_name'], $imgPath)) {
        $profileImg = 'resources/' . $imgName;
    }
}

// Actualizar usuario
$stmt = $conn->prepare('UPDATE usuarios SET name = ?, profile_img = ? WHERE email = ?');
$stmt->bind_param('sss', $name, $profileImg, $email);
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'profileImg' => $profileImg, 'name' => $name]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar perfil.']);
}
$stmt->close();
$conn->close();
?>
