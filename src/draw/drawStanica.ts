import { getStanicaById, getStanice, mozeSeIzvrsitiPunjenje } from "../services/StanicaService";
import { map } from "rxjs/operators";
import { Stanica } from "../models/Stanica";
import { getVoziloById } from "../services/VoziloService";
import { obaviPunjenje } from "../services/UpdateService";

export function crtajStanicu(id: number, host: HTMLDivElement): void{
    //const stanica = getStanicaById(id);
    
    getStanicaById(id).subscribe(stanica => {

        const stanicaVoziloDiv:HTMLDivElement = document.createElement("div");
        stanicaVoziloDiv.className = "stanicaVoziloDiv";
        host.appendChild(stanicaVoziloDiv);

        const stanicaDiv: HTMLDivElement = document.createElement("div");
        stanicaDiv.className = "stanicaDiv";

        stanicaVoziloDiv.appendChild(stanicaDiv);

        const inputStanicaDiv: HTMLDivElement = document.createElement("div");
        inputStanicaDiv.className = "inputStanicaDiv"
        const baterijaStanicaDiv: HTMLDivElement =  document.createElement("div");
        baterijaStanicaDiv.className = "baterija";

        stanicaDiv.appendChild(inputStanicaDiv);
        stanicaDiv.appendChild(baterijaStanicaDiv);

        const idStaniceDiv: HTMLDivElement =  document.createElement("div");
        idStaniceDiv.className = "red";
        const kapacitetStaniceDiv: HTMLDivElement =  document.createElement("div");
        kapacitetStaniceDiv.className = "red";
        const stanjeStaniceDiv: HTMLDivElement =  document.createElement("div");
        stanjeStaniceDiv.className = "red";
        const cenaStaniceDiv: HTMLDivElement =  document.createElement("div");
        cenaStaniceDiv.className = "red";
        const zaradaStaniceDiv: HTMLDivElement = document.createElement("div");
        zaradaStaniceDiv.className = "red";

        inputStanicaDiv.appendChild(idStaniceDiv);
        inputStanicaDiv.appendChild(kapacitetStaniceDiv);
        inputStanicaDiv.appendChild(stanjeStaniceDiv);
        inputStanicaDiv.appendChild(cenaStaniceDiv);
        inputStanicaDiv.appendChild(zaradaStaniceDiv);

        const idLabel: HTMLLabelElement = document.createElement("label");
        idLabel.innerHTML = "ID:" + stanica.id;
        idStaniceDiv.appendChild(idLabel);

        const kapacitetLabel: HTMLLabelElement = document.createElement("label");
        kapacitetLabel.innerHTML = "Kapacitet: " + stanica.kapacitet;

        const povecajKapacitetButton: HTMLButtonElement = document.createElement("button");
        povecajKapacitetButton.innerHTML = "Povecaj";
        povecajKapacitetButton.onclick = (ev) => {
        console.log("Povecavanje kapaciteta");
        }

        kapacitetStaniceDiv.appendChild(kapacitetLabel);
        kapacitetStaniceDiv.appendChild(povecajKapacitetButton);

        const stanjeLabel: HTMLLabelElement = document.createElement("label");
        stanjeLabel.innerHTML = "Stanje: " + stanica.stanje;

        const napuniStanicuDugme: HTMLButtonElement = document.createElement("button");
        napuniStanicuDugme.innerHTML = "Napuni";
        napuniStanicuDugme.onclick = (ev) =>{
            console.log("Punjenje stanice...");
        }

        stanjeStaniceDiv.appendChild(stanjeLabel);
        stanjeStaniceDiv.appendChild(napuniStanicuDugme);

        const cenaLabel: HTMLLabelElement = document.createElement("label");
        cenaLabel.innerHTML = "Cena: " + stanica.cpj;

        const zameniCenuButton: HTMLButtonElement = document.createElement("button");
        zameniCenuButton.innerHTML = "Zameni";
        zameniCenuButton.onclick = (ev) => {
            console.log("Menjanje cene");
        }

        cenaStaniceDiv.appendChild(cenaLabel);
        cenaStaniceDiv.appendChild(zameniCenuButton);

        cenaStaniceDiv.appendChild(cenaLabel);
        cenaStaniceDiv.appendChild(zameniCenuButton);

        const zaradaLabel: HTMLLabelElement = document.createElement("label");
        zaradaLabel.innerHTML = "Zarada: " + stanica.zarada;

        const zaradaButton: HTMLButtonElement = document.createElement("button");
        zaradaButton.innerHTML = "Preuzmi";
        zaradaButton.onclick = (ev) => {
            console.log("Preuzimanje zarade...")
        }
        zaradaStaniceDiv.appendChild(zaradaLabel);
        zaradaStaniceDiv.appendChild(zaradaButton);
 
        let visina: number = (stanica.stanje/stanica.kapacitet)*105;
        let visinaString : string = visina.toString() + "px";
        let boja: string;
        if(visina > 55)
            boja = "green";
        else{
            if(visina > 20  )
                boja = "yellow";
            else    
                boja = "red";
        }

        baterijaStanicaDiv.style.height = visinaString;
        baterijaStanicaDiv.style.backgroundColor = boja;
        //----------------------------------------------------------------------------------------
        const crta:HTMLDivElement = document.createElement("div");
        crta.className = "crta";
        stanicaVoziloDiv.appendChild(crta);
        //-----------------------------------------------------------------------------------------
        const voziloDiv: HTMLDivElement = document.createElement("div");
        voziloDiv.className = "voziloDiv";
        stanicaVoziloDiv.appendChild(voziloDiv);

        const inputDiv: HTMLDivElement = document.createElement("div");
        const baterijaDiv:HTMLDivElement = document.createElement("div");
        baterijaDiv.className = "baterija"

        voziloDiv.appendChild(inputDiv);
        voziloDiv.appendChild(baterijaDiv);

        const idDiv:HTMLDivElement = document.createElement("div");
        idDiv.className = "red";
        const kapacitetDiv:HTMLDivElement = document.createElement("div");
        kapacitetDiv.className = "red";
        const stanjeDiv: HTMLDivElement = document.createElement("div");
        stanjeDiv.className = "red";
        const kolicinaDiv:HTMLDivElement = document.createElement("div");
        kolicinaDiv.className = "red";
        const cenaDiv: HTMLDivElement = document.createElement("div");
        cenaDiv.className = "red";
        const buttonDiv:HTMLDivElement = document.createElement("div");
        buttonDiv.className = "red";

        inputDiv.appendChild(idDiv);
        inputDiv.appendChild(kapacitetDiv);
        inputDiv.appendChild(stanjeDiv);
        inputDiv.appendChild(kolicinaDiv);
        inputDiv.appendChild(cenaDiv);
        inputDiv.appendChild(buttonDiv);

        const idLabelVozilo:HTMLLabelElement = document.createElement("label");
        idLabelVozilo.innerHTML = "ID: ";
        const idInputVozilo:HTMLInputElement = document.createElement("input");
        idInputVozilo.id = "idInputVozilo" + stanica.id.toString();
        idDiv.appendChild(idLabelVozilo);
        idDiv.appendChild(idInputVozilo);

        const kolicinaLabelVozilo:HTMLLabelElement = document.createElement("label");
        kolicinaLabelVozilo.innerHTML = "Kolicina: ";
        const kolicinaInputVozilo:HTMLInputElement = document.createElement("input");
        kolicinaInputVozilo.id = "kolicinaInputVozilo" + stanica.id.toString();
        kolicinaDiv.appendChild(kolicinaLabelVozilo);
        kolicinaDiv.appendChild(kolicinaInputVozilo);

        const cenaLabelVozilo:HTMLLabelElement = document.createElement("label");
        cenaLabelVozilo.innerHTML = "Cena: ";
        cenaDiv.appendChild(cenaLabelVozilo);   

        const checkButtonVozilo:HTMLButtonElement = document.createElement("button");
        checkButtonVozilo.innerHTML = "Proveri  ";
        checkButtonVozilo.onclick = (ev) => {
            crtajBaterijuVozila(stanica.id.toString(), baterijaDiv);
            console.log("Proveravam...");

        }
        buttonDiv.appendChild(checkButtonVozilo);

        const napuniButtonVozilo:HTMLButtonElement = document.createElement("button");
        napuniButtonVozilo.innerHTML = "Napuni";
        napuniButtonVozilo.onclick = (ev) => {
            var kolicinaZaPunjenjeInput = document.getElementById("kolicinaInputVozilo" + stanica.id) as HTMLInputElement;
            var kolicinaZaPunjenje = parseInt(kolicinaZaPunjenjeInput.value)
            mozeSeIzvrsitiPunjenje(stanica.id, parseInt(idInputVozilo.value), kolicinaZaPunjenje)
            .subscribe(moze => {
                if(moze){
                    console.log("Moze")
                    obaviPunjenje(stanica.id, parseInt(idInputVozilo.value), kolicinaZaPunjenje);
                }
                else console.log("Ne moze da se napuni toliko energije");
            })
        }
        buttonDiv.appendChild(napuniButtonVozilo);

        
    })
}

