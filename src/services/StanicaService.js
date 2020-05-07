import { Stanica } from "../models/Stanica";
import * as Rxjs from 'rxjs';
import { fromEvent, from, zip, Observable } from "rxjs";
import { debounceTime, map, switchMap, mergeMap } from "rxjs/operators";

const dbURL = "http://localhost:3000/";

export function getStanice(){
    return from(
        fetch(dbURL + "stanice")
            .then(response => {
                return response.json();  
            })
    );
}

export function getStanicaById(id){
    // const response = await fetch(dbURL+ "stanice/" + id);
    // const stanicaJson = await response.json();  
    // return stanicaJson;
    return from(
        fetch(dbURL + "stanice/" + id)
            .then(response => {
                return response.json()
            })
    )
}

export  function createStanicaFromDTO(stanicaDTO){
    return new Stanica(
        stanicaDTO["id"],
        stanicaDTO["kapacitet"],
        stanicaDTO["stanje"],
        stanicaDTO["cpj"],
        stanicaDTO["zarada"]
    );
}