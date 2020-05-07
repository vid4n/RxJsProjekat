import { getStanicaById } from "../services/StanicaService.js";

export class Stanica{

    constructor(id, kapacitetEnergije, stanjeEnergije, cenaPoJedinici, zaradaStanice){
        this.id = id;
        this.kapacitetEnergije = kapacitetEnergije;
        this.stanjeEnergije = stanjeEnergije;
        this.cenaPoJedinici = cenaPoJedinici;
        this.zaradaStanice = zaradaStanice;
    }
    
}