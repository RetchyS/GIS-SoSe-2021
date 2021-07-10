"use strict";
scoreeinsehen();
let buttonname = document.getElementById("highscorespeichern");
buttonname.addEventListener("click", speichern);
let score = Number(localStorage.getItem("zeit"));
async function speichern() {
    let url = "https://piikachu.herokuapp.com";
    let formular = new FormData(document.forms[0]);
    let query = new URLSearchParams(formular);
    url += "/speichernhighscore";
    url = url + "?" + query.toString() + "&score=" + score;
    await fetch(url);
    location.reload();
}
async function scoreeinsehen() {
    let formular = new FormData(document.forms[0]);
    let query = new URLSearchParams(formular);
    let url = "https://piikachu.herokuapp.com";
    url += "//highscoreabfragen";
    url = url + "?" + query.toString();
    console.log(url);
    let response = await fetch(url);
    let responsetext = await response.json();
    console.log(responsetext.length);
    console.log(responsetext);
    for (let i = 0; i < 10; i++) {
        let spielername = document.getElementById("name" + i);
        let spielerscore = document.getElementById("punkt" + i);
        console.log(responsetext[i].spielername);
        console.log(responsetext[i].spielerscore);
        spielername.innerHTML = responsetext[i].spielername;
        spielerscore.innerHTML = responsetext[i].spielername;
    }
}
//# sourceMappingURL=highscore.js.map