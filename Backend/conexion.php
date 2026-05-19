<?php

$host = "localhost";
$user = "root";
$password = "";
$dbname = "juego_db";


$conexion = new mysqli($host, $user, $password, $dbname);


if ($conexion->connect_error) {
    die("Error crítico de conexión: " . $conexion->connect_error);
}
?>