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
    let spielen = true;
    let spielkartenarrayzahlen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let totalSeconds = 0;
    //Spielkarten
    function timer(_spielen) {
        let minutesLabel = document.getElementById("minutes");
        let secondsLabel = document.getElementById("seconds");
        if (_spielen) {
            setInterval(setTime, 1000000);
            function setTime() {
                ++totalSeconds;
                secondsLabel.innerHTML = pad((totalSeconds % 60).toString());
                minutesLabel.innerHTML = pad((totalSeconds / 60).toString());
            }
            function pad(_value) {
                let valString = _value + "";
                if (valString.length < 2) {
                    return "0" + valString;
                }
                else {
                    return valString;
                }
            }
        }
        else {
            localStorage.setItem("BenötigteZeit", totalSeconds.toString());
            totalSeconds = 0;
            minutesLabel.innerHTML = "00";
            secondsLabel.innerHTML = "00";
        }
    }
    //Match
    let bildcounter = 0;
    function bildmatch(_event) {
        let imagetarget = _event.target;
        if (bildcounter == 0) {
            let imagename1 = imagetarget.getAttribute("src");
            bildcounter++;
        }
        if (bildcounter == 1) {
            let imagename2 = imagetarget.getAttribute("src");
        }
        localStorage.setItem("Bildersrc", imagename);
        //console.log(localStorage.getItem("Bildername"));
        //console.log(localStorage.getItem("Bildernummer"));
    }
    async function spielfeld() {
        timer(spielen);
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
            kartenclass.value = "karte ";
            kartenclass.value += "kartenpaar" + _spielkartenzahlen[i];
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
            if (doppelwerte == true) {
                x--;
            }
            doppelwerte = false;
        }
        console.log("randomzahlen" + randomzahlen);
        console.log("randomzahlen" + randomzahlenkopie);
        let allezahlenpaare = randomzahlenkopie.concat(randomzahlen);
        console.log("randomindex " + allezahlenpaare);
        allezahlenpaare = shuffle(allezahlenpaare);
        return allezahlenpaare;
    }
    function shuffle(_allezahlenpaare) {
        let currentIndex = _allezahlenpaare.length, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor((Math.random() * currentIndex) + 0);
            currentIndex--;
            // And swap it with the current element.
            [_allezahlenpaare[currentIndex], _allezahlenpaare[randomIndex]] = [
                _allezahlenpaare[randomIndex], _allezahlenpaare[currentIndex]
            ];
        }
        console.log("shuffle " + _allezahlenpaare);
        return _allezahlenpaare;
    }
})(MemorySpiel || (MemorySpiel = {}));
//# sourceMappingURL=spiel.js.map