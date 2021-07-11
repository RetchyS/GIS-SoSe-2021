namespace MemoryHighscore {

    scoreeinsehen();
    let buttonname: HTMLElement = document.getElementById("highscorespeichern");
    buttonname.addEventListener("click", speichern);


    interface Data {
        Object: string;
        Spielername: string;
        Zeit: string;
    }

    let score: string = localStorage.getItem("zeit");
    let ergebnis: HTMLElement = document.getElementById("ergebnis");
    ergebnis.innerHTML = "Benötigte Zeit: " + score;
    console.log(score);

    async function speichern(): Promise<void> {
        let url: RequestInfo = "https://piikachu.herokuapp.com";
        let formular: FormData = new FormData(document.forms[0]);

        let query: URLSearchParams = new URLSearchParams(<any>formular);
        url += "/speichernhighscore";
        url = url + "?" + query.toString() + "&Zeit=" + score;
        if (score != null) {
        console.log(url);
        await fetch(url);
        localStorage.clear();
        location.reload();
        } else {
            ergebnis.innerHTML = "";
            ergebnis.innerHTML = "Kein Zeite vorhanden!";
        }
    }

    async function scoreeinsehen(): Promise<void> {

        let url: RequestInfo = "https://piikachu.herokuapp.com";
        url += "/highscoreabfragen";
        url = url + "?";
        console.log(url);
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
            for (let i: number = 0; i < 10; i++) {

                let spielername = document.getElementById("name" + i);
                let spielerscore = document.getElementById("punkte" + i);

                console.log(srcarray[i].Spielername);
                console.log(srcarray[i].Zeit);
                spielername.innerHTML = srcarray[i].Spielername;
                spielerscore.innerHTML = srcarray[i].Zeit;

            }
        });
    }
}