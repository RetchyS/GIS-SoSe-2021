
    //-----------------Admin---------------
    let buttonspeichern: HTMLButtonElement = <HTMLButtonElement>document.getElementById("datenspeichern");
    buttonspeichern.addEventListener("click", bildspeichern);

    let antwort: HTMLElement = document.getElementById("serverantwort");
    let bilderantwort: HTMLElement = document.getElementById("bilderantwort");
    let buttonzeigen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("bilderzeigen");
    buttonzeigen.addEventListener("click", bildereinsehen);

    



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
        console.log(url);
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