"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe34Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Aufgabe34Server;
(function (Aufgabe34Server) {
    let orders;
    let port = Number(process.env.PORT); // Holt sich den Port aus dem User Environment. Rückgabe ist ein String und wird mit nem Cast zur Zahl
    if (!port) // Falls kein Port hinterlegt ist bzw. die Variable Port undefined ist                
        port = 8001;
    let databaseUrl = "mongodb+srv://<Test>:<HpWagAcguk85HEcW>@piikachu.ai2p4.mongodb.net/Test?retryWrites=true&w=majority";
    //mongod://localhost:27017
    //mongodb+srv://<Test>:<HpWagAcguk85HEcW>@piikachu.ai2p4.mongodb.net/Test?retryWrites=true&w=majority
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        console.log("Starting server");
        let server = Http.createServer(); // Server wird erstellt um listener hinzufügen zu können
        server.addListener("request", handleRequest); // Request/Anfragenhandler für den Server
        server.addListener("listening", handleListen); // Listenerhandler für den Server
        server.listen(port);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Test").collection("Students");
        console.log("Database connection ", orders != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    //let antwort: HTMLElement = document.getElementById("serverantwort");
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); // Serverlog
        //_response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "application/json");
        if (_request.url) {
            //Url muss man parsen um es bearbeiten zu. Genauso wie im Video gemacht aber es scheint als wäre es veraltet
            let url = Url.parse(_request.url, true);
            let path = url.pathname; // Pathname entweder /html oder /json
            if (path == "/speichern") {
                let jsonstring = JSON.stringify(url.query);
                console.log(jsonstring);
                storeOrder(url.query);
            }
            if (path == "/abfragen") {
                console.log("Datenbank wird abgefragt");
                let jsonstring = JSON.stringify(orders.find());
                _response.write(jsonstring);
            }
        }
        _response.end();
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
})(Aufgabe34Server = exports.Aufgabe34Server || (exports.Aufgabe34Server = {}));
//# sourceMappingURL=server.js.map