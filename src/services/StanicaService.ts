import * as Rxjs from 'rxjs';
import { fromEvent, from, zip, Observable } from "rxjs";
import { debounceTime, map, switchMap, mergeMap } from "rxjs/operators";

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
