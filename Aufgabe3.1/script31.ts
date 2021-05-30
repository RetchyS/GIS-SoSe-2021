import * as Http from "http";

export namespace Aufgabe31 {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);    // Holt sich den Port aus dem User Environment. Rückgabe ist ein String und wird mit nem Cast zur Zahl
    if (!port)                                      // Falls kein Port hinterlegt ist bzw. die Variable Port undefined ist                
        port = 8100;

    let server: Http.Server = Http.createServer();      // Server wird erstellt um listener hinzufügen zu können
    server.addListener("request", handleRequest);      // Request/Anfragenhandler für den Server
    server.addListener("listening", handleListen);     // Listenerhandler für den Server
    server.listen(port);

    function handleListen(): void {                     // Die Funktion von listener
        console.log("Listening");
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {      // Die funktion von Request
        console.log("I hear voices!");                  // Serverlog
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
    }


}
