

const cartonBingo = document.querySelector('#carton-bingo');
const nuevoCartonBtn = document.querySelector('button');
const verificarBingoBtn = document.getElementById('verificar-bingo-btn');

// en esta parte hace que se ejecute iniciar juego una vez haya finalazado la carga completo del documento,
// LINEA SEGURA Y EFICIENTE DE QUE JS SE ACTIVE UNA VEZ CARGADOS TODOS LOS ELEMENTOS DEL DOM,
document.addEventListener('DOMContentLoaded', iniciarJuego);

// aca tenemos el escuchardor de eventos CLICK cuando actua se inicia un nuevo juego
nuevoCartonBtn.addEventListener('click', iniciarJuego);

// Agregamos el escuchador de verificar BINGO.
verificarBingoBtn.addEventListener('click', verificarBingo)

// Inicia el juego implica que se ejecute este bloque de codigo que genera un carton nuevo 
// limpia lampantalla, y incrusta los div en el html.
function iniciarJuego() {
    const nuevoCarton = generarCarton();
    renderizarCarton(nuevoCarton);
}

/**
 * esto es nu array dentro de otro array o arrays
 * @returns {Array<Array<number|string>>} Un array bidimensional que representa el cartón.
 */
function generarCarton() {
    const carton = [];

    carton.push(generarNumerosUnicos(1, 15, 5));
    carton.push(generarNumerosUnicos(16, 30, 5));

    const numerosN = generarNumerosUnicos(31, 45, 4);
    numerosN.splice(2, 0, 'GRATIS');

    carton.push(numerosN);

    carton.push(generarNumerosUnicos(46, 60, 5));
    carton.push(generarNumerosUnicos(61, 75, 5));

    return carton;
};

function generarNumerosUnicos(min, max, cantidad) {
    const numeros = new Set();
    while (numeros.size < cantidad) {
        const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
        numeros.add(numeroAleatorio);
    }
    return Array.from(numeros);
};

//esta funcion realiza 3 cosas IMPORTANTES.
// 1) borra la pantalla.
// 2) recorre los arrays columnas y celdas que seran incrustadas en el html.
// 3) muestra el varton virtual del DOM que se creo.
function renderizarCarton(carton) {
    cartonBingo.innerHTML = ''; //estao borra la pantalla

    carton.forEach(columna => {
        columna.forEach(numero => {
            const celda = document.createElement('div');
            celda.classList.add('celda'); //aca se añade la classe para los estilos css de lña clase 'CELDA DE CSS'

            if (numero === 'GRATIS') { // ACA VERIFICA QUE ESTE LA PALABRA GRATIS Y LA ESTILIZA gratis de css de otro modo la inserta un numero
                celda.textContent = 'GRATIS';
                celda.classList.add('gratis');//agrega un clase para darle un estilo distinto.
            }
            else {
                celda.textContent = numero;
                celda.addEventListener('click', marcarNumero); // aca le decimos a navegador que cuando haga click aplique la funcion de marcado de numero
            }

            cartonBingo.appendChild(celda); // este paso inserta todos los elementos del div como higo de cartobingo
        });
    });
};

function marcarNumero(event) {
    event.target.classList.toggle('marcada');
};


//  Verifica si se ha completado una línea de Bingo (horizontal o vertical) y lanza confeti si se gana.

// esta funcion crea un array bidimensional es decir un array dentro de un otro array de forma virtual es decir no se ve en
// html pero esta en el DOM se esta manera hace una verificacion de celdas revisando si hay booleanos true en line horizontal o vertical
// la celda gratis se condsidera siempre true. los let i sonnlas filas y los let j son las columnas

 
function verificarBingo() {
    // Obtener todas las celdas del cartón
    const celdas = Array.from(cartonBingo.querySelectorAll('.celda'));

    // Crear una matriz de 5x5 con el estado de las celdas (true = marcada, false = no marcada)
    const estadoMarcado = [];
    for (let i = 0; i < 5; i++) {
        estadoMarcado[i] = [];
        for (let j = 0; j < 5; j++) {
            const indice = i * 5 + j;
            estadoMarcado[i][j] = celdas[indice].classList.contains('marcada');
        }
    }

    // El espacio 'GRATIS' siempre se considera marcado
    estadoMarcado[2][2] = true;

    // Verificar todas las filas (horizontal)
    for (let i = 0; i < 5; i++) {
        if (estadoMarcado[i].every(marcada => marcada)) {
            alert('¡BINGO! ¡Has completado una línea horizontal! 🎉');
            lanzarConfeti(); // Llama a la función de confeti
            return;
        }
    }

    // Verificar todas las columnas (vertical)
    for (let j = 0; j < 5; j++) {
        let columnaCompleta = true;
        for (let i = 0; i < 5; i++) {
            if (!estadoMarcado[i][j]) {
                columnaCompleta = false;
                break;
            }
        }
        if (columnaCompleta) {
            alert('¡BINGO! ¡Has completado una línea vertical! 🎉');
            lanzarConfeti(); // Llama a la función de confeti
            return;
        }
    }
};
// Lanza una animación de confeti en la pantalla.
 
function lanzarConfeti() {
  confetti({
    particleCount: 150, // Más partículas para un efecto más festivo
    spread: 120, // Expande el confeti en un ángulo más amplio
    origin: { y: 0.6 } // Inicia el confeti desde el centro de la pantalla
  });
};