function crtajBaterijuVozila(id: number, idVozila: number, host: HTMLDivElement): void { 
    setTimeout(()=>{
        
        console.log(idVozila);
        getVoziloById(idVozila).subscribe(vozilo => {
            
    
            let visina: number = (vozilo.stanje/vozilo.kapacitet)*81;
            let visinaString : string = visina.toString() + "px";
            let boja: string;
            if(visina > 40)
                boja = "green";
            else{
                if(visina > 20  )
                    boja = "yellow";
                else    
                    boja = "red";
            }
    
            host.style.height = visinaString;
            host.style.backgroundColor = boja;
        })
    },600)
    
}

export function drawStanicaRow(stanica: Stanica, host: HTMLDivElement): void{
    if(!host)
        throw new Error("Nije prosledjen host");

    const stanicaRow: HTMLTableRowElement = document.createElement("tr");

    let atributi = [stanica.id, stanica.kapacitet, stanica.stanje, stanica.cpj, stanica.zarada];

    atributi.forEach(el => {
        const podatak: HTMLTableDataCellElement = document.createElement("td");
        podatak.innerHTML = el.toString();
        stanicaRow.appendChild(podatak);
    })

    host.appendChild(stanicaRow);
}

export function crtajSveStanice(host: HTMLElement): void{

    const staniceContainer: HTMLDivElement = document.createElement("div");
    host.appendChild(staniceContainer);

    let idovi: number[] = [1,2,3,4];
    idovi.forEach((id: number) => {
        crtajStanicu(id,staniceContainer);
    })
}

