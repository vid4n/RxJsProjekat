import { getStanicaById, getStanice } from "../services/StanicaService";
import { map } from "rxjs/operators";
import { Stanica } from "../models/Stanica";

export function crtajStanicu(id: number, host: HTMLDivElement): void{
    //const stanica = getStanicaById(id);

    getStanicaById(id).subscribe(stanica => {

        const stanicaDiv: HTMLDivElement = document.createElement("div");
        stanicaDiv.className = "stanicaDiv";

        host.appendChild(stanicaDiv);

        const infoDiv: HTMLDivElement = document.createElement("div");
        infoDiv.className = "infoDiv";

        const autoDiv: HTMLDivElement = document.createElement("div");
        autoDiv.className = "autoDiv";

        stanicaDiv.appendChild(infoDiv);
        stanicaDiv.appendChild(autoDiv);

        const inputStanicaDiv: HTMLDivElement = document.createElement("div");
        const baterijaStanicaDiv: HTMLDivElement =  document.createElement("div");

        infoDiv.appendChild(inputStanicaDiv);
        infoDiv.appendChild(baterijaStanicaDiv);

        const inputAutoDiv: HTMLDivElement = document.createElement("div");
        const baterijaAutoDiv: HTMLDivElement =  document.createElement("div");
        
        autoDiv.appendChild(inputAutoDiv);
        autoDiv.appendChild(baterijaAutoDiv);

        const idStaniceDiv: HTMLDivElement =  document.createElement("div");
        const kapacitetStaniceDiv: HTMLDivElement =  document.createElement("div");
        const stanjeStaniceDiv: HTMLDivElement =  document.createElement("div");
        const cenaStaniceDiv: HTMLDivElement =  document.createElement("div");
        const zaradaStaniceDiv: HTMLDivElement = document.createElement("div");

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
 
        //auto div
    })
}

export function drawStanicaRow(stanica: Stanica, host: HTMLDivElement): void{
    if(!host)
        throw new Error("Nije prosledjen host");

    const stanicaRow: HTMLTableRowElement = document.createElement("tr");
    console.log(stanica);

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
            stanice. map((stanica: Response) => {
            drawStanicaRow(stanica,tabelaStanica);
        })
    })
}