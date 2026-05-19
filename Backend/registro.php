<?php

include_once 'conexion.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    
    $username = mysqli_real_escape_string($conexion, trim($_POST['username']));
    $password = trim($_POST['password']);

   
    if (!empty($username) && !empty($password)) {
        
        
        $checkUser = "SELECT id FROM usuarios WHERE username = '$username'";
        $resultadoCheck = $conexion->query($checkUser);

        if ($resultadoCheck->num_rows > 0) {
            
            header("Location: ../Frontend/login_vista.html?error=El+usuario+ya+existe");
            exit();
        } else {
            
            $password_encriptada = password_hash($password, PASSWORD_BCRYPT);

            
            $sql = "INSERT INTO usuarios (username, password) VALUES ('$username', '$password_encriptada')";
            
            if ($conexion->query($sql) === TRUE) {
               
                header("Location: ../Frontend/login_vista.html?mensaje=Usuario+registrado+con+éxito");
                exit();
            } else {
               
                header("Location: ../Frontend/login_vista.html?error=Error+al+registrar+el+usuario");
                exit();
            }
        }
    } else {
        
        header("Location: ../Frontend/login_vista.html?error=Faltan+campos+por+rellenar");
        exit();
    }
} else {
    
    header("Location: ../Frontend/login_vista.html");
    exit();
}

$conexion->close();
?>