<?php

session_start();


include_once 'conexion.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
   
    $username = mysqli_real_escape_string($conexion, trim($_POST['username']));
    $password = trim($_POST['password']);

    if (!empty($username) && !empty($password)) {
        
        
        $sql = "SELECT id, username, password FROM usuarios WHERE username = '$username'";
        $resultado = $conexion->query($sql);

        if ($resultado->num_rows > 0) {
            $usuario = $resultado->fetch_assoc();
            
            // Verificar la contraseña encriptada
            if (password_verify($password, $usuario['password'])) {
                
                
                $_SESSION['usuario_id'] = $usuario['id'];
                $_SESSION['username'] = $usuario['username'];
                
                
                header("Location: ../frontend/index.html");
                exit();
                
            } else {
                
                header("Location: ../frontend/login_vista.html?error=Contraseña incorrecta");
                exit();
            }
        } else {
            header("Location: ../frontend/login_vista.html?error=El usuario no existe");
            exit();
        }
    } else {
        header("Location: ../frontend/login_vista.html?error=Faltan campos por rellenar");
        exit();
    }
} else {
    
    header("Location: ../frontend/login_vista.html");
    exit();
}

$conexion->close();
?>