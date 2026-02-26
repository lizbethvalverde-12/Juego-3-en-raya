let turno=1;// indica a quien le toca
let fichas=["O", "X"];
let puestas=0;// indica el numero de fichas que he puesto
let partidasAcabadas=false;// Indica que la partida a terminado
let textoVictoria=document.getElementById("textoVictoria");//Mensaje si ganaste o perdiste
let botones=Array.from(document.getElementsByTagName("button"));

//Activamos el click en todas las casillas del tablero
botones.forEach(x => x.addEventListener("click", ponerFicha));

function cambiarTamañoTablero(tamaño){
//tablero reseteado

    let tablero = document.getElementById("tablero");
    console.log("tablero cambiado a tamaño" + tamaño);
}
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("tres-por-tres").addEventListener("click", function(){
        cambiarTamañoTablero(3);
    });

    document.getElementById("cinco-por-cinco").addEventListener("click", function(){
        cambiarTamañoTablero(5);
    });






})/* cuando el html ya se a cargado*/



//Cuando el jugador hace click en un casilla
function ponerFicha(event){
    let botonPulsado=event.target;

        //SI YA TIENE FICHA,SALIR
    
        if(botonPulsado.innerHTML !=="" || partidasAcabadas){
            return;
        }
    //cuantos botones has clicado para determinar si la partida a terminado 
        botonPulsado.innerHTML = fichas[turno];
        puestas +=1;

        //Comprueba si alguien gano
        let estadoPartida = estado ();

        //Si nadie ganó  juega la ia 
        if(estadoPartida==0){
            cambiarTurno();
            if(puestas<9){
                ia();
                estadoPartida = estado();
                puestas+=1;
                cambiarTurno();
            }
        }

        //Si gana el jugador
        if(estadoPartida==1){
            textoVictoria.style.visibility = "visible";
            partidasAcabadas= true;
        }
        //Si gana la ia
        else if (estadoPartida == -1){
            textoVictoria.innerHTML= "Has perdido ;(";
            partidasAcabadas=true;
            textoVictoria.style.visibility = "visible";
        }
    }

//Cambiar de turno entre jugadores
function cambiarTurno(){
    if(turno==1){
        turno=0;
    }
    else{
        turno = 1;
    }
}

//Compruebe si alguien gano

function estado (){
    let posicionVictoria=0;
    let nEstado = 0;

// Compruebe si hay 3 casillas iguales
    function sonIguales(...args){//  
        let valores = args.map(x =>x.innerHTML);
        
        //Comprobamos que el primero no este vacio, y que todos los valores sean iguales
        if(valores[0]!= "" && valores.every(x =>x ===valores[0])){
            
            //Pintamos la línea ganadora de color fuchsia
            args.forEach(x => x.style.backgroundColor = "fuchsia")
            return true;
        }
        else{
            return false;
        }
    }

    //Revisamos todas las combinaciones  en las que podemos ganar

    if(sonIguales(botones[0], botones[1], botones[2])){
        posicionVictoria=1;
    }
    else if (sonIguales(botones[3], botones [4], botones[5])){
        posicionVictoria = 2;
    }
    else if(sonIguales(botones[6], botones[7], botones[8])){
        posicionVictoria=3;
    } 
    else if (sonIguales(botones[0], botones[3], botones[6])){
        posicionVictoria=4;
    }
    else if (sonIguales(botones[1], botones[4], botones[7])){
        posicionVictoria=5;
    }
    else if (sonIguales(botones[2], botones[5], botones[8])){
        posicionVictoria=6;
    }
    else if (sonIguales(botones[0], botones[4], botones[8])){
        posicionVictoria=7;
    }
    else if (sonIguales(botones[2], botones[4], botones[6])){
        posicionVictoria=8;
    }
    //Comprobamos quien ha ganado
    if(posicionVictoria > 0 ){
        if(turno == 1){
            nEstado=1;
        }
        else{
            nEstado=-1;
        }
    }
    
    return nEstado;

}

//La ia elige una  casilla para jugar, 1ro intenta en el centro ,si está ocupado, busca una casilla vacía al azar y coloca allí su ficha.
function ia (){
    function aleatorio(min,max){
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    let valores= botones.map(x=>x.innerHTML);
    let pos = -1;

    if(valores[4]==""){
        pos = 4;
    }
    else{
        let n = aleatorio(0,botones.length-1);
        while(valores[n]!=""){
            n = aleatorio(0,botones.length-1);
        }
        pos = n;
    }
    //Coloca ficha de la ia 
    botones[pos].innerHTML= fichas[turno];
    return pos;
}









