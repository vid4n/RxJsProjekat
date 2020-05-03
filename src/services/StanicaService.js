import { Stanica } from "../models/Stanica";

import { fromEvent, from, zip, Observable } from "rxjs";
import { debounceTime, map, switchMap, mergeMap } from "rxjs/operators";

const dbURL = "http://localhost:3000/";

export async function getSveStanice(){
    const response = await fetch(dbURL + "stanice");
    const nizStanica = await response.json();
    let stanice = nizStanica.map(StanicaDTO => 
        Stanica.createStanicaFromDTO(StanicaDTO)
    );

    return stanice;
}
