"use strict";
//Aufgabe 1
document.getElementById("rechteckgenerieren").addEventListener("click", rechteckGenerieren);
document.getElementById("Komplettzurücksetzen").addEventListener("click", rechteckEntfernen);
function rechteckGenerieren() {
    let _rechteck = document.createElement("div");
    //Gibt jedem Div, dass mit dem Button erzeugt wurde, die ID Rechteck + Nummer des Rechtecks
    let _rechteckclass = document.createAttribute("id"); //Keine passenden typedef gefunden
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
document.body.style.backgroundColor = "#9bcbe8";
document.body.style.fontFamily = "Arial, Helvetica, sans-serif";
document.body.style.color = "white";
document.body.style.marginTop = "50px";
//h1
let _h1 = document.createElement("h1");
_h1.textContent = "Aufgabe 3";
//header
let _header = document.createElement("header");
let _headerid = document.createAttribute("id");
_headerid.value = "buttons";
_header.setAttributeNode(_headerid);
document.body.appendChild(_header);
_header.style.margin = "auto";
_header.style.maxWidth = "1024px";
_header.style.display = "block";
_header.style.color = "black";
_header.style.padding = "8px";
_header.style.backgroundColor = "#33b2ff";
_header.style.textDecoration = "none";
_header.style.float = "center";
_header.style.width = "100%";
//main
let _main = document.createElement("main");
document.body.appendChild(_main);
_main.style.margin = "auto";
_main.style.maxWidth = "1024px";
_main.style.width = "100%";
_main.style.height = "1200px";
_main.style.display = "block";
_main.style.color = "white";
_main.style.padding = "8px";
_main.style.backgroundColor = "#33b2ff";
_main.style.textDecoration = "none";
_main.style.float = "center";
//Buttons
function createMenuItem(name) {
    let li = document.createElement("button");
    li.textContent = name;
    return li;
}
let _buttonmenu = document.querySelector("#buttons");
_buttonmenu.appendChild(_h1);
_buttonmenu.appendChild(createMenuItem("Kopfgenerieren"));
_buttonmenu.appendChild(createMenuItem("Körpergenerieren"));
_buttonmenu.appendChild(createMenuItem("Fußgenerieren"));
//# sourceMappingURL=script.js.map