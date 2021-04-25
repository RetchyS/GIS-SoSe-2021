"use strict";
//Aufgabe 2.1 1) a-c
// 1a) Namen die mit Zahlen anfangen gehen nicht z.B. 1x aber x1 würde gern
//     Keine Leerzeichen, oder variablen typen wie boolean, number, string etc.
//
// 1b) function a1 -> String x= "alles" -> Konsole sagt "alles" -> function func1() wird ausgeführt -> Konsole sagt "Klar" -> Konsolo sagt "logo!"
// 1c) Unten der überarbeitet Code für 1c
function a1() {
    let x = "Alles ";
    func1(x);
    func2(x);
    func3(x);
}
a1();
function func1(x) {
    console.log(x + "Gute!");
}
function func2(x) {
    console.log(x + "Klar?");
}
function func3(x) {
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
let x = "Hallo";
console.log(x);
func4(x);
console.log(x);
func5();
func6();
console.log(x);
function func4(y) {
    y = "Bla";
    console.log(y);
}
function func5() {
    let x = "Blubb";
    console.log(x);
}
function func6() {
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
let xa = 10;
let ya = 11;
console.log(multiply(xa, ya));
function multiply(x1, y1) {
    let ergebnis = x1 * y1;
    return ergebnis;
}
//5b
console.log(max(xa, ya));
function max(x1, y1) {
    if (x1 > y1)
        return x1;
    else
        return y1;
}
//5c
let zählen = 1;
let ergebnis = 0;
console.log(ergebnis);
while (zählen < 101) {
    ergebnis = ergebnis + zählen;
    zählen++;
}
console.log(ergebnis);
//5d
let mind = 0;
let maxd = 100;
for (let i = 0; i < 10; i++) {
    console.log(getRandomArbitrary(mind, maxd));
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//5e
let e5 = 5;
console.log(factorial(e5));
function factorial(faktorzahl) {
    let faktor = 1;
    let ergebnis1 = 1;
    do {
        ergebnis1 = ergebnis1 * faktor;
        faktor++;
    } while (faktor < faktorzahl + 1);
    return ergebnis1;
}
//5f
let startjahr = 1900;
let endjahr = 2021;
leapyears(startjahr, endjahr);
function leapyears(anfangsjahr, heute) {
    for (let i = anfangsjahr; i < heute + 1; i++) {
        if (((i % 100 != 0) && (i % 4 == 0)) || i % 400 == 0) {
            console.log(i);
        }
    }
}
//6a
let anzahlzeilen = 7;
let raute = "";
for (let i = 0; i < anzahlzeilen; i++) {
    for (let b = 0; b < i + 1; b++) {
        raute += "#";
    }
    console.log(raute);
    raute = "";
}
//6b
let anfang = 1;
let ende = 100;
fizzbuzz(anfang, ende);
function fizzbuzz(anfangb, endeb) {
    for (let i = anfangb; i < endeb + 1; i++) {
        if (i % 3 == 0) {
            console.log("Fizz");
        }
        else if (i % 5 == 0 && i % 3 != 0) {
            console.log("Buzz");
        }
        else {
            console.log(i);
        }
    }
}
//6c
fizzbuzz2(anfang, ende);
function fizzbuzz2(anfangb, endeb) {
    for (let i = anfangb; i < endeb + 1; i++) {
        if (i % 5 == 0 && i % 3 == 0) {
            console.log("FizzBuzz");
        }
        else if (i % 5 == 0 && i % 3 != 0) {
            console.log("Buzz");
        }
        else if (i % 3 == 0) {
            console.log("fizz");
        }
        else {
            console.log(i);
        }
    }
}
//6d+e
let schachbrettlänge = 8;
let rauten = "";
schachbrett(schachbrettlänge - 1);
function schachbrett(schachbrettgröße) {
    for (let x = 0; x < schachbrettgröße + 1; x++) {
        for (let e = 0; e < schachbrettgröße + 1; e++) {
            if (x == 0 || x % 2 == 0) {
                if (e % 2 == 0 && e != schachbrettgröße || e == 0) {
                    rauten += " ";
                }
                else if (e % 2 != 0 && e != schachbrettgröße || e == 1) {
                    rauten += "#";
                }
                else {
                    rauten += "\n";
                }
            }
            else if (x == 1 || x % 2 != 0) {
                if (e % 2 == 0 && e != schachbrettgröße || e == 0) {
                    rauten += "#";
                }
                else if (e % 2 != 0 && e != schachbrettgröße || e == 1) {
                    rauten += " ";
                }
                else {
                    rauten += "\n";
                }
            }
        }
    }
    console.log(rauten);
}
//# sourceMappingURL=script.js.map