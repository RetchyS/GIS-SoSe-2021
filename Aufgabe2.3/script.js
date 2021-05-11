"use strict";
//Aufgabe 1
document.getElementById("rechteckgenerieren").addEventListener("click", rechteckGenerieren);
document.getElementById("Komplettzurücksetzen").addEventListener("click", rechteckEntfernen);
function rechteckGenerieren() {
    let _rechteck = document.createElement("div");
    //Gibt jedem Div, dass mit dem Button erzeugt wurde, die ID Rechteck + Nummer des Rechtecks
    let _rechteckclass = document.createAttribute("id");
    _rechteckclass.value = "rechteck" + document.getElementsByTagName("div").length.toString();
    _rechteck.setAttributeNode(_rechteckclass);
    document.body.appendChild(_rechteck);
    //Div Werte
    _rechteck.style.display = "block";
    _rechteck.style.float = "left";
    _rechteck.style.overflow = "hidden";
    _rechteck.style.position = "relative";
    _rechteck.style.paddingTop = "10px";
    _rechteck.style.width = ((Math.random() * 150).toString() + "px");
    _rechteck.style.height = ((Math.random() * 75).toString() + "px");
    _rechteck.style.top = ((Math.random() * 500).toString() + "px");
    _rechteck.style.left = ((Math.random() * 500).toString() + "px");
    _rechteck.style.backgroundColor = "green";
}
function rechteckEntfernen() {
    let _divlänge = document.getElementsByTagName("div").length;
    for (let i = 0; _divlänge > i; i++) {
        let _rechteckarray = document.getElementById("rechteck" + i);
        _rechteckarray.remove();
    }
}
//Aufgabe 3a
var Tischpflanze;
(function (Tischpflanze) {
    document.body.style.backgroundColor = "#9bcbe8";
    document.body.style.fontFamily = "Arial, Helvetica, sans-serif";
    document.body.style.color = "white";
    document.body.style.marginTop = "50px";
    //h1
    let _h1 = document.createElement("h1");
    _h1.textContent = "Aufgabe 3";
    //header
    let header = document.createElement("header");
    let headerid = document.createAttribute("id");
    headerid.value = "buttons";
    header.setAttributeNode(headerid);
    document.body.appendChild(header);
    header.style.margin = "auto";
    header.style.maxWidth = "1024px";
    header.style.display = "block";
    header.style.color = "black";
    header.style.padding = "8px";
    header.style.backgroundColor = "#33b2ff";
    header.style.textDecoration = "none";
    header.style.float = "center";
    header.style.width = "100%";
    //main
    let main = document.createElement("main");
    let mainid = document.createAttribute("id");
    mainid.value = "hauptmain";
    main.setAttributeNode(mainid);
    document.body.appendChild(main);
    main.style.margin = "auto";
    main.style.maxWidth = "1024px";
    main.style.width = "100%";
    main.style.height = "1200px";
    main.style.display = "block";
    main.style.color = "white";
    main.style.padding = "8px";
    main.style.backgroundColor = "#33b2ff";
    main.style.textDecoration = "none";
    main.style.float = "center";
    //Buttons
    function createMenuItem(name) {
        let li = document.createElement("button");
        let buttonid = document.createAttribute("id");
        buttonid.value = name;
        li.setAttributeNode(buttonid);
        li.textContent = name;
        return li;
    }
    let buttonmenu = document.querySelector("#buttons");
    buttonmenu.appendChild(_h1);
    buttonmenu.appendChild(createMenuItem("Pflanzegenerieren"));
    buttonmenu.appendChild(createMenuItem("Topfgenerieren"));
    buttonmenu.appendChild(createMenuItem("Tischgenerieren"));
    //Images
    //Pflanze
    let indexzähler = 0;
    function createImages(_path, _idname) {
        let img = document.createElement("img");
        let imgindex = document.createAttribute("indexnumber");
        let imgclass = document.createAttribute("id");
        let imgsrc = document.createAttribute("src");
        imgsrc.value = _path;
        imgclass.value = _idname;
        imgindex.value = indexzähler.toString();
        img.setAttributeNode(imgindex);
        img.setAttributeNode(imgclass);
        img.setAttributeNode(imgsrc);
        indexzähler++;
        return img;
    }
    //Div für Pflanzen
    let imgdiv = document.createElement("div");
    let imgDivId = document.createAttribute("id");
    imgDivId.value = "pflanzenimages";
    imgdiv.setAttributeNode(imgDivId);
    let mainDivImages = document.querySelector("#hauptmain");
    mainDivImages.appendChild(imgdiv);
    let imgPflanzenDiv = document.querySelector("#pflanzenimages");
    imgPflanzenDiv.appendChild(createImages("./Bilder/Pflanze/Pflanze1.png", "Pflanze1"));
    imgPflanzenDiv.appendChild(createImages("./Bilder/Pflanze/Pflanze2.png", "Pflanze2"));
    imgPflanzenDiv.appendChild(createImages("./Bilder/Pflanze/Pflanze3.png", "Pflanze3"));
    //Imageevents
    document.getElementById("Pflanze1").addEventListener("click", bilder);
    document.getElementById("Pflanze2").addEventListener("click", bilder);
    document.getElementById("Pflanze3").addEventListener("click", bilder);
    let pflanzenauswahl = null;
    function bilder(_event) {
        let imagetarget = _event.target;
        let imagenumber = parseInt(imagetarget.getAttribute("indexnumber"));
        pflanzenauswahl = Tischpflanze.pflanze[imagenumber];
        console.log(imagenumber);
    }
})(Tischpflanze || (Tischpflanze = {}));
//# sourceMappingURL=script.js.map