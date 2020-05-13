import * as Rxjs from 'rxjs';
import { fromEvent, from, zip, Observable, ObservableInput } from "rxjs";
import { debounceTime, map, switchMap, mergeMap } from "rxjs/operators";
import { Stanica } from '../models/Stanica';
import { voziloMozeDaPrimi } from './VoziloService';

const dbURL: string = "http://localhost:3000/";

export function getStanice(): Observable<any> {
    return from(
        fetch(dbURL + "stanice")
            .then((response: Response) => {
                return response.json();  
            })
    );
}

export function getStanicaById(id: number): Observable<any>{
    return from(
        fetch(dbURL + "stanice/" + id)
            .then((response: Response) => {
                return response.json()
            })
    )
}

export function stanicaImaDovoljnoEnergije(id: number, kolicina: number): Observable<any>{
    return from(
        getStanicaById(id)
        .toPromise()
        .then( (stanica : Stanica) => {
            if(stanica.stanje >= kolicina)
                return true;
            else return false;
        } )
    )
}

export function mozeSeIzvrsitiPunjenje(idStanice: number, idVozila: number, kolicina: number): Observable<any>{
    return from(   
        zip(
            stanicaImaDovoljnoEnergije(idStanice, kolicina),
            voziloMozeDaPrimi(idVozila, kolicina)
        )
        .toPromise()
        .then((result: Array<boolean>) => {
            if((result[0]) && ((result[1])))
                return true;
            else return false;
        })
    );
}

export function odrediCenu(id:number, kolicina: number): Observable<any>{
    let cena:number;
    return from(
        getStanicaById(id).toPromise()
        .then((stanica: Stanica) => {
            cena = stanica.cpj * kolicina;
            console.log("Cena jeee " + cena);
            return cena;
            
        })
    )
    


}