export function crtajTabeluStanica(host: HTMLElement){

    const tabelaStanica: HTMLTableElement = document.createElement("table");

    host.appendChild(tabelaStanica);
    
    let kolone: string[] = ["ID", "Kapacitet", "Stanje", "Cena", "Zarada"];
    
    const hederTabele = document.createElement("tr");
    
    kolone.forEach((el: string) => {
        const kolona: HTMLTableHeaderCellElement = document.createElement("th");
        kolona.innerHTML = el;
        
        hederTabele.appendChild(kolona);
    })
    
    tabelaStanica.appendChild(hederTabele);

    getStanice().subscribe((stanice) => {
            stanice. map((stanica: Stanica) => {
            drawStanicaRow(stanica,tabelaStanica);
        })
    })
}

export function showView(host){
    host.innerHTML = "";

    crtajTabeluStanica(host);
    crtajSveStanice(host);
    
}

export function crtajStanicu2(stanica:Stanica, host: HTMLDivElement): void {

    let visina: number = (stanica.stanje / stanica.kapacitet) * 160;
    let visinaString: string = visina.toString() + "px";
    let boja: string;
    if(visina > 79)
            boja = "#33ff99";
    else{
        if(visina > 35  )
            boja = "#ffff4d";
         else    
            boja = "#ff5c33";
        }



    host.innerHTML += 
    `<form class="form-inline" id="stanicaForm">
        <div class = "stanica">
        <div class = "stanicaInput">
        <div class="red">
        <div class="form-group mb-2 labela">
            <label>ID: ${stanica.id}</label>     
        </div>
        </div>

        <div class="red">
        <div class="form-group mb-2 labela">
            <label">Kapacitet</label>     
        </div>
        <div class="form-group mx-sm-3 mb-2">
            <input type="number" class="form-control" id="inputKapacitet" placeholder="kWh">
        </div>
        <button type="submit" class="btn btn-primary mb-2" id="btnKapacitet">Dodaj</button>
        </div>

        <div class="red">
        <div class="form-group mb-2 labela">
            <label]>Stanje</label>     
        </div>
        <div class="form-group mx-sm-3 mb-2">
            <input type="number" class="form-control" id="inputStanje" placeholder="kWh">
        </div>
        <button type="submit" class="btn btn-primary mb-2">Napuni</button>
        </div>

        <div class="red">
        <div class="form-group mb-2 labela">
            <label>Cena</label>     
        </div>
        <div class="form-group mx-sm-3 mb-2">
            <input type="number" class="form-control" id="inputCena" placeholder="RSD">
        </div>
        <button type="submit" class="btn btn-primary mb-2">Zameni</button>
        </div>

        <div class="red">
        <div class="form-group mb-2 labela">
            <label>Zarada</label>     
        </div>
        <button type="submit" class="btn btn-primary mb-2">Preuzmi</button>
        </div>
        </div>

        <div class="stanicaBaterija" style = "height: ${visinaString}; background-color: ${boja};" >

        </div>
        </div>
        



        <div class="vozilo">
            <div class="voziloInput">
                <div class="red">
                    <div class="form-group mb-2 labela">
                        <label>ID</label>     
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <input  class="form-control" id="inputID${stanica.id.toString()}" placeholder="ID vozila">
                    </div>
                    <div class="fake">
                    </div>
                </div>  

                <div class="red">
                    <div class="form-group mb-2 labela">
                       <label>Kolicina</label>     
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <input type="number" class="form-control" id="inputKolicina" placeholder="kWh">
                    </div>
                    <div class="fake">
                    </div>
                </div>

                <div class="red">
                    <div class="form-group mb-2 labela">
                        <label>Cena</label>     
                    </div>
                    <div class="fakeInput" id="fakeInput${stanica.id.toString()}">
                        <div id="promeniButton${stanica.id.toString()}" data-id="${stanica.id.toString()}" class=" promeniButton btn btn-primary mb-2">Promeni</div>
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Napuni</button>
                </div>  
            </div>

            <div class="voziloBaterija" id="voziloBaterija">
            </div>
        </div>

    </form>`

    // const dugme:HTMLButtonElement = document.getElementById("btnProveri" + stanica.id.toString()) as HTMLButtonElement;
    // console.log(dugme);
    
    // const bat: HTMLDivElement = document.getElementById("voziloBaterija") as HTMLDivElement;
    // dugme.addEventListener("click", (event: Event) => {
    //     console.log(dugme);
    //     event.preventDefault();
    //     let input:HTMLInputElement = document.createElement("input");
    //     input = document.getElementById("inputID" + stanica.id.toString()) as HTMLInputElement;
    //     console.log(input);
    //     console.log(input.value);
    //     let idVozilaString: string = input.value;
    //     let idVozila = parseInt(idVozilaString);
    //     console.log(idVozila);
    //     crtajBaterijuVozila(stanica.id, idVozila, bat);
    // })
    // const dugme:HTMLButtonElement = document.getElementById("btnProveri" + stanica.id.toString()) as HTMLButtonElement;
    // console.log(dugme);
    // const bat: HTMLDivElement = document.getElementById("voziloBaterija") as HTMLDivElement;
   
    // dugme.onclick = ev =>{
    //     console.log("aa");
    //     ev.preventDefault();
    //     let input:HTMLInputElement = document.createElement("input");
    //     console.log(input);
    //     input = document.getElementById("inputID" + stanica.id.toString()) as HTMLInputElement;
    //     console.log(input);
    //     let idVozilaString: string = input.value;
    //     let idVozila = parseInt(idVozilaString);
    //     console.log(idVozila);
    // }
    // const proveriDiv : HTMLDivElement = document.getElementById("fakeInput" + stanica.id.toString()) as HTMLDivElement;
    // const proveriButton: HTMLButtonElement = document.createElement("button");
    // proveriDiv.appendChild(proveriButton);
    // proveriButton.id = "proveriButton" + stanica.id.toString();
    // console.log(proveriButton);
    // proveriButton.onclick = (ev) => {
    //     ev.preventDefault();    
    //     let inputEl = document.getElementById("inputID" + stanica.id.toString()) as HTMLInputElement;
    //     let inputString = inputEl. value;
    //     let idVozila = parseInt(inputString);
    //     console.log(idVozila);
    // }

    //<button type="submit" class="btn btn-primary mb-2 proveriBtn" id="btnProveri${stanica.id.toString()}">Proveri</button>
    // const nizDugmica = praviNizDugmica();
    // dodajListenereDugmadima(nizDugmica, stanica.id);
    // setTimeout(()=>{
    //     dodajListenerDugmetu(proveriButton, stanica.id);
    // },1000);
    let button = document.getElementsByClassName("promeniButton")
    //console.log(button);
    
}

