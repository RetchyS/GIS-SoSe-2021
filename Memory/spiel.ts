namespace Memory {

//-----------------Admin---------------
let buttonspeichern: HTMLButtonElement = <HTMLButtonElement>document.getElementById("datenspeichern");
buttonspeichern.addEventListener("click", bildspeichern);
let antwort: HTMLElement = document.getElementById("serverantwort");






async function bildspeichern (): Promise <void> {
    let url: RequestInfo = "https://piikachu.herokuapp.com";
    let formular: FormData = new FormData(document.forms[0]);

    let query: URLSearchParams = new URLSearchParams(<any> formular);
    url += "/speichern";
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    if (response == undefined) {
        antwort.innerHTML = "Konnte nicht gespeichert werden";
    } else {
        antwort.innerHTML = "Angaben wurden gespeichert";
    }


}

async function bildereinsehen(): Promise<void> {     
                      
    let formular: FormData = new FormData(document.forms[0]);       


    let query: URLSearchParams = new URLSearchParams(<any> formular);    
    let url: RequestInfo = "https://piikachu.herokuapp.com";
    url += "/abfragen";
    url = url + "?" + query.toString();
    let response: Response = await fetch(url);
    let responsetext: string  = await response.text();    
    antwort.innerText = responsetext;

    //let responseJson: Data = JSON.parse(responsetext);
    //generateData(responseJson);
}



//------------Spiel-------------------------------------
//Karte
let kartenbild = document.createElement("img");
kartenbild.addEventListener("click", match);
let kartensrc = document.createAttribute("src");
let kartenid = document.createAttribute("id");
kartenbild.setAttributeNode(kartensrc);



//Spielfeld generieren
let aktuellekarte;
let cardid: string = "cardid";

function spielfeld(): void {
    for (let i: number = 0; i < 16; i++) { // 16 für die Kartenanzahl

        cardid += i;
        kartenid.value = cardid;
        kartenbild.setAttributeNode(kartenid);

        aktuellekarte = document.getElementById(cardid);

        kartedatenbank();           //SRC für die karte wird gesucht

        kartenbild.setAttributeNode(kartensrc);

        aktuellekarte.appendChild(kartenbild);
    }
}

//Serverdaten abfrage
async function kartedatenbank(): Promise <void> {
    let url: RequestInfo = "https://piikachu.herokuapp.com";
    url += "/suchen";
    let response: Response = await fetch(url);
    let responsetext: string = await response.text();
    console.log(responsetext);

}
}






















//schaut nach einem match
function  match(): void{

}