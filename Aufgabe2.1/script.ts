


//Aufgabe 2.1 1) a-c
// 1a) Namen die mit Zahlen anfangen gehen nicht z.B. 1x aber x1 würde gern
//     Keine Leerzeichen, oder variablen typen wie boolean, number, string etc.
//
// 1b) function a1 -> String x= "alles" -> Konsole sagt "alles" -> function func1() wird ausgeführt -> Konsole sagt "Klar" -> Konsolo sagt "logo!"

// 1c) Unten der überarbeitet Code für 1c

function a1(): void {
    let x: string = "Alles "; 
    func1(x);
    func2(x);
    func3(x);
    
}

a1();


function func1(x: string): void {
    console.log(x + "Gute!");
}
function func2(x: string): void {
    console.log(x + "Klar?");
}
function func3(x: string): void {
    console.log(x + "Logo!");
}


/**Aufgabe 2
* Was wird ausgegeben?
    9
    8
    7
    6
    5
    4
    3
    2
    1

*Wann verändert sich was?
    Wenn der Code i = i - 1; ausgeführt wird.
    Oder wenn i=0 ist, wird die Schleife beendet.
*/

/*Aufgabe 3
a) Fehler lassen sich nicht immer eindeutig erkennen wie der Code unten, der Sachen ankreidet was keine Fehler sind z.B. 
Fehlendes Semikolon oder das Gleichheitszeichen
*/


//Beispiel Fehler für Aufgabe 3a
/*
function a2(): void {
    let i: number = 9;

    do {
        console.log(i);
        !i = 1i - 1;    <------------- Als Fehler werden fehlendes Semikolon, '!i', '=' und '1i' erkannt aber nur '!i' und '1i' sind fehler
    } while ( i > 0);
}

a2();
*/


let x: string = "Hallo";
console.log(x);
func4(x);
console.log(x);
func5();
func6();
console.log(x);

function func4(y: string): void {
    y = "Bla";
    console.log(y);
}

function func5(): void {
    let x: string = "Blubb";
    console.log(x);
}

function func6(): void {
    x = "Test";
}



/*
Aufgabe 4
b) 
globale Variable: Können an jeder Stelle des Programms geändert werden.
lokale Variable: Werden nur Innerhalb einer Funktion benutzt
Übergabeparameter: Werden innerhalb z.B. einer Funktion benutzt um mit dieser Variable zu arbeiten, die extern der Funktion deklariert bzw. bestimmt wurde


Variablen und Funktionen sind gleich in dem Sinne das sie ein bestimmter typ sind z.B. boolean oder string. In der funktion aber kann man
    berechnung mit anderen variablen durchführen und/oder z.B. welche deklarieren

*/
//Aufgabe 5

//5a

let xa: number = 10;
let ya: number = 11;

console.log(multiply( xa, ya));

function multiply(x1: number, y1: number): number {
    let ergebnis: number = x1 * y1;
    return ergebnis;
}

//5b
console.log(max(xa, ya));

function max(x1: number, y1: number): number {
    if ( x1 > y1)
    return x1;
    else 
    return y1;
}


//5c
let zählen: number = 1;
let ergebnis: number = 0;

console.log(ergebnis);
while (zählen < 101 ) {
ergebnis = ergebnis + zählen;
zählen++; 
}
console.log(ergebnis);

//5d
let mind: number = 0;
let maxd: number = 100;
for (let i: number = 0; i < 10; i++ ) {
    console.log(getRandomArbitrary(mind, maxd));
}

function getRandomArbitrary (min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

//5e
let e5: number = 5;
console.log(factorial(e5));

function factorial (faktorzahl: number): number {
    let faktor: number = 1;
    let ergebnis1: number = 1;

    do {
         ergebnis1 = ergebnis1 * faktor;
         faktor++;
    }while ( faktor < faktorzahl + 1 );

    return ergebnis1;

}


//5f
let startjahr: number = 1900;
let endjahr: number = 2021;
leapyears (startjahr, endjahr);


function leapyears (anfangsjahr: number, heute: number): void { 
        
    for ( let i: number = anfangsjahr; i < heute + 1; i++) {
        if ( ((i % 100 != 0) && (i % 4 == 0)) || i % 400 == 0) {
            console.log(i);
        }
    }


}



//6a
let anzahlzeilen: number = 7;
let raute: string = "";

for ( let i: number = 0; i < anzahlzeilen; i++) {
    
    
    for (let b: number = 0; b < i + 1; b++) {
        raute += "#";
    }
    console.log(raute);
    raute = "";
    
}



//6b
let anfang: number = 1;
let ende: number = 100;
fizzbuzz(anfang, ende);

function fizzbuzz( anfangb: number, endeb: number): void {
for ( let i: number = anfangb; i < endeb + 1; i++) {
    if ( i % 3 == 0 ) {
        console.log("Fizz");
    } else if ( i % 5 == 0 && i % 3 != 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
    }
}

//6c
fizzbuzz2(anfang, ende);
function fizzbuzz2( anfangb: number, endeb: number): void {
    for ( let i: number = anfangb; i < endeb + 1; i++) {
        if ( i % 5 == 0 && i % 3 == 0) {
            console.log("FizzBuzz");
        } else if ( i % 5 == 0 && i % 3 != 0) {
            console.log("Buzz");
        } else if (i % 3 == 0) {
            console.log("fizz");
        } else {
            console.log(i);
        }
        }
    }
//6d+e

let schachbrettlänge: number = 20;
let rauten: string = "";
schachbrett(schachbrettlänge - 1);

function schachbrett(schachbrettgröße: number): void {
for (let x: number = 0; x < schachbrettgröße + 1; x++) {//Legt die Zeilen fest
    for ( let e: number = 0; e < schachbrettgröße + 1; e++) {//Legt die Reihen fest


        if (x == 0 || x % 2 == 0) { // Wenn in einer Zeile mit Ungerade zahl
        if (e % 2 == 0 && e != schachbrettgröße || e == 0) { 
            rauten += " ";
        } else if (e % 2 != 0 && e != schachbrettgröße || e == 1) {
            rauten += "#";
        } else {
            rauten += "\n";
        }
    } else if (x == 1 || x % 2 != 0 ) {// Wenn in einer Zeile mit einer Geraden zahl


        if (e % 2 == 0 && e != schachbrettgröße || e == 0) {
            rauten += "#";
        } else if (e % 2 != 0 && e != schachbrettgröße || e == 1) {
            rauten += " ";
        } else {
            rauten += "\n";
        }
    }
}
}

console.log(rauten);
}
