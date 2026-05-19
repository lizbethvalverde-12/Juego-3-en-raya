let tamaño = 3;
let turno = "X";
let juegoTerminado = false;
let tableroArray = [];

function crearTablero(n){
    tamaño = n;
    turno = "X";
    juegoTerminado = false;
    tableroArray = [];

    const tablero = document.getElementById("tablero");

    tablero.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    tablero.style.gridTemplateRows = `repeat(${n}, 1fr)`;  // Importante
    
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = "";
    tablero.innerHTML = "";

    for(let i=0; i<n*n; i++){
        const casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.addEventListener("click", () => jugar(i));
        tablero.appendChild(casilla);
        tableroArray.push("");
    }
}

function jugar(indice){
    if(tableroArray[indice] !== "" || juegoTerminado) return;

    tableroArray[indice] = "X";
    actualizarPantalla();

    if(verificarGanador()){
        document.getElementById("mensaje").textContent = "HAS GANADO";
        juegoTerminado = true;
        
        // PUSE AQUÍ: Llamada al backend para guardar el punto cuando gana el jugador
        actualizarPuntuacionBackend("jugador");
        return;
    }

    turnoOrdenador();
}

function turnoOrdenador(){
    if(juegoTerminado) return;

    let libres = tableroArray
        .map((valor, index) => valor === "" ? index : null)
        .filter(v => v !== null);

    if(libres.length === 0) return;

    let random = libres[Math.floor(Math.random() * libres.length)];
    tableroArray[random] = "O";

    actualizarPantalla();

    if(verificarGanador()){
        document.getElementById("mensaje").textContent = "HAS PERDIDO";
        juegoTerminado = true;
        
        // PUSE AQUÍ: Llamada al backend para guardar el punto cuando gana la máquina
        actualizarPuntuacionBackend("maquina");
    }
}

function actualizarPantalla(){
    const casillas = document.querySelectorAll(".casilla");
    casillas.forEach((c, i) => {
        c.textContent = tableroArray[i];
    });
}

function verificarGanador(){
    const casillas = document.querySelectorAll(".casilla");

    // filas
    for(let i=0; i<tamaño; i++){
        let inicio = i*tamaño;
        let valor = tableroArray[inicio];
        if(valor === "") continue;

        let gana = true;
        for(let j=1; j<tamaño; j++){
            if(tableroArray[inicio+j] !== valor){
                gana = false;
            }
        }

        if(gana){
            for(let j=0; j<tamaño; j++){
                casillas[inicio+j].classList.add("ganadora");
            }
            return true;
        }
    }

    // columnas
    for(let i=0; i<tamaño; i++){
        let valor = tableroArray[i];
        if(valor === "") continue;

        let gana = true;
        for(let j=1; j<tamaño; j++){
            if(tableroArray[i+j*tamaño] !== valor){
                gana = false;
            }
        }

        if(gana){
            for(let j=0; j<tamaño; j++){
                casillas[i+j*tamaño].classList.add("ganadora");
            }
            return true;
        }
    }

    // diagonal principal
    let valor = tableroArray[0];
    if(valor !== ""){
        let gana = true;
        for(let i=1; i<tamaño; i++){
            if(tableroArray[i*(tamaño+1)] !== valor){
                gana = false;
            }
        }
        if(gana){
            for(let i=0; i<tamaño; i++){
                casillas[i*(tamaño+1)].classList.add("ganadora");
            }
            return true;
        }
    }

    // diagonal secundaria
    valor = tableroArray[tamaño-1];
    if(valor !== ""){
        let gana = true;
        for(let i=1; i<tamaño; i++){
            if(tableroArray[(i+1)*(tamaño-1)] !== valor){
                gana = false;
            }
        }
        if(gana){
            for(let i=0; i<tamaño; i++){
                casillas[(i+1)*(tamaño-1)].classList.add("ganadora");
            }
            return true;
        }
    }

    return false;
} // PUSE AQUÍ: He dejado esta llave cerrando correctamente verificarGanador

// PUSE AQUÍ: La función ahora está suelta de manera independiente fuera de verificarGanador
// FUNCIÓN PARA ENVIAR EL PUNTO AL BACKEND EN PHP
function actualizarPuntuacionBackend(ganador) {
    // Convertimos el parámetro en la palabra exacta que procesa tu PHP ('ganado' o 'perdido')
    let resultadoEnvio = (ganador === "jugador") ? "ganado" : "perdido";

    fetch('../Backend/guardar_puntos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        // Enviamos 'resultado' que es el estándar esperado por el script del backend
        body: `resultado=${resultadoEnvio}`
    })
    .then(response => response.text()) // Leemos la respuesta como texto para evitar fallos si el PHP no manda JSON puro
    .then(data => {
        console.log("Respuesta del backend al guardar puntos:", data);
    })
    .catch(error => console.error('Error al guardar puntos:', error));
}








