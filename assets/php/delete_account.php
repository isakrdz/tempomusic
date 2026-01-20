<?php
header('Content-Type: application/json');
require_once('db.php');

$email = $_POST['email'] ?? '';
if(empty($email)){
    echo json_encode(['success' => false, 'message' => 'Email requerido.']);
    exit;
}

$stmt = $conn->prepare('DELETE FROM usuarios WHERE email = ?');
$stmt->bind_param('s', $email);
if($stmt->execute()){
    echo json_encode(['success' => true]);
}else{
    echo json_encode(['success' => false, 'message' => 'No se pudo eliminar la cuenta.']);
}
$stmt->close();
$conn->close();
?>
