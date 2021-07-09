"use strict";
var MemorySpiel;
(function (MemorySpiel) {
    //Karte
    let kartenbild = document.createElement("img");
    //------------Spiel-------------------------------------
    let buttonstart = document.getElementById("start");
    buttonstart.addEventListener("click", spielfeld);
    //Spielfeld generieren
    let randomzahl;
    let randomzahlen;
    let doppelwerte;
    let spielkartenarrayzahlen;
    //Spielkarten
    async function spielfeld() {
        let formular = new FormData(document.forms[0]);
        let bilderposi = "card";
        let query = new URLSearchParams(formular);
        let url = "https://piikachu.herokuapp.com";
        url += "/abfragen";
        url = url + "?" + query.toString();
        let responsetext;
        fetch(url).then(response => {
            console.log(response);
            return response.json();
        }).then(responsejson => {
            responsetext = responsejson;
            return responsetext;
        }).then(srcarray => {
            console.log(srcarray.length);
            console.log(srcarray);
            spielkartenarrayzahlen = randomindexarray(srcarray.length);
            kartenhinzufügen(srcarray, spielkartenarrayzahlen);
        });
    }
    function kartenhinzufügen(_response, _spielkartenzahlen) {
        for (let i = 0; i < 16; i++) {
            let kartendatenbank = document.createElement("img");
            let kartenclass = document.createAttribute("class");
            let kartendatenbanksrc = document.createAttribute("src");
            kartendatenbanksrc.value = _response[_spielkartenzahlen[i]].Bilderlink;
            kartenclass.value = "karte";
            console.log(kartendatenbanksrc);
            let kartendiv = document.getElementById("cardid" + i);
            kartendatenbank.setAttributeNode(kartendatenbanksrc);
            kartendiv.appendChild(kartendatenbank);
        }
    }
    function randomindexarray(_srcarray) {
        randomzahl = Math.floor((Math.random() * _srcarray) + 0);
        for (let x = 0; x < 8; x++) {
            doppelwerte = randomzahlen.includes(randomzahl);
            if (!doppelwerte) {
                randomzahlen.push(randomzahl);
                randomzahlen.push(randomzahl);
            }
            else {
                x--;
            }
        }
        return randomzahlen;
    }
})(MemorySpiel || (MemorySpiel = {}));
//# sourceMappingURL=spiel.js.map