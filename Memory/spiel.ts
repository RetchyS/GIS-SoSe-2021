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
    let randomzahl: number;
    let randomzahlen: number[];
    let doppelwerte: boolean;

    let spielkartenarrayzahlen: number [];
    //Spielkarten
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
            spielkartenarrayzahlen = randomindexarray(srcarray.length);
            kartenhinzufügen(srcarray, spielkartenarrayzahlen);
        });
    }

    function kartenhinzufügen(_response: Data[], _spielkartenzahlen: number []): void {

        for (let i: number = 0; i < 16; i++) {

            let kartendatenbank = document.createElement("img");
            let kartenclass = document.createAttribute("class");
            let kartendatenbanksrc = document.createAttribute("src");




            kartendatenbanksrc.value = _response[_spielkartenzahlen[i]].Bilderlink;

            kartenclass.value = "karte";
            console.log(kartendatenbanksrc);
            let kartendiv = document.getElementById("cardid" + i);

            kartendatenbank.setAttributeNode(kartendatenbanksrc);

            kartendiv.appendChild(kartendatenbank);


        }

    }
    function randomindexarray(_srcarray: number): number [] {
        randomzahl = Math.floor((Math.random() * _srcarray) + 0);


        for (let x: number = 0; x < 8; x++) {
            doppelwerte = randomzahlen.includes(randomzahl);
            if (!doppelwerte) {
                randomzahlen.push(randomzahl);
                randomzahlen.push(randomzahl);
            } else {
                x--;
            }
        }
        return randomzahlen;
    }
}






















