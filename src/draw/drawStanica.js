import { getStanicaById, getStanice } from "../services/StanicaService.js";

export function crtajStanicu(id, host){
    //const stanica = getStanicaById(id);

    getStanicaById(id).subscribe(stanica => {

        const stanicaDiv = document.createElement("div");
        stanicaDiv.className = "stanicaDiv";

        host.appendChild(stanicaDiv);

        const infoDiv = document.createElement("div");
        infoDiv.className = "infoDiv";

        const autoDiv = document.createElement("div");
        autoDiv.className = "autoDiv";

        stanicaDiv.appendChild(infoDiv);
        stanicaDiv.appendChild(autoDiv);

        const inputStanicaDiv = document.createElement("div");
        const baterijaStanicaDiv =  document.createElement("div");

        infoDiv.appendChild(inputStanicaDiv);
        infoDiv.appendChild(baterijaStanicaDiv);

        const inputAutoDiv = document.createElement("div");
        const baterijaAutoDiv =  document.createElement("div");
        
        autoDiv.appendChild(inputAutoDiv);
        autoDiv.appendChild(baterijaAutoDiv);

        const idStaniceDiv =  document.createElement("div");
        const kapacitetStaniceDiv =  document.createElement("div");
        const stanjeStaniceDiv =  document.createElement("div");
        const cenaStaniceDiv =  document.createElement("div");
        const zaradaStaniceDiv = document.createElement("div");

        inputStanicaDiv.appendChild(idStaniceDiv);
        inputStanicaDiv.appendChild(kapacitetStaniceDiv);
        inputStanicaDiv.appendChild(stanjeStaniceDiv);
        inputStanicaDiv.appendChild(cenaStaniceDiv);
        inputStanicaDiv.appendChild(zaradaStaniceDiv);

        const idLabel = document.createElement("label");
        idLabel.innerHTML = "ID:" + stanica.id;
        idStaniceDiv.appendChild(idLabel);

        const kapacitetLabel = document.createElement("label");
        kapacitetLabel.innerHTML = "Kapacitet: " + stanica.kapacitet;

        const povecajKapacitetButton = document.createElement("button");
        povecajKapacitetButton.innerHTML = "Povecaj";
        povecajKapacitetButton.onclick = (ev) => {
        console.log("Povecavanje kapaciteta");
        }

        kapacitetStaniceDiv.appendChild(kapacitetLabel);
        kapacitetStaniceDiv.appendChild(povecajKapacitetButton);

        const stanjeLabel = document.createElement("label");
        stanjeLabel.innerHTML = "Stanje: " + stanica.stanje;

        const napuniStanicuDugme = document.createElement("button");
        napuniStanicuDugme.innerHTML = "Napuni";
        napuniStanicuDugme.onclick = (ev) =>{
            console.log("Punjenje stanice...");
        }

        stanjeStaniceDiv.appendChild(stanjeLabel);
        stanjeStaniceDiv.appendChild(napuniStanicuDugme);

        const cenaLabel = document.createElement("label");
        cenaLabel.innerHTML = "Cena: " + stanica.cpj;

        const zameniCenuButton = document.createElement("button");
        zameniCenuButton.innerHTML = "Zameni";
        zameniCenuButton.onclick = (ev) => {
            console.log("Menjanje cene");
        }

        cenaStaniceDiv.appendChild(cenaLabel);
        cenaStaniceDiv.appendChild(zameniCenuButton);

        cenaStaniceDiv.appendChild(cenaLabel);
        cenaStaniceDiv.appendChild(zameniCenuButton);

        const zaradaLabel = document.createElement("label");
        zaradaLabel.innerHTML = "Zarada: " + stanica.zarada;

        const zaradaButton = document.createElement("button");
        zaradaButton.innerHTML = "Preuzmi";
        zaradaButton.onclick = (ev) => {
            console.log("Preuzimanje zarade...")
        }
        zaradaStaniceDiv.appendChild(zaradaLabel);
        zaradaStaniceDiv.appendChild(zaradaButton);
 
        //auto div
    })
}

export function drawStanicaRow(stanica, host){
    if(!host)
        throw new error("Nije prosledjen host");

    const stanicaRow = document.createElement("tr");

    let atributi = [stanica.id, stanica.kapacitet, stanica.stanje, stanica.cpj, stanica.zarada];

    atributi.forEach(el => {
        const podatak = document.createElement("td");
        podatak.innerHTML = el;
        stanicaRow.appendChild(podatak);
    })

    host.appendChild(stanicaRow);
}

export function crtajSveStanice(host){
    const staniceContainer = document.createElement("div");
    host.appendChild(staniceContainer);

    let idovi = [1,2,3,4];
    idovi.forEach(id => {
        crtajStanicu(id,staniceContainer);
    })
}

export function crtajTabeluStanica(host){

    const tabelaStanica = document.createElement("table");

    host.appendChild(tabelaStanica);
    
    let kolone = ["ID", "Kapacitet", "Stanje", "Cena", "Zarada"];
    
    const hederTabele = document.createElement("tr");
    
    kolone.forEach(el => {
        const kolona = document.createElement("th");
        kolona.innerHTML = el;
        
        hederTabele.appendChild(kolona);
    })
    
    tabelaStanica.appendChild(hederTabele);

    getStanice().subscribe((stanice) => {
        stanice.map((stanica) => {
            drawStanicaRow(stanica,tabelaStanica);
        })
    })
}