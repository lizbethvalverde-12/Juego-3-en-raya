<?php
// Incluir la conexión a la base de datos que creamos en el Paso 3
include_once 'conexion.php';

// Comprobar si los datos vienen por el formulario POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Recoger y limpiar los datos del formulario usando $_POST
    $username = mysqli_real_escape_string($conexion, trim($_POST['username']));
    $password = trim($_POST['password']);

    // Comprobar que no estén vacíos
    if (!empty($username) && !empty($password)) {
        
        // Verificar si el nombre de usuario ya existe en la base de datos
        $checkUser = "SELECT id FROM usuarios WHERE username = '$username'";
        $resultadoCheck = $conexion->query($checkUser);

        if ($resultadoCheck->num_rows > 0) {
            // Si ya existe, volvemos con error (Cambiado a ../Frontend/login_vista.html)
            header("Location: ../Frontend/login_vista.html?error=El+usuario+ya+existe");
            exit();
        } else {
            // Encriptar la contraseña (seguridad obligatoria del profesor)
            $password_encriptada = password_hash($password, PASSWORD_BCRYPT);

            // Insertar el nuevo usuario en la base de datos
            $sql = "INSERT INTO usuarios (username, password) VALUES ('$username', '$password_encriptada')";
            
            if ($conexion->query($sql) === TRUE) {
                // ¡Éxito! Redirigir al login con un cartel verde de éxito (Cambiado a ../Frontend/login_vista.html)
                header("Location: ../Frontend/login_vista.html?mensaje=Usuario+registrado+con+éxito");
                exit();
            } else {
                // Si hay un error raro de la base de datos (Cambiado a ../Frontend/login_vista.html)
                header("Location: ../Frontend/login_vista.html?error=Error+al+registrar+el+usuario");
                exit();
            }
        }
    } else {
        // Si dejó campos vacíos (Cambiado a ../Frontend/login_vista.html)
        header("Location: ../Frontend/login_vista.html?error=Faltan+campos+por+rellenar");
        exit();
    }
} else {
    // Si intentan entrar directos a este archivo, al login (Cambiado a ../Frontend/login_vista.html)
    header("Location: ../Frontend/login_vista.html");
    exit();
}

$conexion->close();
?>