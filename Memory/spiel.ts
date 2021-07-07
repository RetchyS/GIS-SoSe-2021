namespace Memory {
    //Karte
    let kartenbild = document.createElement("img");
    kartenbild.addEventListener("click", match);
    let kartensrc = document.createAttribute("src");
    let kartenid = document.createAttribute("id");



    //-----------------Admin---------------
    let buttonspeichern: HTMLButtonElement = <HTMLButtonElement>document.getElementById("datenspeichern");
    buttonspeichern.addEventListener("click", bildspeichern);

    let antwort: HTMLElement = document.getElementById("serverantwort");
    let bilderantwort: HTMLElement = document.getElementById("bilderantwort");
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


    //Karten für die Datenbank


    async function bildereinsehen(): Promise<void> {

        let formular: FormData = new FormData(document.forms[0]);


        let query: URLSearchParams = new URLSearchParams(<any>formular);
        let url: RequestInfo = "https://piikachu.herokuapp.com";
        url += "/abfragen";
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        let responsetext: Data[] = await response.json();
        console.log(responsetext.length);
        console.log(responsetext);

        for (let i: number = 0; i < responsetext.length; i++) {
            let kartendatenbank = document.createElement("img");
            let kartendiv = document.createElement("div");

            let kartendatenbanksrc = document.createAttribute("src");
            let kartendatenbankid = document.createAttribute("id");

            console.log(responsetext[i].Bilderlink);
            kartendatenbanksrc.value = responsetext[i].Bilderlink;
            kartendatenbankid.value = "card" + i;
            console.log(kartendatenbanksrc);

            kartendiv.setAttributeNode(kartendatenbankid);
            kartendatenbank.setAttributeNode(kartendatenbanksrc);
            bilderantwort.appendChild(kartendiv);
            kartendiv.appendChild(kartendatenbank);
            i++;
        }
    }

    interface Data {
        Object: string;
        Bildername: string;
        Bilderlink: string;
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