import { Stanica } from "../models/Stanica";
import * as Rxjs from 'rxjs';
import { fromEvent, from, zip, Observable } from "rxjs";
import { debounceTime, map, switchMap, mergeMap } from "rxjs/operators";

const dbURL = "http://localhost:3000/";


//async-fetch
export async function getSveStanice(){
    const response = await fetch(dbURL + "stanice");
    const nizStanicaJson = await response.json();

    let stanice = nizStanicaJson.map(StanicaDTO => 
        Stanica.createStanicaFromDTO(StanicaDTO)
    );
    
    return stanice;
}

//Observable
export function getStanice(){
    return from(
        fetch(dbURL + "stanice")
            .then(response => {
                return response.json();  
            })
    );
}

export async function getStanicaById(id){
    const response = await fetch(dbURL+ "stanice/" + id);
    const stanicaJson = await response.json(); 
       
    return stanicaJson;
}