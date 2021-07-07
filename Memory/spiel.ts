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
        antwort.innerHTML = "";
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

        bilderantwort.innerHTML = "";

        for (let i: number = 0; i < responsetext.length; i++) {
            let kartendatenbank = document.createElement("img");
            let kartendiv = document.createElement("div");
            let kartenclass = document.createAttribute("class");

            let kartendatenbanksrc = document.createAttribute("src");
            let kartendatenbankid = document.createAttribute("id");

            console.log(responsetext[i].Bilderlink);
            kartendatenbanksrc.value = responsetext[i].Bilderlink;
            kartendatenbankid.value = "card" + i;
            kartenclass.value = "kartencontainer";
            console.log(kartendatenbanksrc);

            kartendiv.setAttributeNode(kartendatenbankid);
            kartendiv.setAttributeNode(kartenclass);
            kartendatenbank.setAttributeNode(kartendatenbanksrc);

            bilderantwort.appendChild(kartendiv);
            kartendiv.appendChild(kartendatenbank);

        }
    }

    interface Data {
        Object: string;
        Bildername: string;
        Bilderlink: string;
    }


    //------------Spiel-------------------------------------
    let buttonstart: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
    buttonstart.addEventListener("click", spielfeld);
    //Spielfeld generieren
    async function spielfeld(): Promise<void> {

        let formular: FormData = new FormData(document.forms[0]);
        let bilderposi: string = "card";

        let query: URLSearchParams = new URLSearchParams(<any>formular);
        let url: RequestInfo = "https://piikachu.herokuapp.com";
        url += "/abfragen";
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        let responsetext: Data[] = await response.json();
        console.log(responsetext.length);
        console.log(responsetext);

        //Auswahl der Karten
        let duplicatezwei: string[] = null;
        let spielkartensrc: string[] = null;         //Die 8 Karten aus dem Datensatz werden ausgewählt und hier gespeichert
        let duplicatenumber: number = 0;            //Keiner der 8 dürfen gleich sein
        let randomindex: number = 0;
        for (let x: number = 0; x < 8; x++) {
            randomindex = Math.floor((Math.random() * responsetext.length) + 0);
            let srcstring: string = responsetext[randomindex].Bilderlink;

            spielkartensrc.forEach(srcstring => {
                duplicatenumber++;
            });

            if (duplicatenumber < 2) {

                spielkartensrc.push(srcstring);

                duplicatenumber = 0;

            }
        }

        //Karten hinzufügen
        let counterzwei: number = 0;
        for (let i: number = 0; i < 16; i++) { // 16 für die Kartenanzahl

            bilderposi += i;
            randomindex = Math.floor((Math.random() * 7) + 0); //7 da 0 dazu zählt, für 8 verschiedene karten
            let src: string = spielkartensrc[randomindex];
            duplicatezwei.push(src);
            duplicatezwei.forEach(src => {
                counterzwei++;
            });
            if (counterzwei < 3) {
                kartehinzufügen(src, bilderposi);
                counterzwei = 0;
            }
        }
    }
    function kartehinzufügen(_src: string, _bilderposi: string): void {
        let img = document.createElement("img");
        let imgcontainer = document.getElementById(_bilderposi);
        let imgsrc = document.createAttribute("src");

        imgsrc.value = _src;
        img.setAttributeNode(imgsrc);

        imgcontainer.appendChild(img);



    }

}






















//schaut nach einem match
function match(): void {

}