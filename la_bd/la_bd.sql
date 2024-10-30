CREATE DATABASE la_parcial_plp3;
USE la_parcial_plp3;
DROP DATABASE la_parcial_plp3;
CREATE TABLE la_palabras (
    id_palabra INT AUTO_INCREMENT PRIMARY KEY,
    palabra VARCHAR(50) NOT NULL
);

INSERT INTO la_palabras (palabra) VALUES 
('programacion'), ('desarrollo'), ('html'), ('css'), ('javascript'), ('base'), ('datos');
