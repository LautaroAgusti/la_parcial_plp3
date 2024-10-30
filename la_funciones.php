<?php
header('Content-Type: application/json');

$host = "localhost";
$dbname = "la_parcial_plp3";
$user = "root";
$password = "";

try {
    $conexion = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conexion->query("SELECT palabra FROM la_palabras ORDER BY RAND() LIMIT 1");
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($resultado);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la conexión: " . $e->getMessage()]);
}
?>
