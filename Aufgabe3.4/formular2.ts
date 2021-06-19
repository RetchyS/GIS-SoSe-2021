// Damit der Button des Formulars die FormData function ausführt
let buttonhtml: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendenHTML");
buttonhtml.addEventListener("click", formDataSpeichern);
let buttonjson: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendenJSON");
buttonjson.addEventListener("click", formDataJSON);

//H1 Element für Serverantwort
let antwort: HTMLElement = document.getElementById("serverantwort");

//Databaseurl
let databaseUrl: string = "mongodb+srv://<Test>:<HpWagAcguk85HEcW>@piikachu.ai2p4.mongodb.net/Test?retryWrites=true&w=majority";

async function formDataSpeichern(): Promise<void> {                        // Neue Funktion da await nur mit asyn funktioniert
    let formular: FormData = new FormData(document.forms[0]);       // Holt sich die Information des ersten Formulars, in dem Fall 0, und packt es in die Variable formular


    /*for (let entry of formular) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }*/

    let query: URLSearchParams = new URLSearchParams(<any> formular);    //any weil Javascript Formdata net kennt
    let url: RequestInfo = "https://piikachu.herokuapp.com";
    //let url: RequestInfo = "localhost:5000";
    url += "/speichern";
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    if (response == undefined) {
        antwort.innerHTML = "Konnte nicht gespeichert werden";
    } else {
        antwort.innerHTML = "Angaben wurden gespeichert";
    }
}

async function formDataJSON(): Promise<void> {                       
    let formular: FormData = new FormData(document.forms[0]);       

    /*for (let entry of formular) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }*/

    let query: URLSearchParams = new URLSearchParams(<any> formular);    
    let url: RequestInfo = "https://piikachu.herokuapp.com";
    //let url: RequestInfo = "http://127.0.0.1:5500/Aufgabe3.2/";
    url += "/abfragen";
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    let responsetext: string  = await response.json();    // Serverantwort in Text kovertieren
    antwort.innerText = responsetext;

    //let responseJson: Data = JSON.parse(responsetext);
    //generateData(responseJson);
}

function generateData(_responsejson: Data): void {
    console.log(_responsejson.vorname);
    console.log(_responsejson.nachname);
    console.log(_responsejson.email);
    console.log(_responsejson.nachricht);
}

interface Data {
    vorname: string;
    nachname: string;
    email: string;
    nachricht: string;
}