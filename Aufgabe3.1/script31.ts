import * as Http from "http";

// Damit der Button des Formulars die FormData function ausführt
let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("senden");
button.addEventListener("click", formData);

async function formData(): Promise<void> {                        // Neue Funktion da await nur mit asyn funktioniert
    let formular: FormData = new FormData(document.forms[0]); // Holt sich die Information des ersten Formulars, in dem Fall 0, und packt es in die Variable formular

    for (let entry of formular) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }

    let query: URLSearchParams = new URLSearchParams(<any>FormData);    //any weil Javascript Formdata net kennt
    let url: RequestInfo = "https://piikachu.herokuapp.com/";
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    let responsetext: string = await response.text();       // Serverantwort in Text kovertieren
    let antwort: HTMLElement = document.getElementById("serverantwort");
    antwort.innerText = responsetext;
}

export namespace Aufgabe31Server {
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
