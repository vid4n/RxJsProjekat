export class Stanica{

    constructor(id, kapacitetEnergije, stanjeEnergije, cenaPoJedinici){
        this.id = id;
        this.kapacitetEnergije = kapacitetEnergije;
        this.stanjeEnergije = stanjeEnergije;
        this.cenaPoJedinici = cenaPoJedinici;
    }

    drawStanicaRow(host){
        if(!host)
            throw new error("Nije prosledjen host");

        const stanicaRow = document.createElement("tr");

        let atributi = [this.id, this.kapacitetEnergije, this.stanjeEnergije, this.cenaPoJedinici];

        atributi.forEach(el => {
            const podatak = document.createElement("td");
            podatak.innerHTML = el;
            stanicaRow.appendChild(podatak);
        })

        host.appendChild(stanicaRow);
    }

    povecajKapacitet(dodatniKapacitet){
        this.kapacitetEnergije += dodatniKapacitet;
    }

    napuniStanicuDoKraja(){
        this.stanjeEnergije = this.kapacitetEnergije;
    }

    napuniStanicu(dodataEnergija){
        if( (this.stanjeEnergije + dodataEnergija) > this.kapacitetEnergije )
            throw new error("Kapacitet premasen");
        
        this.stanjeEnergije += dodataEnergija;
    }
}