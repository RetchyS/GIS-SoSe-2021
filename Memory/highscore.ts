scoreeinsehen();
let buttonname: HTMLElement = document.getElementById("highscorespeichern");
buttonname.addEventListener("click", speichern);


let score: number = Number(localStorage.getItem("zeit"));
async function speichern(): Promise<void> {
    let url: RequestInfo = "https://piikachu.herokuapp.com";
    let formular: FormData = new FormData(document.forms[0]);

    let query: URLSearchParams = new URLSearchParams(<any>formular);
    url += "/speichernhighscore";
    url = url + "?" + query.toString() + "&score=" + score;
    await fetch(url);
    location.reload(); 
}

async function scoreeinsehen(): Promise<void> {

    let formular: FormData = new FormData(document.forms[0]);


    let query: URLSearchParams = new URLSearchParams(<any>formular);
    let url: RequestInfo = "https://piikachu.herokuapp.com";
    url += "//highscoreabfragen";
    url = url + "?" + query.toString();
    console.log(url);
    let response: Response = await fetch(url);
    let responsetext: Data[] = await response.json();


    console.log(responsetext.length);
    console.log(responsetext);

    for (let i: number = 0; i < 10; i++) {

        let spielername = document.getElementById("name" + i);
        let spielerscore = document.getElementById("punkt" + i);

        console.log(responsetext[i].spielername);
        console.log(responsetext[i].spielerscore);
        spielername.innerHTML = responsetext[i].spielername;
        spielerscore.innerHTML = responsetext[i].spielername;

    }
}
interface Data {
    Object: string;
    spielername: string;
    spielerscore: string;
}