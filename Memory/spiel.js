"use strict";
var MemorySpiel;
(function (MemorySpiel) {
    //Karte
    let kartenbild = document.createElement("img");
    //------------Spiel-------------------------------------
    let buttonstart = document.getElementById("start");
    buttonstart.addEventListener("click", spielfeld);
    //Spielfeld generieren
    //Spielkarten
    function kartenhinzufügen(_response) {
        let spielkarten;
        let spielkarte;
        let randomindex;
        let randomindexe;
        let doppel = false;
        for (let i = 0; i < 8; i++) {
            spielkarte = _response[i].Bilderlink;
            for (let x = 0; x < 8; x++) {
                if (spielkarten[x] != undefined) { //Für die leeren Stellen im Array, damit das übersprungen wird.
                    if (spielkarten[x] == spielkarte) { //geht durch die gespeicherten Spielkarten und schaut nach doppelten Karten
                        doppel = true; // Wenn Doppel, dann den zähler i reduzieren, da sonst zu wenig karten genommen werden
                        i--;
                    }
                }
            }
            if (!doppel) {
                spielkarten[i] = spielkarte;
                console.log(spielkarte);
            }
        }
        let counter;
        for (let i = 0; i < 16; i++) {
            randomindex = Math.floor((Math.random() * 8) + 0);
            for (let x = 0; x < 16; x++) {
                if (randomindexe[x] != undefined) {
                    if (randomindexe[x] == randomindex) {
                        counter++;
                    }
                }
            }
            if (counter > 2) {
                i--;
            }
            else {
                let kartendatenbank = document.createElement("img");
                let kartenclass = document.createAttribute("class");
                let kartendatenbanksrc = document.createAttribute("src");
                console.log(spielkarten[randomindex]);
                kartendatenbanksrc.value = spielkarten[randomindex];
                kartenclass.value = "karte";
                console.log(kartendatenbanksrc);
                let kartendiv = document.getElementById("cardid" + i);
                kartendatenbank.setAttributeNode(kartendatenbanksrc);
                kartendiv.appendChild(kartendatenbank);
            }
        }
    }
    async function spielfeld() {
        let formular = new FormData(document.forms[0]);
        let bilderposi = "card";
        let query = new URLSearchParams(formular);
        let url = "https://piikachu.herokuapp.com";
        url += "/abfragen";
        url = url + "?" + query.toString();
        let responsetext;
        fetch(url).then(response => {
            console.log(response);
            return response.json();
        }).then(responsejson => {
            responsetext = responsejson;
            return responsetext;
        }).then(srcarray => {
            console.log(srcarray.length);
            console.log(srcarray);
            kartenhinzufügen(srcarray);
        });
        /*  for (let i: number = 0; i < 16; i++) {
 
 
             let kartendatenbank = document.createElement("img");
             let kartenclass = document.createAttribute("class");
             let kartendatenbanksrc = document.createAttribute("src");
 
             let kartendatenbankid = document.createAttribute("id");
 
             console.log(responsetext[i].Bilderlink);
 
             kartendatenbanksrc.value = responsetext[i].Bilderlink;
             kartendatenbankid.value = "card" + i;
             kartenclass.value = "karte";
             console.log(kartendatenbanksrc);
             let kartendiv = document.getElementById(kartendatenbankid.value);
 
             kartendatenbank.setAttributeNode(kartendatenbanksrc);
 
             kartendiv.appendChild(kartendatenbank);
 
         } */
        //Auswahl der Karten
        /*  let spielkartensrc: Data[] =  responsetext;         //Die 8 Karten aus dem Datensatz werden ausgewählt und hier gespeichert
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
})(MemorySpiel || (MemorySpiel = {}));
//schaut nach einem match
function match() {
}
//# sourceMappingURL=spiel.js.map