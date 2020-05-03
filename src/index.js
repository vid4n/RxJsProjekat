import { Stanica } from "./models/Stanica.js";

let stanice = new Array();
stanice.push(new Stanica (1, 1000, 500, 120));
stanice.push(new Stanica (2, 1100, 900, 110));
stanice.push(new Stanica (3, 800, 300, 100));
stanice.push(new Stanica (4, 1000, 100, 90));
stanice.push(new Stanica (5, 1500, 1000, 50));

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
    
    
    stanice.forEach(el => {
        el.drawStanicaRow(tabelaStanica);
    })
}

console.log("Dotore");