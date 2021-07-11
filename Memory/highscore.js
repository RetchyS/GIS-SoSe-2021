"use strict";
var MemoryHighscore;
(function (MemoryHighscore) {
    scoreeinsehen();
    let buttonname = document.getElementById("highscorespeichern");
    buttonname.addEventListener("click", speichern);
    let score = localStorage.getItem("zeit");
    let ergebnis = document.getElementById("ergebnis");
    ergebnis.innerHTML = "Benötigte Zeit: " + score;
    async function speichern() {
        let url = "https://piikachu.herokuapp.com";
        let formular = new FormData(document.forms[0]);
        let query = new URLSearchParams(formular);
        url += "/speichernhighscore";
        url = url + "?" + query.toString() + "&Zeit=" + score;
        await fetch(url);
        localStorage.clear();
        location.reload();
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
                spielerscore.innerHTML = srcarray[i].Zeit;
            }
        });
        /* console.log(responsetext.length);
        console.log(responsetext); */
        /* for (let i: number = 0; i < 10; i++) {
    
            let spielername = document.getElementById("name" + i);
            let spielerscore = document.getElementById("punkt" + i);
    
            console.log(responsetext[i].spielername);
            console.log(responsetext[i].spielerscore);
            spielername.innerHTML = responsetext[i].spielername;
            spielerscore.innerHTML = responsetext[i].spielername;
    
        } */
    }
})(MemoryHighscore || (MemoryHighscore = {}));
//# sourceMappingURL=highscore.js.map