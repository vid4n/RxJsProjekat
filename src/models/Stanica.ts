import { getStanicaById } from "../services/StanicaService";

export class Stanica{

    public id: number;
    public kapacitet: number;
    public stanje: number;
    public cpj: number;
    public zarada: number;

    constructor() {
        
    }
    // constructor(id: number, kapacitet: number, stanje: number, cpj: number, zarada: number){
    //     this.id = id;
    //     this.kapacitet = kapacitet;
    //     this.stanje = stanje;
    //     this.cpj = cpj;
    //     this.zarada = zarada;
    // }

}