function dodajListenerDugmicima(){
    // console.log(dugme, idStanice);
    // dugme.onclick = (ev) => {
    //     ev.preventDefault();
    //     console.log("brao");
    //     // ev.preventDefault();    
    //      // let inputEl = document.getElementById("inputID" + idStanice.toString()) as HTMLInputElement;
    //      // let inputString = inputEl. value;
    //      // let idVozila = parseInt(inputString);
    //      // console.log(idVozila);
    // }
    let buttons:NodeListOf<Element> = document.querySelectorAll(".promeniButton");
    console.log(buttons);
    
    // button[0].addEventListener("click", (event:Event) => {
    //     console.log("aa");
    // })
    // button[1].addEventListener("click", (event:Event) => {
    //     console.log("aa");
    // })
    // button[2].addEventListener("click", (event:Event) => {
    //     console.log("aa");
    // })
    // button[3].addEventListener("click", (event:Event) => {
    //     console.log("aa");
    // })

    buttons.forEach((button)=>{
        console.log(button);
        button.addEventListener("click", (event:Event) => {
                console.log("aa");
                console.log(button.getAttribute("data-id"));
        })
    })
}



export function showView2(host){
    host.innerHTML = "";
    const divSveStanice: HTMLDivElement = document.createElement("div");
    divSveStanice.className = "divSveStanice";
    host.appendChild(divSveStanice);

   

    crtajSveStanice2(divSveStanice);
}

