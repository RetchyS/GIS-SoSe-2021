
// Damit der Button des Formulars die FormData function ausführt
let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("senden");
button.addEventListener("click", formData);

async function formData(): Promise<void> {                        // Neue Funktion da await nur mit asyn funktioniert
    let formular: FormData = new FormData(document.forms[0]);       // Holt sich die Information des ersten Formulars, in dem Fall 0, und packt es in die Variable formular

    for (let entry of formular) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }

    let query: URLSearchParams = new URLSearchParams(<any> formular);    //any weil Javascript Formdata net kennt
    let url: RequestInfo = "https://piikachu.herokuapp.com/";
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    let responsetext: string = await response.text();       // Serverantwort in Text kovertieren
    let antwort: HTMLElement = document.getElementById("serverantwort");
    antwort.innerText = responsetext;
}