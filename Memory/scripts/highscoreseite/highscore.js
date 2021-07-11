"use strict";
var MemoryHighscore;
(function (MemoryHighscore) {
    scoreeinsehen();
    let buttonname = document.getElementById("highscorespeichern");
    buttonname.addEventListener("click", speichern);
    let zeitscore = Number(localStorage.getItem("score"));
    console.log(zeitscore);
    let score = localStorage.getItem("zeit");
    let ergebnis = document.getElementById("ergebnis");
    ergebnis.innerHTML = "Benötigte Zeit: " + score;
    console.log(score);
    async function speichern() {
        let url = "https://piikachu.herokuapp.com";
        let formular = new FormData(document.forms[0]);
        let query = new URLSearchParams(formular);
        url += "/speichernhighscore";
        url = url + "?" + query.toString() + "&Zeit=" + zeitscore; // der Cast ist für die Mongodb
        if (score != null) {
            console.log(url);
            await fetch(url);
            localStorage.clear();
            location.reload();
        }
        else {
            ergebnis.innerHTML = "";
            ergebnis.innerHTML = "Kein Zeite vorhanden!";
        }
    }
    async function scoreeinsehen() {
        let url = "https://piikachu.herokuapp.com";
        url += "/highscoreabfragen";
        url = url + "?";
        console.log(url);
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
            for (let i = 0; i < 10; i++) {
                let spielername = document.getElementById("name" + i);
                let spielerscore = document.getElementById("punkte" + i);
                console.log(srcarray[i].Spielername);
                console.log(srcarray[i].Zeit);
                spielername.innerHTML = srcarray[i].Spielername;
                spielerscore.innerHTML = scoreumwandeln(srcarray[i].Zeit);
            }
        });
    }
    function scoreumwandeln(_score) {
        let score = Number(_score);
        let scoreminutes = score / 60;
        if (scoreminutes < 1) {
            scoreminutes = 0;
        }
        else {
            scoreminutes = Math.round(scoreminutes % 60);
        }
        let scoreseconds = score % 60;
        let zeitstring = scoreminutes.toString() + ":" + scoreseconds.toString();
        return zeitstring;
    }
})(MemoryHighscore || (MemoryHighscore = {}));
//# sourceMappingURL=highscore.js.map