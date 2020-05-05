import { getStanicaById } from "./services/StanicaService.js";

export class Stanica{

    constructor(id, kapacitetEnergije, stanjeEnergije, cenaPoJedinici, zaradaStanice){
        this.id = id;
        this.kapacitetEnergije = kapacitetEnergije;
        this.stanjeEnergije = stanjeEnergije;
        this.cenaPoJedinici = cenaPoJedinici;
        this.zaradaStanice = zaradaStanice;
    }

    crtajStanicu(id, host){
        const stanica = getStanicaById();

        const stanicaDiv = document.createElement("div");
        stanicaDiv.className = "stanicaDiv";

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
        idLabel.innerHTML = "ID:" + stancia["id"];
        idStaniceDiv.appendChild(idLabel);

        const kapacitetLabel = document.createElement("label");
        kapacitetLabel.innerHTML = "Kapacitet: " + stanica["kapacitetStanice"];

        const povecajKapacitetButton = document.createElement("button");
        povecajKapacitetButton.innerHTML = "Povecaj";
        povecajKapacitetButton.onclick = (ev) => {
            this.povecajKapacitet(id,kolicina);
        }


        
    }

    drawStanicaRow(host){
        if(!host)
            throw new error("Nije prosledjen host");

        const stanicaRow = document.createElement("tr");

        let atributi = [this.id, this.kapacitetEnergije, this.stanjeEnergije, this.cenaPoJedinici, this.zaradaStanice];

        atributi.forEach(el => {
            const podatak = document.createElement("td");
            podatak.innerHTML = el;
            stanicaRow.appendChild(podatak);
        })

        host.appendChild(stanicaRow);
    }

    povecajKapacitet(id, dodatniKapacitet){
        const stanica = getStanicaById(id);
        let curr = stanica["kapacitetEnergije"];
        let uvecaniKapacitet = curr + dodatniKapacitet;
        

    }

    napuniStanicuDoKraja(){
        this.stanjeEnergije = this.kapacitetEnergije;
    }

    napuniStanicu(dodataEnergija){
        if( (this.stanjeEnergije + dodataEnergija) > this.kapacitetEnergije )
            throw new error("Kapacitet premasen");
        
        this.stanjeEnergije += dodataEnergija;
    }

    static createStanicaFromDTO(stanicaDTO){
        return new Stanica(
            stanicaDTO["id"],
            stanicaDTO["kapacitetEnergije"],
            stanicaDTO["stanjeEnergije"],
            stanicaDTO["cenaPoJedinici"],
            stanicaDTO["zaradaStanice"]
        );
    }

    setKapacitet()
}