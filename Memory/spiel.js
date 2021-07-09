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
    let randomzahlen = [0, 0, 0, 0, 0, 0, 0, 0]; //length 8
    let randomzahlenkopie = [0, 0, 0, 0, 0, 0, 0, 0]; //length 8
    let doppelwerte = false;
    let spielkartenarrayzahlen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
        for (let x = 0; x < 8; x++) {
            randomzahl = Math.floor((Math.random() * _srcarray) + 0);
            doppelwerte = randomzahlen.includes(randomzahl);
            if (doppelwerte == false) {
                randomzahlen[x] = randomzahl;
                randomzahlenkopie[x] = randomzahl;
            }
            doppelwerte = false;
        }
        let allezahlenpaare = randomzahlenkopie.concat(randomzahlen);
        allezahlenpaare = shuffle(allezahlenpaare);
        return allezahlenpaare;
    }
    function shuffle(_allezahlenpaare) {
        let currentIndex = _allezahlenpaare.length, randomIndex;
        // While there remain elements to shuffle...
        while (0 != currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [_allezahlenpaare[currentIndex], _allezahlenpaare[randomIndex]] = [
                _allezahlenpaare[randomIndex], _allezahlenpaare[currentIndex]
            ];
        }
        return _allezahlenpaare;
    }
})(MemorySpiel || (MemorySpiel = {}));
//# sourceMappingURL=spiel.js.map