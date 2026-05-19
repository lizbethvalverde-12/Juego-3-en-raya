<?php

session_start();


session_destroy();

//redirige a los usuarios login
header("Location: ../frontend/login_vista.html");
exit();
?>