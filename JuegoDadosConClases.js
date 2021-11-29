//Código JavaScript
//autor Daniel Norberto hernández Santiago Num.ctrl: 18390015 

class Jugador{
    //definiir variables privadas
    #_caraDado1=0;
    #_caraDado2=0;

    //constructor de la clase jugador
    constructor(n){
        this.nombre=n
    }
    
    //métodos getter y setter de caraDado1 (variable privada)
    get caraDado1(){return this.#_caraDado1;}
    set caraDado1(valorDado1){this.#_caraDado1=valorDado1}

    //métodos getter y setter de CaraDado2 (variable privada)
    get caraDado2(){return this.#_caraDado2}
    set caraDado2(valorDado2){this.#_caraDado2=valorDado2}
}

//Clase JuegoDados
class JuegoDados{
    //Constructor de la clase Juego Dados
    constructor(numJuego,j1,j2){
        this.numeroJuego=numJuego;
        this.jugador1=new Jugador(j1.nombre);
        this.jugador2=new Jugador(j2.nombre);
    }
    
    //Metodo para tirar los dados
    tirarDados(){
        this.jugador1.caraDado1 = Math.round((Math.random() * 5) + 1);
        this.jugador1.caraDado2 = Math.round((Math.random() * 5) + 1);
        this.jugador2.caraDado1 = Math.round((Math.random() * 5) + 1);
        this.jugador2.caraDado2 = Math.round((Math.random() * 5) + 1);
    }

    //Metodo que determina al ganador
    determinarGanador(){
        if ( (this.jugador1.caraDado1 + this.jugador1.caraDado2 == 7)
            && (this.jugador2.caraDado1 + this.jugador2.caraDado2 != 7) )
            return this.jugador1.nombre;
        else if ( (this.jugador2.caraDado1 + this.jugador2.caraDado2 == 7)
            && (this.jugador1.caraDado1 + this.jugador2.caraDado1 != 7) )
            return this.jugador2.nombre;
        else return "Empate";
    }
}

/* Programar la clase que represente al torneo
clase torneoDados
    jugadas //Arreglo de objetos de clase JuegoDados

    juegosGanadosJugador1   //Hacer privado y métodos getter y setter
    juegosGanadosjugador2   //Hacer privado y métodos getter y setter

    función crear
    función jugar
    función resultado     //hacer privado y métodos getter y setter
*/
//Clase torneoDados
class torneoDados{
    //definir variables privadas
    #_juegosGanadosJugador1=0;
    #_juegosGanadosJugador2=0;
    
    //Constructor de la clase torneoDados
    constructor(){
        this.jugadas = new Array();
    }
    
    //métodos getter y setter de las partidas ganadas del jugador 1 (variable privada)
    get juegosGanadosJugador1(){return this.#_juegosGanadosJugador1}
    set juegosGanadosJugador1(ronWinJ1){this.#_juegosGanadosJugador1=ronWinJ1}

    //métodos getter y setter de las partidas ganadas del jugador 2 (variable privada)
    get juegosGanadosJugador2(){return this.#_juegosGanadosJugador2}
    set juegosGanadosJugador2(ronWinJ2){this.#_juegosGanadosJugador2=ronWinJ2}

    //funcion para instanciar objetos necesarios para llevar a cabo el torneo
    crear = function (j1,j2){
        this.jugador1 = new Jugador(j1);
        this.jugador2 = new Jugador(j2);
    }

    //metodo donde se llevan a cabo las partidas del torneo
    jugar = function(){
        let salida = true;
        while(salida){
            this.jugadas.push(new JuegoDados(this.jugadas.length,this.jugador1,this.jugador2));
            this.jugadas[this.jugadas.length-1].tirarDados();

            if(this.jugadas[this.jugadas.length-1].determinarGanador()==this.jugador1.nombre){
                this.juegosGanadosJugador1++;
            }else if(this.jugadas[this.jugadas.length-1].determinarGanador()==this.jugador2.nombre){
                this.juegosGanadosJugador2++;
            }

            if(this.juegosGanadosJugador1==3 || this.juegosGanadosJugador2==3){
                salida=false;
            }
        }
    }

    //creacion de metodo privado donde se obtienen los resultados
    #_resultado(){
        if(this.juegosGanadosJugador1==3){
            return this.jugador1.nombre;
        }else{
            return this.jugador2.nombre;
        }
    }

    //get del metodo de resultado (metodo privado)
    get resultado(){
        return this.#_resultado();
    }
    
    //set del metodo de resultado (metodo privado) - este funciona para cambia el resultado (cambiando al ganador por otro)
    set resultado(ganador){
        if(ganador==this.jugador1.nombre){
            if(this.juegosGanadosJugador1!=3){
                this.juegosGanadosJugador2=this.#_juegosGanadosJugador1;
                this.juegosGanadosJugador1=3;
            }            
        }else if(ganador==this.jugador1.nombre){
            if(this.juegosGanadosJugador2!=3){
                this.juegosGanadosJugador1=this.juegosGanadosJugador2;
                this.juegosGanadosJugador2=3;
            }
        }else{
            console.log("El Jugador que ingreso No existe");
        }
    }
}

//Usar clases para demostrar su funcionamiento
/*
    Simular un torneo de dados.
    El torneo se juega hasta que un jugador gana 3 juegos.
    Un jugador gana un juego cuando la suma de los 2 dados es 7 y el otro no obtiene un 7.
    En caso de que en un juego ninguno de los jugadores obtenga 7, se declara empate
*/
const Torneo = new torneoDados();
Torneo.crear("Mamuscha","Agustin");
Torneo.jugar();
console.log("(J1)Mamuscha vs (J2)Agustin");
console.log("Juegos Totales Jugados: "+Torneo.jugadas.length);
console.log("Partidas Ganadas por "+Torneo.jugador1.nombre+": "+Torneo.juegosGanadosJugador1);
console.log("Partidas Ganadas por "+Torneo.jugador2.nombre+": "+Torneo.juegosGanadosJugador2);
console.log("Ganador: "+Torneo.resultado);





