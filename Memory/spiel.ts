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

//Serverrelavante Daten zur Abfrage

let url: RequestInfo = "https://piikachu.herokuapp.com";

async function kartedatenbank(): Promise <void> {
    url += "/suchen";
    let response: Response = await fetch(url);
    let responsetext: string = await response.text();
    console.log(responsetext);




}






















//schaut nach einem match
function  match(): void{

}