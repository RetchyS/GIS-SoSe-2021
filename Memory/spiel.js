"use strict";
var MemorySpiel;
(function (MemorySpiel) {
    //Match declares
    let imagename1;
    let imageid1;
    let imagecss1;
    let imagename2;
    let imageid2;
    let imagecss2;
    let bildcounter = 0;
    let imagecontainer1;
    let imagecontainer2;
    let spielpaareanzahl = 0;
    let movecounter = 0;
    //------------Spiel-------------------------------------
    let buttonstart = document.getElementById("start");
    buttonstart.addEventListener("click", spielfeld);
    //Spielfeld generieren
    let randomzahl;
    let randomzahlen = [0, 0, 0, 0, 0, 0, 0, 0]; //length 8
    let randomzahlenkopie = [0, 0, 0, 0, 0, 0, 0, 0]; //length 8
    let doppelwerte = false;
    let spielkartenarrayzahlen = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let totalSeconds = 0;
    //timer
    let minutesLabel = document.getElementById("minutes");
    let secondsLabel = document.getElementById("seconds");
    //Spielkarten
    /* function timer(): void {               //https://codepen.io/reynnor/pen/vmNaeM
        setInterval(setTime, 100000);

        function setTime(): void {
            ++totalSeconds;
            secondsLabel.innerHTML = pad((totalSeconds % 60).toString());
            minutesLabel.innerHTML = pad((totalSeconds / 60).toString());
        }

        function pad(_value: string): string {
            let valString: string = _value + "";
            if (valString.length < 2) {
                return "0" + valString;
            }
            else {
                return valString;
            }
        }
    } */
    //Match
    function bildmatch(_event) {
        let imagetarget = _event.target;
        bildcounter++;
        movecounter++;
        console.log(bildcounter);
        if (bildcounter == 1) {
            imagename1 = imagetarget.getAttribute("src");
            imageid1 = imagetarget.getAttribute("id");
            let containerid1;
            console.log(imageid1);
            if (imageid1.length == 6) {
                console.log("länge 7 =" + imageid1.substring(5, 6));
                containerid1 = "cardid" + imageid1.substr(5, 6);
                console.log(containerid1);
            }
            else {
                console.log("länge 7+ =" + imageid1.substring(5, 7));
                containerid1 = "cardid" + imageid1.substr(5, 7);
                console.log(containerid1);
            }
            imagecontainer1 = document.getElementById(containerid1);
            imagecss1 = document.getElementById(imageid1);
            imagecss1.style.opacity = "1.0";
        }
        console.log(bildcounter);
        if (bildcounter == 2) {
            imagename2 = imagetarget.getAttribute("src");
            imageid2 = imagetarget.getAttribute("id");
            let containerid2;
            if (imageid1.length == 6) {
                containerid2 = "cardid" + imageid2.substr(5, 6);
                console.log(containerid2);
            }
            else {
                containerid2 = "cardid" + imageid2.substr(5, 7);
                console.log(containerid2);
            }
            imagecontainer2 = document.getElementById(containerid2);
            imagecss2 = document.getElementById(imageid2);
            imagecss2.style.opacity = "1.0";
        }
        console.log(bildcounter);
        if (bildcounter == 2) {
            setTimeout(function () {
                if (imagename2 == imagename1) {
                    imagecss2.style.opacity = "0.0";
                    imagecss1.style.opacity = "0.0";
                    imagecontainer1.style.backgroundColor = "white";
                    imagecontainer2.style.backgroundColor = "white";
                    bildcounter = 0;
                    imagecss1.removeEventListener("click", bildmatch);
                    imagecss2.removeEventListener("click", bildmatch);
                    spielpaareanzahl++;
                    console.log(spielpaareanzahl);
                }
                else {
                    imagecss2.style.opacity = "0.0";
                    imagecss1.style.opacity = "0.0";
                    bildcounter = 0;
                }
            }, 1000);
        }
        if (spielpaareanzahl == 8) {
            localStorage.setItem("moves", movecounter.toString());
            console.log(localStorage.getItem("moves"));
            location.assign("https://retchys.github.io/GIS-SoSe-2021/Memory/highscore");
        }
    }
    async function spielfeld() {
        let formular = new FormData(document.forms[0]);
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
        //timer();
    }
    function kartenhinzufügen(_response, _spielkartenzahlen) {
        for (let i = 0; i < 16; i++) {
            let kartendatenbank = document.createElement("img");
            let kartenclass = document.createAttribute("class");
            let kartendatenbanksrc = document.createAttribute("src");
            let kartenid = document.createAttribute("id");
            kartendatenbanksrc.value = _response[_spielkartenzahlen[i]].Bilderlink;
            kartenid.value = "karte" + i;
            kartenclass.value = "karte";
            console.log(kartendatenbanksrc);
            let kartendiv = document.getElementById("cardid" + i);
            kartendatenbank.setAttributeNode(kartendatenbanksrc);
            kartendatenbank.setAttributeNode(kartenid);
            kartendatenbank.addEventListener("click", bildmatch);
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
        let currentIndex = _allezahlenpaare.length;
        let randomIndex;
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