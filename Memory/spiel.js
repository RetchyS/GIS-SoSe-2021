"use strict";
var Memory;
(function (Memory) {
    //Karte
    let kartenbild = document.createElement("img");
    //------------Spiel-------------------------------------
    let buttonstart = document.getElementById("start");
    buttonstart.addEventListener("click", spielfeld);
    //Spielfeld generieren
    //Spielkarten
    async function spielfeld() {
        let formular = new FormData(document.forms[0]);
        let bilderposi = "card";
        let spielkartensrc;
        let query = new URLSearchParams(formular);
        let url = "https://piikachu.herokuapp.com";
        url += "/abfragen";
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let responsetext = await response.json();
        let randomindex = Math.floor((Math.random() * responsetext.length) + 0);
        let karte1 = responsetext[randomindex].Bilderlink;
        console.log(karte1);
        console.log(responsetext.length);
        console.log(responsetext);
        //Auswahl der Karten
        /* let spielkartensrc: Data[] =  responsetext;         //Die 8 Karten aus dem Datensatz werden ausgewählt und hier gespeichert
        spielkartensrc.length = 7;
        let benutzterindex: number[] = null;
        benutzterindex.length = 7;
        let randomindex: number = 0;
        let doppel: boolean = false;
        if (response != undefined) {
            for (let x: number = 0; x < 8; x++) {
                randomindex = Math.floor((Math.random() * responsetext.length) + 0);
                spielkartensrc[x].Bilderlink = responsetext[randomindex].Bilderlink;

            }
            console.log(benutzterindex);

            console.log(spielkartensrc);




        } */
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
    /*    function kartehinzufügen(_src: string, _bilderposi: string): void {
           let img = document.createElement("img");
           let imgcontainer = document.getElementById(_bilderposi);
           let imgsrc = document.createAttribute("src");
   
           imgsrc.value = _src;
           img.setAttributeNode(imgsrc);
   
           imgcontainer.appendChild(img);
   
   
   
       }
       function kartenaussuche(_karten: Data[]) {
   
       }
    */
})(Memory || (Memory = {}));
//schaut nach einem match
function match() {
}
//# sourceMappingURL=spiel.js.map