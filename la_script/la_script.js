let palabra = '';
let intentos = 6;
let letrasUsadas = [];

// Función para obtener una nueva palabra y reiniciar el juego
function obtenerPalabra() {
    fetch('./la_php/la_funciones.php')
        .then(response => response.json())
        .then(data => {
            palabra = data.palabra;
            console.log("Palabra obtenida:", palabra);
            // Reiniciar el juego y limpiar el estado
            intentos = 6;
            letrasUsadas = [];  // Reiniciar letras usadas
            limpiarCanvas();    // Limpiar el canvas
            document.getElementById('la_intentos').innerText = `Intentos restantes: ${intentos}`;

            // Muestra la palabra y genera el teclado
            mostrarPalabra();
            generarTeclado();
        });
}

// Función para reiniciar el juego al perder
function reiniciarJuego() {
    alert(`Juego terminado. La palabra era: ${palabra}. El juego se reiniciará.`);
    registrarResultado(palabra, 'fallo');  // Registrar fallo en la base de datos
    obtenerPalabra();
}

// Muestra la palabra con letras acertadas en su posición
function mostrarPalabra() {
    let displayPalabra = palabra.split('').map(letra => (letrasUsadas.includes(letra.toUpperCase()) ? letra : '_')).join(' ');
    console.log("Palabra mostrada:", displayPalabra); // Confirmar la palabra mostrada en el juego
    document.getElementById('la_palabra').innerText = displayPalabra;
}

function generarTeclado() {
    const letrasContainer = document.getElementById('la_letras');
    letrasContainer.innerHTML = ''; // Limpiar teclas anteriores
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    letras.split('').forEach(letra => {
        const button = document.createElement('button');
        button.innerText = letra;
        button.onclick = () => la_verificarLetra(letra, button);
        letrasContainer.appendChild(button);
    });
}

function la_verificarLetra(letra, button) {
    if (!letrasUsadas.includes(letra)) {
        letrasUsadas.push(letra);
        button.disabled = true;  // Desactiva el botón para evitar que se presione de nuevo

        if (palabra.toUpperCase().includes(letra)) {
            button.style.backgroundColor = "#ADD8E6";  // Cambia el color del botón a azul claro si es correcta
            mostrarPalabra(); 

            // Verifica si el usuario ha ganado después de mostrar la palabra
            if (!palabra.split('').some(letra => !letrasUsadas.includes(letra.toUpperCase()))) {
                alert(`¡Ganaste! La palabra era: ${palabra}`);
                registrarResultado(palabra, 'acierto');  // Registrar acierto en la base de datos
                obtenerPalabra();  // Reinicia con una nueva palabra si gana
            }
        } else {
            button.style.backgroundColor = "green";  // Cambia el color del botón a verde si es incorrecta
            intentos--;
            document.getElementById('la_intentos').innerText = `Intentos restantes: ${intentos}`;
            dibujarParteCuerpo(intentos);  // Dibuja parte del cuerpo según el error
            if (intentos === 0) reiniciarJuego();
        }
    }
}

// Función para registrar el resultado en la base de datos
function registrarResultado(palabra, resultado) {
    fetch('./la_php/la_funciones.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `palabra=${encodeURIComponent(palabra)}&resultado=${resultado}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Mostrar la respuesta del servidor
    })
    .catch(error => {
        console.error('Error al registrar resultado:', error);
    });
}

// Función para dibujar el ahorcado progresivamente en el canvas
function dibujarParteCuerpo(intentos) {
    const canvas = document.getElementById("la_canvas-ahorcado");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#333";

    switch(intentos) {
        case 5: // Cabeza
            ctx.beginPath();
            ctx.arc(100, 30, 10, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 4: // Cuerpo
            ctx.beginPath();
            ctx.moveTo(100, 40);
            ctx.lineTo(100, 80);
            ctx.stroke();
            break;
        case 3: // Brazo izquierdo
            ctx.beginPath();
            ctx.moveTo(100, 50);
            ctx.lineTo(80, 70);
            ctx.stroke();
            break;
        case 2: // Brazo derecho
            ctx.beginPath();
            ctx.moveTo(100, 50);
            ctx.lineTo(120, 70);
            ctx.stroke();
            break;
        case 1: // Pierna izquierda
            ctx.beginPath();
            ctx.moveTo(100, 80);
            ctx.lineTo(80, 110);
            ctx.stroke();
            break;
        case 0: // Pierna derecha
            ctx.beginPath();
            ctx.moveTo(100, 80);
            ctx.lineTo(120, 110);
            ctx.stroke();
            break;
    }
}

// Función para limpiar el canvas
function limpiarCanvas() {
    const canvas = document.getElementById("la_canvas-ahorcado");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Inicializa el juego al cargar la página
window.onload = obtenerPalabra;
