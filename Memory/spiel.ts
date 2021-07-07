namespace Memory {
    //Karte
    let kartenbild = document.createElement("img");
    kartenbild.addEventListener("click", match);
    let kartensrc = document.createAttribute("src");
    let kartenid = document.createAttribute("id");
    kartenbild.setAttributeNode(kartensrc);
    

    //-----------------Admin---------------
    let buttonspeichern: HTMLButtonElement = <HTMLButtonElement>document.getElementById("datenspeichern");
    buttonspeichern.addEventListener("click", bildspeichern);
    let antwort: HTMLElement = document.getElementById("serverantwort");
    let buttonzeigen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("bilderzeigen");
    buttonzeigen.addEventListener("click", bildereinsehen);
    
    let bilderdata: Data = null;



    async function bildspeichern(): Promise<void> {
        let url: RequestInfo = "https://piikachu.herokuapp.com";
        let formular: FormData = new FormData(document.forms[0]);

        let query: URLSearchParams = new URLSearchParams(<any>formular);
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


        let query: URLSearchParams = new URLSearchParams(<any>formular);
        let url: RequestInfo = "https://piikachu.herokuapp.com";
        url += "/abfragen";
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        let responsetext: Data = await response.json();
        bilderdata = responsetext;
        for (let i: number = 0; i < bilderdata.namesrc.length; i++) {
            kartensrc.value = bilderdata.namesrc[i];
            kartenbild.setAttributeNode(kartensrc);
            antwort.appendChild(kartenbild);
        }
    }

    interface Data {
        name: string[];
        namesrc: string[];
    }


    //------------Spiel-------------------------------------

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
    async function kartedatenbank(): Promise<void> {
        let url: RequestInfo = "https://piikachu.herokuapp.com";
        url += "/suchen";
        let response: Response = await fetch(url);
        let responsetext: string = await response.text();
        console.log(responsetext);

    }
}






















//schaut nach einem match
function match(): void {

}