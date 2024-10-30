<?php
header('Content-Type: application/json');

$host = "localhost";
$dbname = "la_parcial_plp3";
$user = "root";
$password = "";

try {
    $conexion = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Si se recibe un POST para registrar un resultado
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Obtener los datos enviados
        $palabra = $_POST['palabra'];
        $resultado = $_POST['resultado'];

        // Preparar la consulta para insertar el resultado
        $stmt = $conexion->prepare("INSERT INTO resultados_ahorcado (palabra, resultado) VALUES (:palabra, :resultado)");
        $stmt->bindParam(':palabra', $palabra);
        $stmt->bindParam(':resultado', $resultado);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode(["success" => "Resultado registrado correctamente"]);
        } else {
            echo json_encode(["error" => "Error al registrar el resultado"]);
        }
    } else {
        // Obtener una palabra aleatoria
        $stmt = $conexion->query("SELECT palabra FROM la_palabras ORDER BY RAND() LIMIT 1");
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($resultado);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la conexión: " . $e->getMessage()]);
}
?>
