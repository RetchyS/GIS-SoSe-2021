"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe31Server = void 0;
const Http = require("http");
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
    let query = new URLSearchParams(FormData); //any weil Javascript Formdata net kennt
    let url = "https://piikachu.herokuapp.com/";
    url = url + "?" + query.toString();
    let response = await fetch(url);
    let responsetext = await response.text(); // Serverantwort in Text kovertieren
    let antwort = document.getElementById("serverantwort");
    antwort.innerText = responsetext;
}
var Aufgabe31Server;
(function (Aufgabe31Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT); // Holt sich den Port aus dem User Environment. Rückgabe ist ein String und wird mit nem Cast zur Zahl
    if (!port) // Falls kein Port hinterlegt ist bzw. die Variable Port undefined ist                
        port = 8100;
    let server = Http.createServer(); // Server wird erstellt um listener hinzufügen zu können
    server.addListener("request", handleRequest); // Request/Anfragenhandler für den Server
    server.addListener("listening", handleListen); // Listenerhandler für den Server
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); // Serverlog
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
    }
})(Aufgabe31Server = exports.Aufgabe31Server || (exports.Aufgabe31Server = {}));
//# sourceMappingURL=script31.js.map