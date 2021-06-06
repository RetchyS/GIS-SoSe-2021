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
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); // Serverlog
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        if (_request.url) {
            let url = Url.parse(_request.url, true); //Url muss man parsen um es bearbeiten zu
            let path = url.pathname; // Pathname entweder html oder json
            if (path == "/json") {
                let sentObject = JSON.stringify(url.query);
                console.log(sentObject); // Gibt das Object des JSOn in der Konsole aus
                _response.write(sentObject);
            }
            if (path == "/html") {
                for (let key in url.query) { //Iterieren von dem query der URL
                    _response.write(key + ":" + url.query[key]); // Schreib alles in die Response was gefunden wurde
                }
            }
        }
        _response.end();
    }
})(Aufgabe31Server = exports.Aufgabe31Server || (exports.Aufgabe31Server = {}));
//# sourceMappingURL=script32.js.map