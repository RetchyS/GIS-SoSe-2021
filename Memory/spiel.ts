namespace Memory {
    //Karte
    let kartenbild = document.createElement("img");
    kartenbild.addEventListener("click", match);
    let kartensrc = document.createAttribute("src");
    let kartenid = document.createAttribute("id");





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
        let spielkartensrc: string[];         //Die 8 Karten aus dem Datensatz werden ausgewählt und hier gespeichert
        let benutzterindex: number[];
        let randomindex: number = 0;
        let doppel: boolean = false;

        for (let x: number = 0; x < 8; x++) {
            randomindex = Math.floor((Math.random() * responsetext.length) + 0);
            for (let i: number = 0; i < benutzterindex.length; i++) {
                if (benutzterindex[i] == randomindex ) {
                    doppel = true;
                    x--;                        //Bei doppelt, die for-schleife wird um eins verringert, da es sonst zu wenig karten wäre
                }
            }
            if (!doppel) {
                spielkartensrc[x] = responsetext[randomindex].Bilderlink;
            } else {
                doppel = false;
            }     
        }
        console.log(benutzterindex);

        console.log(spielkartensrc);
        /* //Karten hinzufügen
        let benutztekarten: number[];
        let counterzwei: number = 0;
        for (let i: number = 0; i < 16; i++) { // 16 für die Kartenanzahl
            bilderposi += i;
            randomindex = Math.floor((Math.random() * 7) + 0); //7 da 0 dazu zählt, für 8 verschiedene karten
            benutztekarten.push(randomindex);
            benutztekarten.forEach(countindex => {
                countindex = randomindex;
                counterzwei++;

            });

            let src: string = spielkartensrc[randomindex];

            if (counterzwei < 3) {
                kartehinzufügen(src, bilderposi);
                counterzwei = 0;
            } else {
                i--;
            }
        } */
    }
    function kartehinzufügen(_src: string, _bilderposi: string): void {
        let img = document.createElement("img");
        let imgcontainer = document.getElementById(_bilderposi);
        let imgsrc = document.createAttribute("src");

        imgsrc.value = _src;
        img.setAttributeNode(imgsrc);

        imgcontainer.appendChild(img);



    }
    function kartenaussuche(_karten: Data[]){

    }

}
interface Data {
    Object: string;
    Bildername: string;
    Bilderlink: string;
}






















//schaut nach einem match
function match(): void {

}