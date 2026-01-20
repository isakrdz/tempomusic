<?php
/**
 * Funciones reutilizables relacionadas con usuarios
 */
function registerUser($conn, $name, $email, $password, $isJson = false) {
    // Verificar si el correo ya existe
    $stmt = $conn->prepare('SELECT id FROM usuarios WHERE email = ?');
    if (!$stmt) {
        if ($isJson) echo json_encode(['success' => false, 'message' => 'Error en la consulta.']);
        return false;
    }
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        if ($isJson) echo json_encode(['success' => false, 'message' => 'Este correo ya está registrado.']);
        $stmt->close();
        return false;
    }
    $stmt->close();

    // Insertar nuevo usuario
    $stmt = $conn->prepare('INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)');
    if (!$stmt) {
        if ($isJson) echo json_encode(['success' => false, 'message' => 'Error al preparar el registro.']);
        return false;
    }
    $stmt->bind_param('sss', $name, $email, $password);
    $ok = $stmt->execute();
    $stmt->close();

    if ($ok) {
        if ($isJson) echo json_encode(['success' => true]);
        return true;
    } else {
        if ($isJson) echo json_encode(['success' => false, 'message' => 'Error al registrar usuario.']);
        return false;
    }
}
?>

?>
