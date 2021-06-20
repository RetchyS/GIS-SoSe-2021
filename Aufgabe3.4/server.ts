import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Aufgabe34Server {


    interface Order {
        [type: string]: string | string[];
    }

    let orders: Mongo.Collection;


    let port: number = Number(process.env.PORT);    // Holt sich den Port aus dem User Environment. Rückgabe ist ein String und wird mit nem Cast zur Zahl
    if (!port)                                      // Falls kein Port hinterlegt ist bzw. die Variable Port undefined ist                
        port = 8001;
    let databaseUrl: string = "mongodb+srv://<Test>:<HpWagAcguk85HEcW>@piikachu.ai2p4.mongodb.net/Test?retryWrites=true&w=majority";
    //mongod://localhost:27017
    //mongodb+srv://<Test>:<HpWagAcguk85HEcW>@piikachu.ai2p4.mongodb.net/Test?retryWrites=true&w=majority
    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        console.log("Starting server");
        let server: Http.Server = Http.createServer();      // Server wird erstellt um listener hinzufügen zu können
        server.addListener("request", handleRequest);      // Request/Anfragenhandler für den Server
        server.addListener("listening", handleListen);     // Listenerhandler für den Server
        server.listen(port);
    }


    async function connectToDatabase(_url: string): Promise <void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Test").collection("Students");
        console.log("Database connection ", orders != undefined);
    }


    function handleListen(): void {                     // Die Funktion von listener
        console.log("Listening");
    }
    //let antwort: HTMLElement = document.getElementById("serverantwort");

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {      // Die funktion von Request
        console.log("I hear voices!");                                                                  // Serverlog
        //_response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "application/json");
        if (_request.url) {

            //Url muss man parsen um es bearbeiten zu. Genauso wie im Video gemacht aber es scheint als wäre es veraltet
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);


            let path: string = url.pathname; // Pathname entweder /html oder /json

            if (path == "/speichern") {
               
                let jsonstring: string = JSON.stringify(url.query);
                console.log(jsonstring);
                storeOrder(url.query);

            }

            if (path == "/abfragen") {
                console.log("Datenbank wird abgefragt");
                let jsonstring: string = JSON.stringify(orders.find());
                _response.write(jsonstring);

            }

        }
        _response.end();
    }
    function storeOrder(_order: Order): void {
        orders.insert(_order);
    }


}