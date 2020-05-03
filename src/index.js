import { Stanica } from "./models/Stanica.js";
import { getSveStanice } from "./services/StanicaService.js";


crtajTabeluStanica(document.body);


function crtajTabeluStanica(host){

    const tabelaStanica = document.createElement("table");

    host.appendChild(tabelaStanica);
    
    let kolone = ["ID", "Kapacitet", "Stanje", "Cena"];
    
    const hederTabele = document.createElement("tr");
    
    kolone.forEach(el => {
        const kolona = document.createElement("th");
        kolona.innerHTML = el;
        
        hederTabele.appendChild(kolona);
    })
    
    tabelaStanica.appendChild(hederTabele);
    
    getSveStanice().then((stanice) => {
        console.log(stanice);
        stanice.forEach((stanica) => {console.log(stanica);
            stanica.drawStanicaRow(tabelaStanica);
        })
    })

    // stanice.forEach(el => {
    //     el.drawStanicaRow(tabelaStanica);
    // })
}