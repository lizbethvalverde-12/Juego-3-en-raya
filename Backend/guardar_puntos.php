<?php

session_start();


include_once 'conexion.php';


if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "error", "message" => "No has iniciado sesión"]);
    exit();
}


if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ganador'])) {
    
    $usuario_id = $_SESSION['usuario_id'];
    $ganador = $_POST['ganador'];


    if ($ganador === "jugador") {
        $sql = "UPDATE usuarios SET victorias_jugador = victorias_jugador + 1 WHERE id = $usuario_id";
    } 
  
    elseif ($ganador === "maquina") {
        $sql = "UPDATE usuarios SET victorias_maquina = victorias_maquina + 1 WHERE id = $usuario_id";
    } else {
        echo json_encode(["status" => "error", "message" => "Ganador no válido"]);
        exit();
    }

    // Ejecuta la consulta en la base de datos
    if ($conexion->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Puntuación actualizada con éxito"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al actualizar en la base de datos"]);
    }

} else {
    echo json_encode(["status" => "error", "message" => "Petición no válida"]);
}

$conexion->close();
?>