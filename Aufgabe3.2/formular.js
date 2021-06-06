"use strict";
// Damit der Button des Formulars die FormData function ausführt
let buttonhtml = document.getElementById("sendenHTML");
buttonhtml.addEventListener("click", formDataHTML);
let buttonjson = document.getElementById("sendenJSON");
buttonjson.addEventListener("click", formDataJSON);
//H1 Element für Serverantwort
let antwort = document.getElementById("serverantwort");
async function formDataHTML() {
    let formular = new FormData(document.forms[0]); // Holt sich die Information des ersten Formulars, in dem Fall 0, und packt es in die Variable formular
    for (let entry of formular) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }
    let query = new URLSearchParams(formular); //any weil Javascript Formdata net kennt
    let url = "https://piikachu.herokuapp.com/";
    //let url: RequestInfo = "http://127.0.0.1:5500/Aufgabe3.2/";
    url += "/html";
    url = url + "?" + query.toString();
    let response = await fetch(url);
    let responsetext = await response.text(); // Serverantwort in Text kovertieren
    antwort.innerText = responsetext;
}
async function formDataJSON() {
    let formular = new FormData(document.forms[0]);
    for (let entry of formular) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }
    let query = new URLSearchParams(formular);
    let url = "https://piikachu.herokuapp.com/";
    //let url: RequestInfo = "http://127.0.0.1:5500/Aufgabe3.2/";
    url += "/json";
    url = url + "?" + query.toString();
    let response = await fetch(url);
    let responsetext = await response.text(); // Serverantwort in Text kovertieren
    antwort.innerText = responsetext;
}
//# sourceMappingURL=formular.js.map