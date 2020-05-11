export class Vozila{
    public id: number;
    public kapacitet: number;
    public stanje: number;

    constructor(id: number, kapacitet: number, stanje: number){
        this.id = id;
        this.kapacitet = kapacitet;
        this.stanje = stanje;
    }
}