"use strict";
// Aufgabe 1a
// Frage war mir nicht ganz ersichtlich. Mehrere Übergabeparameter entgegen nimmt? Array oder einzelne Werte?
let _testArray = [3, 4, 5, 7, 2, -10, 8, 1];
console.log(min(_testArray));
function min(_x) {
    let _min = _x[0]; // Mit irgendeinem Wert im Array anfangen
    for (let _i = 0; _i < _x.length; _i++) { // Array wird durchsucht
        if (_x[_i] < _min) { // Vergleicht zahlen im Array
            _min = _x[_i];
        }
    }
    return _min;
}
//Aufgabe 1b
console.log(isEven(50));
console.log(isEven(75));
function isEven(_x) {
    _x = Math.abs(_x); // Vorzeichen wird quasi "entfernt". Lösung für zahlen mit Minus-Vorzeichen
    if (_x == 0) {
        return true;
    }
    if (_x == 1) {
        return false;
    }
    return isEven(_x - 2); // Um 50 oder 75 auf die Zahlen 0 und/oder 1 zu reduzieren. Rekursion is kacke :P
}
let student1 = { name: "Karl", studiengang: "OMB", matrikelnr: 20222 };
let student2 = { name: "Lara", studiengang: "MKB", matrikelnr: 17222 };
let student3 = { name: "Stefan", studiengang: "MIB", matrikelnr: 24222 };
let studentArray = [student1, student2, student3];
console.log("Arraylänge vor push " + studentArray.length);
studentArray.push({ name: "Thonmas", studiengang: "OMB", matrikelnr: 265333 });
console.log("Arraylänge nach push " + studentArray.length);
console.log(studentArray[0].name);
console.log(studentArray[1].matrikelnr);
console.log(studentArray[2].studiengang);
showInfo("Karl");
showInfo("Lara");
showInfo("Stefan");
showInfo("Lars");
function showInfo(_name) {
    for (let _i = 0; _i < studentArray.length; _i++) {
        if (studentArray[_i].name == _name) {
            console.log(studentArray[_i].name + " " + studentArray[_i].studiengang + " " + studentArray[_i].matrikelnr);
            return;
        }
    }
    return console.log("Nichts gefunden");
}
//2a
let _arraybackwards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Array vor dem Umdrehen " + _arraybackwards);
backwards(_arraybackwards);
console.log("Array nach dem Umdrehen " + _arraybackwards);
function backwards(_array1) {
    let _schleifenlänge = _array1.length - 1;
    let _zwischenspeicher = 0;
    let _zwischenspeicher2 = 0;
    for (let _a = 0; _a < (_schleifenlänge / 2); _a++) {
        _zwischenspeicher = _array1[_a]; // Zwischenspeicher vor dem Umschreiben der Werte
        _zwischenspeicher2 = _array1[_schleifenlänge];
        _array1[_a] = _zwischenspeicher2; //Vertauscht den Ersten mit dem letzten Wert im Array
        _array1[_schleifenlänge] = _zwischenspeicher; //und Umgekehrt
        _schleifenlänge--;
    }
}
//2b
let _arrayjoin1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let _arrayjoin2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
join(_arrayjoin1, _arrayjoin2);
function join(_array1, _array2) {
    let _newarrayjoin = _array1.concat(_array2);
    console.log("Neues Array aus 2 Arrays " + _newarrayjoin);
}
//2c
let _arrayjoin3 = [1, 2, 3, 50, 5, 20, 7, 30, 9, 10];
split(_arrayjoin3, 3, 7);
function split(_arraysplit, _index1, _index2) {
    //Zur Consolenausgabe
    if ((_index1 >= 0) && (_index1 <= _arraysplit.length) && _index2 >= 0 && (_index2 <= _arraysplit.length)) { //Checkt ob Indexwerte kein Minusvorzeichen haben und ob die Werte nicht größer sind als die Arraylänge
        let _indexstart = null;
        let _indexende = null;
        if (_index1 < _index2) {
            _indexstart = _index1;
            _indexende = _index2;
        }
        else {
            _indexstart = _index2;
            _indexende = _index1;
        }
        for (let _a = _indexstart; _a < _indexende + 1; _a++) {
            console.log(_arraysplit[_a]); // Array zur Ausgabe wird gefüllt mit den Werten zwischen den Indexen
        }
    }
    else {
        console.log("Falsche Indexwerte");
    }
}
//3a
let canvas = document.getElementById("myFirstCanvas");
let context = canvas.getContext("2d");
// grüner boden + Wolken + Haus
//boden + Himmel
context.fillStyle = "#2E9AFE";
context.fillRect(0, 0, 500, 350);
context.fill();
context.fillStyle = "green";
context.fillRect(0, 200, 500, 350);
context.fill();
context.beginPath();
context.moveTo(0, 200);
context.quadraticCurveTo(250, 150, 500, 200);
context.strokeStyle = "green";
context.fillStyle = "green";
context.fill();
context.stroke();
// Wolke
context.beginPath();
context.moveTo(17, 8);
context.bezierCurveTo(13, 10, 13, 15, 23, 15);
context.bezierCurveTo(25, 18, 32, 18, 34, 15);
context.bezierCurveTo(42, 15, 42, 12, 39, 10);
context.bezierCurveTo(43, 4, 37, 3, 34, 5);
context.bezierCurveTo(32, 5, 25, 2, 25, 5);
context.bezierCurveTo(20, 5, 15, 2, 17, 8);
context.closePath();
context.fillStyle = "#8ED6FF";
context.fill();
context.strokeStyle = "#8ED6FF";
context.stroke();
//Haus
context.beginPath();
context.moveTo(250, 250);
context.lineTo(250, 150);
context.lineTo(325, 75);
context.lineTo(400, 150);
context.lineTo(400, 250);
context.lineTo(250, 250);
context.fillStyle = "red";
context.fill();
context.lineWidth = 5;
context.strokeStyle = "red";
context.stroke();
//3c
function createRect() {
    let _xPosi = Math.random() * 500;
    let _yPosi = Math.random() * 350;
    let _wWeite = Math.random() * (500 - _xPosi) + _xPosi;
    let _hHöhe = Math.random() * (350 - _yPosi) + _yPosi;
    let _rechteckrandom = { positionX: _xPosi, positionY: _yPosi, höhe: _hHöhe, breite: _wWeite };
    return _rechteckrandom;
}
function drawRect(_rechteckdraw) {
    context.fillRect(_rechteckdraw.positionX, _rechteckdraw.positionY, _rechteckdraw.breite, _rechteckdraw.höhe);
}
//zum testen von 3c+d
/*
drawRect(createRect());
drawRect(createRect());
drawRect(createRect());
drawRect(createRect());
*/
//3d
/*
let _arrayRect: Rechteck [] = [];
for ( let _i: number = 0; _i < 10; _i++) {          //Array größe 10
    _arrayRect.push(createRect());                  //Befüllt die Arrays mit Rechtecken
    drawRect(_arrayRect[_i]);                       //Gibt die Rechtecke aus

}
*/ 
//# sourceMappingURL=script.js.map