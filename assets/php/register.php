
<?php
require_once('db.php');
require_once('user_functions.php');

// Detectar si la petición viene con JSON (AJAX) o desde un formulario tradicional
$raw = file_get_contents('php://input');
$isJson = !empty($raw) && (json_decode($raw) !== null);
if ($isJson) {
	header('Content-Type: application/json');
	$data = json_decode($raw, true);
	$name = $data['name'] ?? '';
	$email = $data['email'] ?? '';
	$password = $data['password'] ?? '';
} else {
	// Petición por formulario (POST)
	$name = $_POST['name'] ?? '';
	$email = $_POST['email'] ?? '';
	$password = $_POST['password'] ?? '';
}

if (empty($name) || empty($email) || empty($password)) {
	if ($isJson) {
		echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos.']);
		exit;
	} else {
		// Redirigir de vuelta al registro con un query param simple
		header('Location: ../register.html?error=empty');
		exit;
	}
}

// Verificar si el correo ya existe
$stmt = $conn->prepare('SELECT id FROM usuarios WHERE email = ?');
if (!$stmt) {
	echo json_encode(['success' => false, 'message' => 'Error en la consulta.']);
	exit;
}
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows > 0) {
	echo json_encode(['success' => false, 'message' => 'Este correo ya está registrado.']);
	$stmt->close();
	$conn->close();
	exit;
}
$stmt->close();

$ok = registerUser($conn, $name, $email, $password, $isJson);
if ($ok) {
	if ($isJson) {
		// registerUser ya imprimió el JSON
		// nothing more to do
	} else {
		header('Location: ../login.html?registered=1');
	}
} else {
	if ($isJson) {
		// registerUser ya imprimió el JSON con el error
	} else {
		header('Location: ../register.html?error=db');
	}
}
$conn->close();
?>
