<?php
// Iniciar sesión para saber qué usuario está jugando
session_start();

// Incluir el archivo de conexión que creamos previamente
include_once 'conexion.php';

// Comprobar que el usuario ha iniciado sesión
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "error", "message" => "No has iniciado sesión"]);
    exit();
}

// Comprobar si los datos han llegado mediante el método POST de fetch
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['ganador'])) {
    
    $usuario_id = $_SESSION['usuario_id'];
    $ganador = $_POST['ganador'];

    // Si ha ganado el jugador, sumamos 1 a victorias_jugador
    if ($ganador === "jugador") {
        $sql = "UPDATE usuarios SET victorias_jugador = victorias_jugador + 1 WHERE id = $usuario_id";
    } 
    // Si ha ganado la máquina, sumamos 1 a victorias_maquina
    elseif ($ganador === "maquina") {
        $sql = "UPDATE usuarios SET victorias_maquina = victorias_maquina + 1 WHERE id = $usuario_id";
    } else {
        echo json_encode(["status" => "error", "message" => "Ganador no válido"]);
        exit();
    }

    // Ejecutar la consulta en la base de datos
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