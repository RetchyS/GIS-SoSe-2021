"use strict";
// Damit der Button des Formulars die FormData function ausführt
let button = document.getElementById("senden");
button.addEventListener("click", formData);
async function formData() {
    let formular = new FormData(document.forms[0]); // Holt sich die Information des ersten Formulars, in dem Fall 0, und packt es in die Variable formular
    for (let entry of formular) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }
    let query = new URLSearchParams(formular); //any weil Javascript Formdata net kennt
    let url = "https://piikachu.herokuapp.com/";
    url = url + "?" + query.toString();
    let response = await fetch(url);
    let responsetext = await response.text(); // Serverantwort in Text kovertieren
    let antwort = document.getElementById("serverantwort");
    antwort.innerText = responsetext;
}
//# sourceMappingURL=formular.js.map