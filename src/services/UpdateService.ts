import { Stanica } from "../models/Stanica";
import { Vozila } from "../models/Vozila";
import { getStanicaById, mozeSeIzvrsitiPunjenje } from "./StanicaService";
import { getVoziloById } from "./VoziloService";
import { showView, showView2, crtajBaterijuVozila } from "../draw/drawStanica";

const stanicaURL: string = "http://localhost:3000/stanice/";
const vozilaURL: string = "http://localhost:3000/vozila/";

export function obaviPunjenje(
  idStanice: number,
  idVozila: number,
  kolicina: number
): void {
    
  mozeSeIzvrsitiPunjenje(idStanice, idVozila, kolicina).subscribe((moze) => {
    if (moze) {
      var updatedId: Number;
      var updatedKapacitet: Number;
      var updatedStanje: Number;
      var updatedCpj: Number;
      var updatedZarada: Number;

      getStanicaById(idStanice).subscribe((refStanica: Stanica) => {
        updatedId = refStanica.id;
        updatedKapacitet = refStanica.kapacitet;
        updatedStanje = refStanica.stanje - kolicina;
        //updatedStanje = refStanica.stanje - 5;  
        updatedCpj = refStanica.cpj;
        updatedZarada = refStanica.zarada + kolicina * refStanica.cpj;
        //updatedZarada = refStanica.zarada + 5 * refStanica.cpj;

        fetch(`${stanicaURL}${idStanice}`, {
          method: "put",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: updatedId,
            kapacitet: updatedKapacitet,
            stanje: updatedStanje,
            cpj: updatedCpj,
            zarada: updatedZarada,
          }),
        })
      });

    //   getVoziloById(idVozila).subscribe((refVozilo: Vozila) => {
    //     updatedIdV = refVozilo.id;
    //     updatedKapacitetV = refVozilo.kapacitet;
    //     updatedStanjeV = refVozilo.stanje + kolicina;
    //     //updatedStanjeV = refVozilo.stanje + 5;

    //     fetch(`${vozilaURL}${idVozila}`, {
    //       method: "put",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         id: updatedIdV,
    //         kapacitet: updatedKapacitetV,
    //         stanje: updatedStanjeV,
    //       }),
    //     })
    //   });
    }
    else{
        console.log("Nisu ispunjeni uslovi");
    }
  });
}

export function puniZaPet(
    idStanice: number,
    idVozila: number,
    kolicina: number){
    mozeSeIzvrsitiPunjenje(idStanice, idVozila, kolicina).subscribe((moze) => {
        var updatedIdV: number;
        var updatedKapacitetV: Number;
        var updatedStanjeV: Number;
        if(moze){
            getVoziloById(idVozila).subscribe((refVozilo: Vozila) => {
                updatedIdV = refVozilo.id;
                updatedKapacitetV = refVozilo.kapacitet;
                updatedStanjeV = refVozilo.stanje + 5;
                //updatedStanjeV = refVozilo.stanje + 5;
        
                fetch(`${vozilaURL}${idVozila}`, {
                  method: "put",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: updatedIdV,
                    kapacitet: updatedKapacitetV,
                    stanje: updatedStanjeV,
                  }),
                }).then(() => {
                    const divZaBat:HTMLDivElement = document.getElementById("voziloBaterija" + idStanice) as HTMLDivElement;
                    crtajBaterijuVozila(updatedIdV, divZaBat);
                })
              });
              
        }
        else{
            console.log("Nisu ispunjeni uslovi");
        }
    })
}

export function puniStanicuDoVrha(id){
    var updatedId: Number;
    var updatedKapacitet: Number;
    var updatedStanje: Number;
    var updatedCpj: Number;
    var updatedZarada: Number;

    getStanicaById(id).subscribe((refStanica:Stanica) => {
        updatedId = refStanica.id;
        updatedKapacitet = refStanica.kapacitet;
        updatedStanje = refStanica.kapacitet;
        updatedCpj = refStanica.cpj;
        updatedZarada = refStanica.zarada;
        
        fetch(`${stanicaURL}${id}`, {
            method: "put",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: updatedId,
              kapacitet: updatedKapacitet,
              stanje: updatedStanje,
              cpj: updatedCpj,
              zarada: updatedZarada,
            }),
          })
    })
}

export function prazniVozilo(id: number){
    var updatedIdV: number;
    var updatedKapacitetV: Number;
    var updatedStanjeV: Number;
    getVoziloById(id).subscribe((refVozilo:Vozila) => {
        updatedIdV = refVozilo.id;
        updatedKapacitetV = refVozilo.kapacitet;
        updatedStanjeV = 0;

        izmeniVozilo(updatedIdV,updatedKapacitetV,updatedStanjeV, id);
        
    })   
}

function izmeniVozilo(updatedIdV,updatedKapacitetV,updatedStanjeV, id){
    fetch(`${vozilaURL}${id}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedIdV,
          kapacitet: updatedKapacitetV,
          stanje: updatedStanjeV,
        }),
    })
}
