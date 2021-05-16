namespace TischMitPflanze {



    export interface Bilddata {

        imagepath: string;
        imagename: string;
        imagenummer: number;


    }
    export interface PflanzemitTisch {
        pflanzen: Bilddata[];
        töpfe: Bilddata[];
        tische: Bilddata[];
    }
    

    export let tischmitpflanzen: string =
        `{
    
        "pflanzen": [
            {
            "imagepath": "./Bilder/Pflanze/Pflanze1.png",
            "imagename": "pflanze",
            "imagenummer": "0"
            }, {
            "imagepath": "./Bilder/Pflanze/Pflanze2.png",
            "imagename": "pflanze",
            "imagenummer": "1"
            }, {
            "imagepath": "./Bilder/Pflanze/Pflanze3.png",
            "imagename": "pflanze",
            "imagenummer": "2"
            }
        ],

        "töpfe": [
            {
            "imagepath": "./Bilder/Topf/Topf1.png",
            "imagename": "topf",
            "imagenummer": "0"
            }, {
            "imagepath": "./Bilder/Topf/Topf2.png",
            "imagename": "topf",
            "imagenummer": "1"
            }, {
            "imagepath": "./Bilder/Topf/Topf3.png",
            "imagename": "topf",
            "imagenummer": "2"
            }
        ],

        "tische": [
            {
            "imagepath": "./Bilder/Tisch/Tisch1.png",
            "imagename": "tisch",
            "imagenummer": "0"
            }, {
            "imagepath": "./Bilder/Tisch/Tisch2.png",
            "imagename": "tisch",
            "imagenummer": "1"
            }, {
            "imagepath": "./Bilder/Tisch/Tisch3.png",
            "imagename": "tisch",
            "imagenummer": "2"

            }
        ]
    } 
    `;
}