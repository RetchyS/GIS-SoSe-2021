"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe31Server = void 0;
const Http = require("http");
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