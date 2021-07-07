"use strict";
var Memory;
(function (Memory) {
    //Karte
    let kartenbild = document.createElement("img");
    kartenbild.addEventListener("click", match);
    let kartensrc = document.createAttribute("src");
    let kartenid = document.createAttribute("id");
    kartenbild.setAttributeNode(kartensrc);
    //-----------------Admin---------------
    let buttonspeichern = document.getElementById("datenspeichern");
    buttonspeichern.addEventListener("click", bildspeichern);
    let antwort = document.getElementById("serverantwort");
    let bilderantwort = document.getElementById("bilderantwort");
    let buttonzeigen = document.getElementById("bilderzeigen");
    buttonzeigen.addEventListener("click", bildereinsehen);
    bilderantwort.addEventListener("click", bildereinsehen);
    let bilderdata = null;
    async function bildspeichern() {
        let url = "https://piikachu.herokuapp.com";
        let formular = new FormData(document.forms[0]);
        let query = new URLSearchParams(formular);
        url += "/speichern";
        url = url + "?" + query.toString();
        let response = await fetch(url);
        if (response == undefined) {
            antwort.innerHTML = "Konnte nicht gespeichert werden";
        }
        else {
            antwort.innerHTML = "Angaben wurden gespeichert";
        }
    }
    async function bildereinsehen() {
        let formular = new FormData(document.forms[0]);
        let query = new URLSearchParams(formular);
        let url = "https://piikachu.herokuapp.com";
        url += "/abfragen";
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let responsetext = await response.json();
        for (let i = 0; i < responsetext.length; i++) {
            console.log(responsetext[i].Bilderlink);
            kartensrc.value = responsetext[i].Bilderlink;
            kartenbild.setAttributeNode(kartensrc);
            antwort.appendChild(kartenbild);
            i++;
        }
    }
    //------------Spiel-------------------------------------
    //Spielfeld generieren
    let aktuellekarte;
    let cardid = "cardid";
    function spielfeld() {
        for (let i = 0; i < 16; i++) { // 16 für die Kartenanzahl
            cardid += i;
            kartenid.value = cardid;
            kartenbild.setAttributeNode(kartenid);
            aktuellekarte = document.getElementById(cardid);
            kartedatenbank(); //SRC für die karte wird gesucht
            kartenbild.setAttributeNode(kartensrc);
            aktuellekarte.appendChild(kartenbild);
        }
    }
    //Serverdaten abfrage
    async function kartedatenbank() {
        let url = "https://piikachu.herokuapp.com";
        url += "/suchen";
        let response = await fetch(url);
        let responsetext = await response.text();
        console.log(responsetext);
    }
})(Memory || (Memory = {}));
//schaut nach einem match
function match() {
}
//# sourceMappingURL=spiel.js.map