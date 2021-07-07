"use strict";
//-----------------Admin---------------
let buttonspeichern = document.getElementById("datenspeichern");
buttonspeichern.addEventListener("click", bildspeichern);
let antwort = document.getElementById("serverantwort");
let bilderantwort = document.getElementById("bilderantwort");
let buttonzeigen = document.getElementById("bilderzeigen");
buttonzeigen.addEventListener("click", bildereinsehen);
async function bildspeichern() {
    let url = "https://piikachu.herokuapp.com";
    let formular = new FormData(document.forms[0]);
    let query = new URLSearchParams(formular);
    url += "/speichern";
    url = url + "?" + query.toString();
    let response = await fetch(url);
    antwort.innerHTML = "";
    if (response == undefined) {
        antwort.innerHTML = "Konnte nicht gespeichert werden";
    }
    else {
        antwort.innerHTML = "Angaben wurden gespeichert";
    }
}
//Karten für die Datenbank
async function bildereinsehen() {
    let formular = new FormData(document.forms[0]);
    let query = new URLSearchParams(formular);
    let url = "https://piikachu.herokuapp.com";
    url += "/abfragen";
    url = url + "?" + query.toString();
    let response = await fetch(url);
    let responsetext = await response.json();
    console.log(responsetext.length);
    console.log(responsetext);
    bilderantwort.innerHTML = "";
    for (let i = 0; i < responsetext.length; i++) {
        let kartendatenbank = document.createElement("img");
        let kartendiv = document.createElement("div");
        let kartenclass = document.createAttribute("class");
        let kartendatenbanksrc = document.createAttribute("src");
        let kartendatenbankid = document.createAttribute("id");
        console.log(responsetext[i].Bilderlink);
        kartendatenbanksrc.value = responsetext[i].Bilderlink;
        kartendatenbankid.value = "card" + i;
        kartenclass.value = "kartencontainer";
        console.log(kartendatenbanksrc);
        kartendiv.setAttributeNode(kartendatenbankid);
        kartendiv.setAttributeNode(kartenclass);
        kartendatenbank.setAttributeNode(kartendatenbanksrc);
        bilderantwort.appendChild(kartendiv);
        kartendiv.appendChild(kartendatenbank);
    }
}
//# sourceMappingURL=admin.js.map