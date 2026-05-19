<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: login_vista.html?error=Debes iniciar sesión para jugar");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>3 en Raya</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>

    <div class="header-usuario" style="margin: 10px; color: white; text-align: right; width: 100%; max-width: 500px;">
        <span>Bienvenido, <strong><?php echo htmlspecialchars($_SESSION['username']); ?></strong>!</span> 
        <a href="../Backend/logout.php" style="color: #ff4d4d; margin-left: 15px; text-decoration: none; font-weight: bold;">Cerrar Sesión</a>
    </div>

    <h1>3 EN RAYA</h1>

    <div class="botones">
        <button onclick="crearTablero(3)">3x3</button>
        <button onclick="crearTablero(5)">5x5</button>
    </div>

    <h2 id="mensaje"></h2>

    <div class="juego-flex-container">
        
        <div class="caja-tablero">
            <div id="tablero"></div>
        </div>

        <div class="marcador-puntos">
            <h3>Puntuación</h3>
            <div class="score-box">
                <p>Victorias: <span id="puntos-ganados">0</span></p>
                <p>Derrotas: <span id="puntos-perdidos">0</span></p>
            </div>
        </div>

    </div>

</body>
</html>

