<?php
// Iniciar sesión para poder borrarla
session_start();

// Destruir todas las variables de la sesión (borra el usuario logueado)
session_destroy();

// Redirigir al usuario automáticamente de vuelta a la pantalla de login
header("Location: ../frontend/login_vista.html");
exit();
?>