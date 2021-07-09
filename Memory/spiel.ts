namespace MemorySpiel {
    //Karte
    let kartenbild = document.createElement("img");
    /*  kartenbild.addEventListener("click", match);
     let kartensrc = document.createAttribute("src");
     let kartenid = document.createAttribute("id"); */

    interface Data {
        Object: string;
        Bildername: string;
        Bilderlink: string;
    }




    //------------Spiel-------------------------------------
    let buttonstart: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
    buttonstart.addEventListener("click", spielfeld);

    //Spielfeld generieren

    //Spielkarten


    function kartenhinzufügen(_response: Data[]): void {
        let spielkarten: string[];
       
        let spielkarte: string;
        let randomindex: number;
        let randomindexe: number[];
        
        let doppel: boolean = false;

        for (let i: number = 0; i < 8; i++) {
            spielkarte = _response[i].Bilderlink;
            spielkarten[i] = spielkarte;
            
        }
        console.log(spielkarten);
        let counter: number;

        for (let i: number = 0; i < 16; i++) {
            
                let kartendatenbank = document.createElement("img");
                let kartenclass = document.createAttribute("class");
                let kartendatenbanksrc = document.createAttribute("src");


                

                kartendatenbanksrc.value = spielkarten[i];

                kartenclass.value = "karte";
                console.log(kartendatenbanksrc);
                let kartendiv = document.getElementById("cardid" + i);

                kartendatenbank.setAttributeNode(kartendatenbanksrc);

                kartendiv.appendChild(kartendatenbank);
            

        }

    }
    async function spielfeld(): Promise<void> {

        let formular: FormData = new FormData(document.forms[0]);
        let bilderposi: string = "card";

        let query: URLSearchParams = new URLSearchParams(<any>formular);
        let url: RequestInfo = "https://piikachu.herokuapp.com";
        url += "/abfragen";
        url = url + "?" + query.toString();

        let responsetext: Data[];
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
}























//schaut nach einem match
function match(): void {

}