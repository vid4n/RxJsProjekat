import { Stanica } from "../models/Stanica";
import { Vozila } from "../models/Vozila";
import { getStanicaById } from "./StanicaService";
import { getVoziloById } from "./VoziloService";
import { showView } from "../draw/drawStanica";

const stanicaURL: string = "http://localhost:3000/stanice/";
const vozilaURL: string = "http://localhost:3000/vozila/";

export function obaviPunjenje(idStanice: number, idVozila: number, kolicina: number): void{
    console.log("Punjenje u toku");
    var updatedId: Number;
    var updatedKapacitet: Number;
    var updatedStanje: Number;
    var updatedCpj: Number;
    var updatedZarada: Number;
   

    var updatedIdV: Number;
    var updatedKapacitetV: Number;
    var updatedStanjeV: Number;

    getStanicaById(idStanice).subscribe( (refStanica: Stanica) => {
        updatedId = refStanica.id;
        updatedKapacitet = refStanica.kapacitet;
        updatedStanje = refStanica.stanje - kolicina;
        updatedCpj = refStanica.cpj;
        updatedZarada = refStanica.zarada + (kolicina*refStanica.cpj);

        fetch(`${stanicaURL}${idStanice}`, {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: updatedId,
                kapacitet: updatedKapacitet,
                stanje: updatedStanje,
                cpj: updatedCpj,
                zarada: updatedZarada
            }),
        }).then(() => {
            showView(document.body);
        })
    })

    getVoziloById(idVozila).subscribe((refVozilo: Vozila) => {
        updatedIdV = refVozilo.id
        updatedKapacitetV = refVozilo.kapacitet;
        updatedStanjeV = refVozilo.stanje + kolicina;

        fetch(`${vozilaURL}${idVozila}`, {
            method: 'put',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: updatedIdV,
                kapacitet: updatedKapacitetV,
                stanje: updatedStanjeV
            }),
        })
    })
   

}