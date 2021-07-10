namespace MemorySpiel {
    interface Data {
        Object: string;
        Bildername: string;
        Bilderlink: string;
    }

    //Match declares
    let imagename1: string;
    let imageid1: string;
    let imagecss1: HTMLElement;
    let imagename2: string;
    let imageid2: string;
    let imagecss2: HTMLElement;
    let bildcounter: number = 0;
    let imagecontainer1: HTMLElement;
    let imagecontainer2: HTMLElement;
    let spielpaareanzahl: number = 0;
    let movecounter: number = 0;


    //------------Spiel-------------------------------------
    let buttonstart: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
    buttonstart.addEventListener("click", spielfeld);

    //Spielfeld generieren
    let randomzahl: number;
    let randomzahlen: number[] = [0, 0, 0, 0, 0, 0, 0, 0];          //length 8
    let randomzahlenkopie: number[] = [0, 0, 0, 0, 0, 0, 0, 0];    //length 8

    let doppelwerte: boolean = false;

    let spielkartenarrayzahlen: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let totalSeconds: number = 0;


    //timer
    let minutesLabel: HTMLElement = document.getElementById("minutes");
    let secondsLabel: HTMLElement = document.getElementById("seconds");


    //Spielkarten
    /* function timer(): void {               //https://codepen.io/reynnor/pen/vmNaeM
        setInterval(setTime, 100000);

        function setTime(): void {
            ++totalSeconds;
            secondsLabel.innerHTML = pad((totalSeconds % 60).toString());
            minutesLabel.innerHTML = pad((totalSeconds / 60).toString());
        }

        function pad(_value: string): string {
            let valString: string = _value + "";
            if (valString.length < 2) {
                return "0" + valString;
            }
            else {
                return valString;
            }
        }
    } */
    //Match
    function bildmatch(_event: Event): void {
        let imagetarget: HTMLImageElement = <HTMLImageElement>_event.target;
        bildcounter++;
        movecounter++;
        console.log(bildcounter);
        if (bildcounter == 1) {
            imagename1 = imagetarget.getAttribute("src");
            imageid1 = imagetarget.getAttribute("id");
            let containerid1: string;
            console.log(imageid1);
            if (imageid1.length == 6) {
                console.log("länge 7 =" + imageid1.substring(5, 6));
                containerid1 = "cardid" + imageid1.substr(5, 6);
                console.log(containerid1);
            } else {
                console.log("länge 7+ =" + imageid1.substring(5, 7));
                containerid1 = "cardid" + imageid1.substr(5, 7);
                console.log(containerid1);
            }


            imagecontainer1 = document.getElementById(containerid1);
            imagecss1 = document.getElementById(imageid1);
            imagecss1.style.opacity = "1.0";

        }
        console.log(bildcounter);
        if (bildcounter == 2) {
            imagename2 = imagetarget.getAttribute("src");
            imageid2 = imagetarget.getAttribute("id");
            let containerid2: string;
            if (imageid1.length == 6) {
                containerid2 = "cardid" + imageid2.substr(5, 6);
                console.log(containerid2);
            } else {
                containerid2 = "cardid" + imageid2.substr(5, 7);
                console.log(containerid2);
            }
            imagecontainer2 = document.getElementById(containerid2);
            imagecss2 = document.getElementById(imageid2);
            imagecss2.style.opacity = "1.0";
        }
        console.log(bildcounter);

        if (bildcounter == 2) {


            setTimeout(function (): void {
                if (imagename2 == imagename1) {
                    imagecss2.style.opacity = "0.0";
                    imagecss1.style.opacity = "0.0";
                    imagecontainer1.style.backgroundColor = "white";
                    imagecontainer2.style.backgroundColor = "white";
                    bildcounter = 0;
                    imagecss1.removeEventListener("click", bildmatch);
                    imagecss2.removeEventListener("click", bildmatch);
                    spielpaareanzahl++;
                    console.log(spielpaareanzahl);
                } else {
                    imagecss2.style.opacity = "0.0";
                    imagecss1.style.opacity = "0.0";
                    bildcounter = 0;
                }
            }, 
                       2000);
        }
        if (spielpaareanzahl == 8) {
            localStorage.setItem("moves", movecounter.toString());
            window.location.replace("https://retchys.github.io/GIS-SoSe-2021/Memory/highscore");
        }
    }

    async function spielfeld(): Promise<void> {

        let formular: FormData = new FormData(document.forms[0]);


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
        //timer();
    }

    function kartenhinzufügen(_response: Data[], _spielkartenzahlen: number[]): void {

        for (let i: number = 0; i < 16; i++) {

            let kartendatenbank: HTMLElement = document.createElement("img");
            let kartenclass  = document.createAttribute("class");
            let kartendatenbanksrc = document.createAttribute("src");
            let kartenid = document.createAttribute("id");
            kartendatenbanksrc.value = _response[_spielkartenzahlen[i]].Bilderlink;

            kartenid.value = "karte" + i;
            kartenclass.value = "karte";

            console.log(kartendatenbanksrc);
            let kartendiv: HTMLElement = document.getElementById("cardid" + i);

            kartendatenbank.setAttributeNode(kartendatenbanksrc);
            kartendatenbank.setAttributeNode(kartenid);
            kartendatenbank.addEventListener("click", bildmatch);

            kartendiv.appendChild(kartendatenbank);
        }



    }
    function randomindexarray(_srcarray: number): number[] {
        for (let x: number = 0; x < 8; x++) {
            randomzahl = Math.floor((Math.random() * _srcarray) + 0);
            doppelwerte = randomzahlen.includes(randomzahl);

            if (doppelwerte == false) {
                randomzahlen[x] = randomzahl;
                randomzahlenkopie[x] = randomzahl;
            }
            if (doppelwerte == true) {
                x--;
            }
            doppelwerte = false;
        }
        console.log("randomzahlen" + randomzahlen);
        console.log("randomzahlen" + randomzahlenkopie);
        let allezahlenpaare: number[] = randomzahlenkopie.concat(randomzahlen);
        console.log("randomindex " + allezahlenpaare);
        allezahlenpaare = shuffle(allezahlenpaare);

        return allezahlenpaare;
    }

    function shuffle(_allezahlenpaare: number[]): number[] {                 //  von https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex: number = _allezahlenpaare.length;
        let randomIndex: number;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor((Math.random() * currentIndex) + 0);
            currentIndex--;

            // And swap it with the current element.
            [_allezahlenpaare[currentIndex], _allezahlenpaare[randomIndex]] = [
                _allezahlenpaare[randomIndex], _allezahlenpaare[currentIndex]];
        }
        console.log("shuffle " + _allezahlenpaare);
        return _allezahlenpaare;
    }
}






















