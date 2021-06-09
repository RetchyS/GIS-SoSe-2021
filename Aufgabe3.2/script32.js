"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe31Server = void 0;
const Http = require("http");
const Url = require("url");
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
    let antwort = document.getElementById("serverantwort");
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); // Serverlog
        //_response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            //Url muss man parsen um es bearbeiten zu. Genauso wie im Video gemacht aber es scheint als wäre es veraltet
            let url = Url.parse(_request.url, true);
            let path = url.pathname; // Pathname entweder /html oder /json
            if (path == "/json") {
                _response.setHeader("content-type", "application/json");
                let jsonstring = JSON.stringify(url.query);
                console.log(jsonstring); // Gibt das Object des JSOn in der Konsole aus
                _response.write(jsonstring);
            }
            if (path == "/html") {
                _response.setHeader("content-type", "text/html; charset=utf-8");
                for (let key in url.query) { //Iterieren von dem query der URL
                    _response.write(key + ":" + url.query[key]); // Schreib alles in die Response was gefunden wurde
                }
            }
        }
        _response.end();
    }
})(Aufgabe31Server = exports.Aufgabe31Server || (exports.Aufgabe31Server = {}));
//# sourceMappingURL=script32.js.map