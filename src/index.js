import { Stanica } from "./models/Stanica.js";
import { getSveStanice, getStanicaById } from "./services/StanicaService.js";


crtajTabeluStanica(document.body);

getStanicaById(1);

//POMOCNE FUNKCIJE 

function crtajTabeluStanica(host){

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
    
    getSveStanice().then((stanice) => {
        stanice.forEach((stanica) => {
            stanica.drawStanicaRow(tabelaStanica);
        })
    })
}

function crtajStanicu(id ,host){
    
}