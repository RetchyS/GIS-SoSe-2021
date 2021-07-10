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



    //------------Spiel-------------------------------------
    let buttonstart: HTMLButtonElement = <HTMLButtonElement>document.getElementById("start");
    buttonstart.addEventListener("click", spielfeld);

    //Spielfeld generieren
    let randomzahl: number;
    let randomzahlen: number[] = [0, 0, 0, 0, 0, 0, 0, 0];          //length 8
    let randomzahlenkopie: number[] = [0, 0, 0, 0, 0, 0, 0, 0];    //length 8

    let doppelwerte: boolean = false;
    let spielen: boolean = true;
    let spielkartenarrayzahlen: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let totalSeconds: number = 0;


    //Spielkarten
    function timer(_spielen: boolean): void {               //https://codepen.io/reynnor/pen/vmNaeM
        let minutesLabel = document.getElementById("minutes");
        let secondsLabel = document.getElementById("seconds");

        if (_spielen) {


            setInterval(setTime, 1000000);

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
        } else {
            localStorage.setItem("BenötigteZeit", totalSeconds.toString());
            totalSeconds = 0;
            minutesLabel.innerHTML = "00";
            secondsLabel.innerHTML = "00";

        }
    }
    //Match

    function bildmatch(_event: Event): void {
        let imagetarget: HTMLImageElement = <HTMLImageElement>_event.target;
        bildcounter++;
        console.log(bildcounter);
        if (bildcounter == 1) {
            imagename1 = imagetarget.getAttribute("src");
            imageid1 = imagetarget.getAttribute("id");
            imagecontainer1 = document.getElementById("cardid" + imageid1);
            imagecss1 = document.getElementById(imageid1);
            imagecss1.style.opacity = "1.0";

        }
        console.log(bildcounter);
        if (bildcounter == 2) {
            imagename2 = imagetarget.getAttribute("src");
            imageid2 = imagetarget.getAttribute("id");
            imagecontainer2 = document.getElementById("cardid" + imageid2);
            imagecss2 = document.getElementById(imageid2);
            imagecss2.style.opacity = "1.0";
        }
        console.log(bildcounter);

        if (bildcounter == 2) {

            console.log("Es sind 3 sekunden verstrichen");
            setTimeout(function (): void {
                if (imagename2 == imagename1) {
                    imagecss2.style.opacity = "0.0";
                    imagecss1.style.opacity = "0.0";
                    imagecontainer1.style.backgroundImage = "white";
                    imagecontainer1.style.backgroundImage = "white";
                    bildcounter = 0;

                } else {
                    imagecss2.style.opacity = "0.0";
                    imagecss1.style.opacity = "0.0";
                    bildcounter = 0;
                }
            }, 3000);


            //localStorage.setItem("Bildersrc", imagename);


            //console.log(localStorage.getItem("Bildername"));
            //console.log(localStorage.getItem("Bildernummer"));




        }
    }


    async function spielfeld(): Promise<void> {
        timer(spielen);

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
            let kartenid = document.createAttribute("id");
            let kartendata = document.createAttribute("data-");
            kartendatenbanksrc.value = _response[_spielkartenzahlen[i]].Bilderlink;

            kartenid.value = "karte" + i;
            kartenclass.value = "karte";

            console.log(kartendatenbanksrc);
            let kartendiv = document.getElementById("cardid" + i);

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

    function shuffle(_allezahlenpaare: number[]) {                 //  von https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex: number = _allezahlenpaare.length, randomIndex;

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






















