"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe31 = void 0;
const Http = require("http");
var Aufgabe31;
(function (Aufgabe31) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
    }
})(Aufgabe31 = exports.Aufgabe31 || (exports.Aufgabe31 = {}));
//# sourceMappingURL=script31.js.map