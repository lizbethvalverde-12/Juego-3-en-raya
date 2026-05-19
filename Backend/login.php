<?php
// Iniciar la sesión nativa de PHP (como hace el profesor)
session_start();

// Incluir la conexión a la base de datos que creamos en el Paso 3
include_once 'conexion.php';

// Comprobar si los datos vienen por el formulario POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Recoger datos del formulario usando $_POST
    $username = mysqli_real_escape_string($conexion, trim($_POST['username']));
    $password = trim($_POST['password']);

    if (!empty($username) && !empty($password)) {
        
        // Buscar al usuario en la base de datos
        $sql = "SELECT id, username, password FROM usuarios WHERE username = '$username'";
        $resultado = $conexion->query($sql);

        if ($resultado->num_rows > 0) {
            $usuario = $resultado->fetch_assoc();
            
            // Verificar la contraseña encriptada
            if (password_verify($password, $usuario['password'])) {
                
                // ¡Éxito! Guardamos los datos en la sesión global de PHP
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['username'] = $usuario['username'];
                
                // Redirigir directamente a la pantalla del juego (Cambiado a ../Frontend/index.php)
                header("Location: ../Frontend/index.php");
                exit();
                
            } else {
                // Si falla, redirige al login con un mensaje de error en la URL (Cambiado a ../Frontend/login_vista.html)
                header("Location: ../Frontend/login_vista.html?error=Contraseña+incorrecta");
                exit();
            }
        } else {
            // (Cambiado a ../Frontend/login_vista.html)
            header("Location: ../Frontend/login_vista.html?error=El+usuario+no+existe");
            exit();
        }
    } else {
        // (Cambiado a ../Frontend/login_vista.html)
        header("Location: ../Frontend/login_vista.html?error=Faltan+campos+por+rellenar");
        exit();
    }
} else {
    // Si alguien intenta entrar a este archivo sin enviar el formulario, lo echamos al login (Cambiado a ../Frontend/login_vista.html)
    header("Location: ../Frontend/login_vista.html");
    exit();
}

$conexion->close();
?>