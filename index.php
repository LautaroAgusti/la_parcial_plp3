<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego del Ahorcado</title>
    <link rel="stylesheet" href="la_estilos.css">
</head>
<body>
    <div class="la_contenedor-juego">
        <h1 class="la_titulo">Juego del Ahorcado</h1>
        <div class="la_letras" id="la_letras">
            <!-- Generar botones para cada letra -->
        </div>
        <!-- Contenedor para mostrar la palabra -->
        <div class="la_palabra" id="la_palabra"></div>
        <div class="la_dibujo">
            <canvas id="la_canvas-ahorcado" width="200" height="200"></canvas>
        </div>
        <div class="la_contador-intentos" id="la_intentos">Intentos restantes: 6</div>
    </div>

    <script src="la_script.js"></script>
</body>
</html>
