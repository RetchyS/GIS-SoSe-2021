namespace TischMitPflanzex {


    //Interfaces
    interface Bilddata {

        imagepath: string;
        imagename: string;
        imagenummer: number;


    }
    interface PflanzemitTisch {
        pflanzen: Bilddata[];
        töpfe: Bilddata[];
        tische: Bilddata[];
    }
    interface ServerAntwort {
        error: string;
        message: string;
    }


    //JSON Data fetch Function
    let url: string = "https://retchys.github.io/GIS-SoSe-2021/Aufgabe2.4/data.json";
    let alleObjekte: PflanzemitTisch = null;
    let dataresponse: Response = null;

    async function fetchData(_url: string): Promise<void> {
    dataresponse = await fetch (_url);
    let datajson: PflanzemitTisch = await dataresponse.json();
    alleObjekte = datajson;
    }

    //Data fetch
    fetchData(url);


    //Aufgabe 2.5 3c
    let url3c: string = "https://gis-communication.herokuapp.com";
    async function fetchErrorMessage (_url: string) {

        let query: URLSearchParams = new URLSearchParams(localStorage);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        let serverantwort: ServerAntwort = await response.json();

        console.log(await fetch(_url));
        console.log(response);
        let antwort: HTMLElement = document.getElementById("anzeige");


        //Message
        if ( serverantwort.message != undefined) {
            antwort.textContent = serverantwort.message;
            antwort.classList.add("message");
        }

        //Error
        if ( serverantwort.error != undefined) {
            antwort.textContent = serverantwort.error;
            antwort.classList.add("error");
        }
   
    }


    //Header
    let header: HTMLElement = document.createElement("header");
    let headerid = document.createAttribute("id");
    headerid.value = "buttons";
    header.setAttributeNode(headerid);
    document.body.appendChild(header);

    //Main
    let main: HTMLElement = document.createElement("main");
    let mainid = document.createAttribute("id");
    mainid.value = "hauptmain";
    main.setAttributeNode(mainid);
    document.body.appendChild(main);

    //Buttons
    function createButtons(_buttonname: string): HTMLButtonElement {
        let li: HTMLButtonElement = document.createElement("button");
        let buttonid = document.createAttribute("id");
        buttonid.value = _buttonname;
        li.setAttributeNode(buttonid);
        li.textContent = _buttonname;
        // FUnktion hinzufügen
        return li;
    }

    //Funktionen für die Buttons on click. Damit die richtige Bilder angezeigt werden
    let pflanzenboolean: boolean = false;
    let tischboolean: boolean = false;
    let topfboolean: boolean = false;

    function pflanzenTrue(): void {

        pflanzenboolean = true;
        tischboolean = false;
        topfboolean = false;
    }
    function tischTrue(): void {
        pflanzenboolean = false;
        tischboolean = true;
        topfboolean = false;
    }
    function topfTrue(): void {
        pflanzenboolean = false;
        tischboolean = false;
        topfboolean = true;
    }

    //Buttons werden erstellt
    let buttonmenu: HTMLElement = document.querySelector("#buttons");   //#buttons = header
    buttonmenu.appendChild(createButtons("Pflanzen"));
    buttonmenu.appendChild(createButtons("Töpfe"));
    buttonmenu.appendChild(createButtons("Tische"));
    buttonmenu.appendChild(createButtons("ErgebnisAnzeigen"));

    //Eventlistener für die Buttons
    document.getElementById("Pflanzen").addEventListener("click", pflanzenTrue);
    document.getElementById("Pflanzen").addEventListener("click", createImageswithButton);
    document.getElementById("Tische").addEventListener("click", tischTrue);
    document.getElementById("Tische").addEventListener("click", createImageswithButton);
    document.getElementById("Töpfe").addEventListener("click", topfTrue);
    document.getElementById("Töpfe").addEventListener("click", createImageswithButton);
    document.getElementById("ErgebnisAnzeigen").addEventListener("click", endergebnis);



    //Überschrift

    //Div Conntainer für Imageoptionen
    let imgdiv = document.createElement("div");
    let imgDivId = document.createAttribute("id");
    imgDivId.value = "auswahlimages";
    imgdiv.setAttributeNode(imgDivId);
    let mainDivImages = document.querySelector("#hauptmain");
    mainDivImages.appendChild(imgdiv);
    let imgAuswahlDiv = document.querySelector("#auswahlimages");

    //Div Container für gewählte Images
    let imggewähltdiv = document.createElement("div");
    let imgDivId2 = document.createAttribute("id");
    imgDivId2.value = "ausgewählteimages";
    imggewähltdiv.setAttributeNode(imgDivId2);
    let mainDivImages2 = document.querySelector("#hauptmain");
    mainDivImages2.appendChild(imggewähltdiv);
    let imgAuswahlDiv2 = document.querySelector("#ausgewählteimages");


    //default Pictures



    //div Container für Endergebnis
    let divEndergebnis = document.createElement("div");
    let divEndergebnisID = document.createAttribute("id");


    divEndergebnisID.value = "ImagesEndergebnis";
    divEndergebnis.setAttributeNode(divEndergebnisID);
    divEndergebnis.style.width = "200px";
    divEndergebnis.style.display = "block";
    divEndergebnis.style.float = "left";

    mainDivImages.appendChild(divEndergebnis);
    let divEndergebnisselection = document.querySelector("#ImagesEndergebnis");



    //Funktion für Images kreieren
    function createImageswithButton(): void {
        document.getElementById("auswahlimages").innerHTML = "";
        for (let i: number = 0; i < alleObjekte.pflanzen.length; i++) {
            let image: HTMLImageElement = createImages(i);
            imgAuswahlDiv.appendChild(image);
        }
    }

    //Ausgewählte images aus dem Local Storage erstellen
    function createStorageImages(): void {
        let img2: HTMLImageElement = document.createElement("img");
        let imgindex2 = document.createAttribute("indexnumber");
        let imgsrc2 = document.createAttribute("src");
        let imgID2 = document.createAttribute("id");
        let index: number = parseInt(localStorage.getItem("Bildernummer"));
        imgindex2.value = localStorage.getItem("Bildernummer");
        let classTest: string = localStorage.getItem("Bildername");

        //Speichern für das Endergebnis
        if (classTest == "pflanze") {
            localStorage.setItem("Bildernamepflanze", classTest);
            localStorage.setItem("Bildernummerpflanze", index.toString());
        } else if (classTest == "tisch") {
            localStorage.setItem("Bildernametisch", classTest);
            localStorage.setItem("Bildernummertisch", index.toString());
        } else if (classTest == "topf") {
            localStorage.setItem("Bildernametopf", classTest);
            localStorage.setItem("Bildernummertopf", index.toString());
        }
        //"Speicher" für ausgewählte Images
        let pflanzenauswahl = document.querySelector("#ausgewähltPflanze");
        let tischauswahl = document.querySelector("#ausgewähltTisch");
        let topfauswahl = document.querySelector("#ausgewähltTopf");


        //War n Test, den ich vllt noch verwende. Noch net ausgereift xD
        /*
        if (document.getElementById("ausgewähltPflanze") != null) {
            pflanzenauswahl.remove();
        }
        if (document.getElementById("ausgewähltTisch") != null) {
            tischauswahl.remove();
        }
        if (document.getElementById("ausgewähltTopf") != null) {
            topfauswahl.remove();
        }
        */

        // Um den Pfad vom Bild zu bekommen, da man irgendwie den Imagepath im local storage net abspeichern kann, zumindest net rausgefunden wie
        if (classTest == "pflanze") {

            imgID2.value = "ausgewähltPflanze";
            imgsrc2.value = alleObjekte.pflanzen[index].imagepath;
        } else if (classTest == "tisch") {

            imgID2.value = "ausgewähltTisch";
            imgsrc2.value = alleObjekte.tische[index].imagepath;
        } else if (classTest == "topf") {

            imgID2.value = "ausgewähltTopf";
            imgsrc2.value = alleObjekte.töpfe[index].imagepath;
        }


        img2.setAttributeNode(imgsrc2);
        img2.setAttributeNode(imgID2);
        img2.setAttributeNode(imgindex2);
        

        imgAuswahlDiv2.appendChild(img2);
    }

    //Funktion Endergebnis
    function endergebnis(): void {
        let imgpflanze: HTMLImageElement = document.createElement("img");
        let imgtisch: HTMLImageElement = document.createElement("img");
        let imgtopf: HTMLImageElement = document.createElement("img");

        let indexpflanze: number = parseInt(localStorage.getItem("Bildernummerpflanze"));
        let indextisch: number = parseInt(localStorage.getItem("Bildernummertisch"));
        let indextopf: number = parseInt(localStorage.getItem("Bildernummertopf"));

        let imgsrcpflanze: string = alleObjekte.pflanzen[indexpflanze].imagepath;
        let imgsrctisch: string = alleObjekte.tische[indextisch].imagepath;
        let imgsrctopf: string = alleObjekte.töpfe[indextopf].imagepath;

        imgpflanze.src = imgsrcpflanze;
        imgtisch.src = imgsrctisch;
        imgtopf.src = imgsrctopf;

        document.getElementById("auswahlimages").innerHTML = "";
        document.getElementById("ausgewählteimages").innerHTML = "";
        fetchErrorMessage(url3c);
        divEndergebnisselection.appendChild(imgpflanze);
        divEndergebnisselection.appendChild(imgtopf);
        divEndergebnisselection.appendChild(imgtisch);
    }

    //Images werden erstellt
    function createImages(_forIndex: number): HTMLImageElement {

        let img: HTMLImageElement = document.createElement("img");
        let imgindex = document.createAttribute("indexnumber");
        let imgsrc = document.createAttribute("src");
        let imgclass = document.createAttribute("class");

        img.setAttributeNode(imgclass);
        img.setAttributeNode(imgindex);
        img.setAttributeNode(imgsrc);

        img.addEventListener("click", bildauswahl);

        //Abfrage welcher Button gedrückt wurde zum Bilder generieren
        if (pflanzenboolean) {
            imgsrc.value = alleObjekte.pflanzen[_forIndex].imagepath;
            imgindex.value = alleObjekte.pflanzen[_forIndex].imagenummer.toString();
            imgclass.value = alleObjekte.pflanzen[_forIndex].imagename.toString();


        } else if (tischboolean) {
            imgsrc.value = alleObjekte.tische[_forIndex].imagepath;
            imgindex.value = alleObjekte.tische[_forIndex].imagenummer.toString();
            imgclass.value = alleObjekte.tische[_forIndex].imagename.toString();

        } else if (topfboolean) {
            imgsrc.value = alleObjekte.töpfe[_forIndex].imagepath;
            imgindex.value = alleObjekte.töpfe[_forIndex].imagenummer.toString();
            imgclass.value = alleObjekte.töpfe[_forIndex].imagename.toString();
        }

        return img;
    }

    //Funktion für Mausclick auf die Bilder zum Speichern
    function bildauswahl(_event: Event): void {
        let imagetarget: HTMLImageElement = <HTMLImageElement>_event.target;

        let imagename: string = imagetarget.getAttribute("class");
        let imagenummer: string = imagetarget.getAttribute("indexnumber");

        localStorage.setItem("Bildername", imagename);
        localStorage.setItem("Bildernummer", imagenummer);

        //console.log(localStorage.getItem("Bildername"));
        //console.log(localStorage.getItem("Bildernummer"));


        createStorageImages();

    }


    









































}