"use strict";
var TischMitPflanzex;
(function (TischMitPflanzex) {
    //JSON Data fetch Function
    let url = "https://retchys.github.io/GIS-SoSe-2021/Aufgabe2.4/data.json";
    let alleObjekte = null;
    let dataresponse = null;
    async function fetchData(_url) {
        dataresponse = await fetch(_url);
        let datajson = await dataresponse.json();
        alleObjekte = datajson;
    }
    //Data fetch
    fetchData(url);
    //Aufgabe 2.5 3c
    let url3c = "https://gis-communication.herokuapp.com";
    async function fetchErrorMessage(_url) {
        let query = new URLSearchParams(localStorage);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        let serverantwort = await response.json();
        console.log(await fetch(_url));
        console.log(response);
        let antwort = document.getElementById("anzeige");
        //Message
        if (serverantwort.message != undefined) {
            antwort.textContent = serverantwort.message;
            antwort.classList.add("message");
        }
        //Error
        if (serverantwort.error != undefined) {
            antwort.textContent = serverantwort.error;
            antwort.classList.add("error");
        }
    }
    //Header
    let header = document.createElement("header");
    let headerid = document.createAttribute("id");
    headerid.value = "buttons";
    header.setAttributeNode(headerid);
    document.body.appendChild(header);
    //Main
    let main = document.createElement("main");
    let mainid = document.createAttribute("id");
    mainid.value = "hauptmain";
    main.setAttributeNode(mainid);
    document.body.appendChild(main);
    //Buttons
    function createButtons(_buttonname) {
        let li = document.createElement("button");
        let buttonid = document.createAttribute("id");
        buttonid.value = _buttonname;
        li.setAttributeNode(buttonid);
        li.textContent = _buttonname;
        // FUnktion hinzufügen
        return li;
    }
    //Funktionen für die Buttons on click. Damit die richtige Bilder angezeigt werden
    let pflanzenboolean = false;
    let tischboolean = false;
    let topfboolean = false;
    function pflanzenTrue() {
        pflanzenboolean = true;
        tischboolean = false;
        topfboolean = false;
    }
    function tischTrue() {
        pflanzenboolean = false;
        tischboolean = true;
        topfboolean = false;
    }
    function topfTrue() {
        pflanzenboolean = false;
        tischboolean = false;
        topfboolean = true;
    }
    //Buttons werden erstellt
    let buttonmenu = document.querySelector("#buttons"); //#buttons = header
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
    function createImageswithButton() {
        document.getElementById("auswahlimages").innerHTML = "";
        for (let i = 0; i < alleObjekte.pflanzen.length; i++) {
            let image = createImages(i);
            imgAuswahlDiv.appendChild(image);
        }
    }
    //Ausgewählte images aus dem Local Storage erstellen
    function createStorageImages() {
        let img2 = document.createElement("img");
        let imgindex2 = document.createAttribute("indexnumber");
        let imgsrc2 = document.createAttribute("src");
        let imgID2 = document.createAttribute("id");
        let index = parseInt(localStorage.getItem("Bildernummer"));
        imgindex2.value = localStorage.getItem("Bildernummer");
        let classTest = localStorage.getItem("Bildername");
        //Speichern für das Endergebnis
        if (classTest == "pflanze") {
            localStorage.setItem("Bildernamepflanze", classTest);
            localStorage.setItem("Bildernummerpflanze", index.toString());
        }
        else if (classTest == "tisch") {
            localStorage.setItem("Bildernametisch", classTest);
            localStorage.setItem("Bildernummertisch", index.toString());
        }
        else if (classTest == "topf") {
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
        }
        else if (classTest == "tisch") {
            imgID2.value = "ausgewähltTisch";
            imgsrc2.value = alleObjekte.tische[index].imagepath;
        }
        else if (classTest == "topf") {
            imgID2.value = "ausgewähltTopf";
            imgsrc2.value = alleObjekte.töpfe[index].imagepath;
        }
        img2.setAttributeNode(imgsrc2);
        img2.setAttributeNode(imgID2);
        img2.setAttributeNode(imgindex2);
        imgAuswahlDiv2.appendChild(img2);
    }
    //Funktion Endergebnis
    function endergebnis() {
        let imgpflanze = document.createElement("img");
        let imgtisch = document.createElement("img");
        let imgtopf = document.createElement("img");
        let indexpflanze = parseInt(localStorage.getItem("Bildernummerpflanze"));
        let indextisch = parseInt(localStorage.getItem("Bildernummertisch"));
        let indextopf = parseInt(localStorage.getItem("Bildernummertopf"));
        let imgsrcpflanze = alleObjekte.pflanzen[indexpflanze].imagepath;
        let imgsrctisch = alleObjekte.tische[indextisch].imagepath;
        let imgsrctopf = alleObjekte.töpfe[indextopf].imagepath;
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
    function createImages(_forIndex) {
        let img = document.createElement("img");
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
        }
        else if (tischboolean) {
            imgsrc.value = alleObjekte.tische[_forIndex].imagepath;
            imgindex.value = alleObjekte.tische[_forIndex].imagenummer.toString();
            imgclass.value = alleObjekte.tische[_forIndex].imagename.toString();
        }
        else if (topfboolean) {
            imgsrc.value = alleObjekte.töpfe[_forIndex].imagepath;
            imgindex.value = alleObjekte.töpfe[_forIndex].imagenummer.toString();
            imgclass.value = alleObjekte.töpfe[_forIndex].imagename.toString();
        }
        return img;
    }
    //Funktion für Mausclick auf die Bilder zum Speichern
    function bildauswahl(_event) {
        let imagetarget = _event.target;
        let imagename = imagetarget.getAttribute("class");
        let imagenummer = imagetarget.getAttribute("indexnumber");
        localStorage.setItem("Bildername", imagename);
        localStorage.setItem("Bildernummer", imagenummer);
        //console.log(localStorage.getItem("Bildername"));
        //console.log(localStorage.getItem("Bildernummer"));
        createStorageImages();
    }
})(TischMitPflanzex || (TischMitPflanzex = {}));
//# sourceMappingURL=script.js.map