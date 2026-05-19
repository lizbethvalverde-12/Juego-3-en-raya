<?php
// Configuración de la base de datos local en XAMPP
$host = "localhost";
$user = "root";
$password = "";
$dbname = "juego_db";

// Conexión nativa a MySQL (Estilo ETP Xavier)
$conexion = new mysqli($host, $user, $password, $dbname);

// Comprobar si la conexión ha fallado
if ($conexion->connect_error) {
    die("Error crítico de conexión: " . $conexion->connect_error);
}
?>