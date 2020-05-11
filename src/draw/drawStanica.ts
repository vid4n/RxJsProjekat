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
            crtajBaterijuVozila(stanica.id.toString(), baterijaDiv)
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

function crtajBaterijuVozila(id: string, host: HTMLDivElement): void { //dovrsi 
    let idVozilaString: string = (<HTMLInputElement>document.getElementById("idInputVozilo" + id)).value;
    let idVozila: number = parseInt(idVozilaString);
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