export function praviNizDugmica(){
    let nizDugmica:Array<HTMLElement> = new Array<HTMLButtonElement>();
    nizDugmica.push(document.getElementById("proveriButton1"));
    nizDugmica.push(document.getElementById("proveriButton2"));
    nizDugmica.push(document.getElementById("proveriButton3"));
    nizDugmica.push(document.getElementById("proveriButton4"));

    console.log(nizDugmica);
    return nizDugmica;
}

function dodajListenereDugmadima(dugmad, idStanice){
    console.log(dugmad);
    dugmad.forEach(dugme => {
        console.log(dugme);
        dugme.addEventListener("click", (event: Event) => {
        console.log(dugme);
        event.preventDefault();
        let input:HTMLInputElement = document.createElement("input");
        input = document.getElementById("inputID" + idStanice.toString()) as HTMLInputElement;
        console.log(input);
        console.log(input.value);
        let idVozilaString: string = input.value;
        let idVozila = parseInt(idVozilaString);
        console.log(idVozila);
        })
    })
}

export function crtajSveStanice2(host){
    getStanice().subscribe((stanice: Array<Stanica>) => {
        stanice.map((stanica: Stanica) => {
            crtajStanicu2(stanica, host);
        })
        dodajListenerDugmicima();
    })
    // setTimeout(() => {
        
    // },1000);
    

}