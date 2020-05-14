import { Observable, from } from "rxjs";
import { retry } from "rxjs/operators";
import { Vozila } from "../models/Vozila";

const dbURL: string = "http://localhost:3000/";

export function getVozila(): Observable<any> {
    return from(
        fetch(dbURL + "vozila")
            .then((response: Response) => {
                return response.json()
            })
    );
}

export function getVoziloById(id: number): Observable<any> {
    return from(
        fetch(dbURL + "vozila/" + id)
            .then((response: Response) => {
                return response.json()
            })
    );
}

export function voziloMozeDaPrimi(id:number, kolicina: number): Observable<any>{
    return from(
        getVoziloById(id)
        .toPromise()
        .then((vozilo: Vozila) => {
            let slobodnoMesto: number = vozilo.kapacitet - vozilo.stanje;
            if(slobodnoMesto >= kolicina)    
                return true;
            else return false;
        })
    )
}