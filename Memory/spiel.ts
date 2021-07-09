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
    let randomzahlen: number[] = [0, 0, 0, 0, 0, 0, 0, 0];          //length 8
    let randomzahlenkopie: number[] = [0, 0, 0, 0, 0, 0, 0, 0];    //length 8

    let doppelwerte: boolean = false;

    let spielkartenarrayzahlen: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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

    function kartenhinzufügen(_response: Data[], _spielkartenzahlen: number[]): void {

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
    function randomindexarray(_srcarray: number): number[] {


        for (let x: number = 0; x < 8; x++) {
            randomzahl = Math.floor((Math.random() * _srcarray) + 1);
            doppelwerte = randomzahlen.includes(randomzahl);

            if (doppelwerte == false) {
                randomzahlen[x] = randomzahl;
                randomzahlenkopie[x] = randomzahl;
            }
            doppelwerte = false;
        }
        let allezahlenpaare: number[] = randomzahlenkopie.concat(randomzahlen);
        console.log("randomindex " + allezahlenpaare);
        allezahlenpaare = shuffle(allezahlenpaare);
       
        return allezahlenpaare;
    }

    function shuffle (_allezahlenpaare: number[]) {                 //  von https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex: number = _allezahlenpaare.length, randomIndex;

        // While there remain elements to shuffle...
        while (0 <= currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [_allezahlenpaare[currentIndex], _allezahlenpaare[randomIndex]] = [
                _allezahlenpaare[randomIndex], _allezahlenpaare[currentIndex]];
        }
        console.log("shuffle " + _allezahlenpaare);
        return _allezahlenpaare;
    }
}






















