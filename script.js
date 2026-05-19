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
}









