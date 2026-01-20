
<?php
header('Content-Type: application/json');
require_once('db.php');
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
	echo json_encode(['success' => false, 'message' => 'Email y contraseña requeridos.']);
	exit;
}

	// Traer también la foto de perfil
	$stmt = $conn->prepare('SELECT name, profile_img FROM usuarios WHERE email = ? AND password = ?');
if (!$stmt) {
	echo json_encode(['success' => false, 'message' => 'Error en la consulta.']);
	exit;
}
 $stmt->bind_param('ss', $email, $password);
 $stmt->execute();
 $result = $stmt->get_result();
	if ($row = $result->fetch_assoc()) {
		echo json_encode([
			'success' => true,
			'name' => $row['name'],
			'profileImg' => $row['profile_img']
		]);
} else {
	echo json_encode(['success' => false, 'message' => 'Correo o contraseña incorrectos.']);
}
$stmt->close();
$conn->close();
?>
