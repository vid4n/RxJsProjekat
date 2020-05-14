import { getStanicaById, getStanice, mozeSeIzvrsitiPunjenje, odrediCenu } from "../services/StanicaService";
import { map, take, takeUntil, switchMap, debounceTime,  } from "rxjs/operators";
import { Stanica } from "../models/Stanica";
import { getVoziloById, getVozila, voziloMozeDaPrimi } from "../services/VoziloService";
import { obaviPunjenje, puniZaPet, puniStanicuDoVrha, prazniVozilo } from "../services/UpdateService";
import { interval, from, timer, fromEvent, Observable, merge  } from "rxjs";
import { Vozila } from "../models/Vozila";

export function crtajStanicu(id: number, host: HTMLDivElement): void{
    //const stanica = getStanicaById(id);
    
    getStanicaById(id).subscribe(stanica => {

        const stanicaVoziloDiv:HTMLDivElement = document.createElement("div");
        stanicaVoziloDiv.className = "stanicaVoziloDiv";
        host.appendChild(stanicaVoziloDiv);

        const stanicaDiv: HTMLDivElement = document.createElement("div");
        stanicaDiv.className = "stanicaDiv";

        stanicaVoziloDiv.appendChild(stanicaDiv);

        const inputStanicaDiv: HTMLDivElement = document.createElement("div");
        inputStanicaDiv.className = "inputStanicaDiv"
        const baterijaStanicaDiv: HTMLDivElement =  document.createElement("div");
        baterijaStanicaDiv.className = "baterija";

        stanicaDiv.appendChild(inputStanicaDiv);
        stanicaDiv.appendChild(baterijaStanicaDiv);

        const idStaniceDiv: HTMLDivElement =  document.createElement("div");
        idStaniceDiv.className = "red";
        const kapacitetStaniceDiv: HTMLDivElement =  document.createElement("div");
        kapacitetStaniceDiv.className = "red";
        const stanjeStaniceDiv: HTMLDivElement =  document.createElement("div");
        stanjeStaniceDiv.className = "red";
        const cenaStaniceDiv: HTMLDivElement =  document.createElement("div");
        cenaStaniceDiv.className = "red";
        const zaradaStaniceDiv: HTMLDivElement = document.createElement("div");
        zaradaStaniceDiv.className = "red";

        inputStanicaDiv.appendChild(idStaniceDiv);
        inputStanicaDiv.appendChild(kapacitetStaniceDiv);
        inputStanicaDiv.appendChild(stanjeStaniceDiv);
        inputStanicaDiv.appendChild(cenaStaniceDiv);
        inputStanicaDiv.appendChild(zaradaStaniceDiv);

        const idLabel: HTMLLabelElement = document.createElement("label");
        idLabel.innerHTML = "ID:" + stanica.id;
        idStaniceDiv.appendChild(idLabel);

        const kapacitetLabel: HTMLLabelElement = document.createElement("label");
        kapacitetLabel.innerHTML = "Kapacitet: " + stanica.kapacitet;

        const povecajKapacitetButton: HTMLButtonElement = document.createElement("button");
        povecajKapacitetButton.innerHTML = "Povecaj";
        povecajKapacitetButton.onclick = (ev) => {
        }

        kapacitetStaniceDiv.appendChild(kapacitetLabel);
        kapacitetStaniceDiv.appendChild(povecajKapacitetButton);

        const stanjeLabel: HTMLLabelElement = document.createElement("label");
        stanjeLabel.innerHTML = "Stanje: " + stanica.stanje;

        const napuniStanicuDugme: HTMLButtonElement = document.createElement("button");
        napuniStanicuDugme.innerHTML = "Napuni";
        napuniStanicuDugme.onclick = (ev) =>{
        }

        stanjeStaniceDiv.appendChild(stanjeLabel);
        stanjeStaniceDiv.appendChild(napuniStanicuDugme);

        const cenaLabel: HTMLLabelElement = document.createElement("label");
        cenaLabel.innerHTML = "Cena: " + stanica.cpj;

        const zameniCenuButton: HTMLButtonElement = document.createElement("button");
        zameniCenuButton.innerHTML = "Zameni";
        zameniCenuButton.onclick = (ev) => {
        }

        cenaStaniceDiv.appendChild(cenaLabel);
        cenaStaniceDiv.appendChild(zameniCenuButton);

        cenaStaniceDiv.appendChild(cenaLabel);
        cenaStaniceDiv.appendChild(zameniCenuButton);

        const zaradaLabel: HTMLLabelElement = document.createElement("label");
        zaradaLabel.innerHTML = "Zarada: " + stanica.zarada;

        const zaradaButton: HTMLButtonElement = document.createElement("button");
        zaradaButton.innerHTML = "Preuzmi";
        zaradaButton.onclick = (ev) => {
        }
        zaradaStaniceDiv.appendChild(zaradaLabel);
        zaradaStaniceDiv.appendChild(zaradaButton);
 
        let visina: number = (stanica.stanje/stanica.kapacitet)*105;
        let visinaString : string = visina.toString() + "px";
        let boja: string;
        if(visina > 55)
            boja = "green";
        else{
            if(visina > 20  )
                boja = "yellow";
            else    
                boja = "red";
        }

        baterijaStanicaDiv.style.height = visinaString;
        baterijaStanicaDiv.style.backgroundColor = boja;
        //----------------------------------------------------------------------------------------
        const crta:HTMLDivElement = document.createElement("div");
        crta.className = "crta";
        stanicaVoziloDiv.appendChild(crta);
        //-----------------------------------------------------------------------------------------
        const voziloDiv: HTMLDivElement = document.createElement("div");
        voziloDiv.className = "voziloDiv";
        stanicaVoziloDiv.appendChild(voziloDiv);

        const inputDiv: HTMLDivElement = document.createElement("div");
        const baterijaDiv:HTMLDivElement = document.createElement("div");
        baterijaDiv.className = "baterija"

        voziloDiv.appendChild(inputDiv);
        voziloDiv.appendChild(baterijaDiv);

        const idDiv:HTMLDivElement = document.createElement("div");
        idDiv.className = "red";
        const kapacitetDiv:HTMLDivElement = document.createElement("div");
        kapacitetDiv.className = "red";
        const stanjeDiv: HTMLDivElement = document.createElement("div");
        stanjeDiv.className = "red";
        const kolicinaDiv:HTMLDivElement = document.createElement("div");
        kolicinaDiv.className = "red";
        const cenaDiv: HTMLDivElement = document.createElement("div");
        cenaDiv.className = "red";
        const buttonDiv:HTMLDivElement = document.createElement("div");
        buttonDiv.className = "red";

        inputDiv.appendChild(idDiv);
        inputDiv.appendChild(kapacitetDiv);
        inputDiv.appendChild(stanjeDiv);
        inputDiv.appendChild(kolicinaDiv);
        inputDiv.appendChild(cenaDiv);
        inputDiv.appendChild(buttonDiv);

        const idLabelVozilo:HTMLLabelElement = document.createElement("label");
        idLabelVozilo.innerHTML = "ID: ";
        const idInputVozilo:HTMLInputElement = document.createElement("input");
        idInputVozilo.id = "idInputVozilo" + stanica.id.toString();
        idDiv.appendChild(idLabelVozilo);
        idDiv.appendChild(idInputVozilo);

        const kolicinaLabelVozilo:HTMLLabelElement = document.createElement("label");
        kolicinaLabelVozilo.innerHTML = "Kolicina: ";
        const kolicinaInputVozilo:HTMLInputElement = document.createElement("input");
        kolicinaInputVozilo.id = "kolicinaInputVozilo" + stanica.id.toString();
        kolicinaDiv.appendChild(kolicinaLabelVozilo);
        kolicinaDiv.appendChild(kolicinaInputVozilo);

        const cenaLabelVozilo:HTMLLabelElement = document.createElement("label");
        cenaLabelVozilo.innerHTML = "Cena: ";
        cenaDiv.appendChild(cenaLabelVozilo);   

        const checkButtonVozilo:HTMLButtonElement = document.createElement("button");
        checkButtonVozilo.innerHTML = "Proveri  ";
        checkButtonVozilo.onclick = (ev) => {
            //crtajBaterijuVozila(stanica.id.toString(), baterijaDiv);

        }
        buttonDiv.appendChild(checkButtonVozilo);

        const napuniButtonVozilo:HTMLButtonElement = document.createElement("button");
        napuniButtonVozilo.innerHTML = "Napuni";
        napuniButtonVozilo.onclick = (ev) => {
            var kolicinaZaPunjenjeInput = document.getElementById("kolicinaInputVozilo" + stanica.id) as HTMLInputElement;
            var kolicinaZaPunjenje = parseInt(kolicinaZaPunjenjeInput.value)
            mozeSeIzvrsitiPunjenje(stanica.id, parseInt(idInputVozilo.value), kolicinaZaPunjenje)
            .subscribe(moze => {
                if(moze){
                    obaviPunjenje(stanica.id, parseInt(idInputVozilo.value), kolicinaZaPunjenje);
                }
                else console.log("Ne moze da se napuni toliko energije");
            })
        }
        buttonDiv.appendChild(napuniButtonVozilo);

        
    })
}

function crtajBaterijuStanice(idStanice: number , host: HTMLDivElement){
    getStanicaById(idStanice).subscribe((stanica: Stanica) => {
        let visina: number = (stanica.stanje / stanica.kapacitet) * 128;
        let visinaString: string = visina.toString() + "px";
        let boja: string;
        if(visina > 79)
            boja = "#33ff99";
        else{
            if(visina > 35  )
                boja = "#ffff4d";
            else    
                boja = "#ff5c33";
        }

        host.style.height = visinaString;
        host.style.backgroundColor = boja;

        const labelaStanje:HTMLLabelElement = document.getElementById("stanje" + stanica.id) as HTMLLabelElement;
        labelaStanje.innerHTML = stanica.stanje.toString();
    })
}

export function crtajBaterijuVozila(idVozila: number, host: HTMLDivElement): void {  
    
        getVoziloById(idVozila).subscribe(vozilo => {
            
    
            let visina: number = (vozilo.stanje/vozilo.kapacitet)*81;
            
            let visinaString : string = visina.toString() + "px";
            let boja: string;
            if(visina > 40)
                boja = "#33ff99";
            else{
                if(visina > 20  )
                    boja = "#ffff4d";
                else    
                    boja = "#ff5c33";
            }
    
            host.style.height = visinaString;
            host.style.backgroundColor = boja;
            host.style.width = "50px";
            host.style.marginLeft = "10px";
            host.style.borderRadius = "6%";
        })

       
    
}

export function drawStanicaRow(stanica: Stanica, host: HTMLDivElement): void{
    if(!host)
        throw new Error("Nije prosledjen host");

    const stanicaRow: HTMLTableRowElement = document.createElement("tr");

    let atributi = [stanica.id, stanica.kapacitet, stanica.stanje, stanica.cpj, stanica.zarada];

    atributi.forEach(el => {
        const podatak: HTMLTableDataCellElement = document.createElement("td");
        podatak.innerHTML = el.toString();
        stanicaRow.appendChild(podatak);
    })

    host.appendChild(stanicaRow);
}

export function crtajSveStanice(host: HTMLElement): void{

    const staniceContainer: HTMLDivElement = document.createElement("div");
    host.appendChild(staniceContainer);

    let idovi: number[] = [1,2,3,4];
    idovi.forEach((id: number) => {
        crtajStanicu(id,staniceContainer);
    })
}

export function crtajTabeluStanica(host: HTMLElement){

    const tabelaStanica: HTMLTableElement = document.createElement("table");
    tabelaStanica.className="table";

    host.appendChild(tabelaStanica);
    
    let kolone: string[] = ["ID", "Kapacitet", "Stanje", "Cena", "Zarada"];
    
    const hederTabele = document.createElement("thead");
    hederTabele.className = "heder";
    
    kolone.forEach((el: string) => {
        const kolona: HTMLTableHeaderCellElement = document.createElement("th");
        kolona.innerHTML = el;
        
        hederTabele.appendChild(kolona);
    })
    
    tabelaStanica.appendChild(hederTabele);

    const bodyTabele = document.createElement("tbody");
    tabelaStanica.appendChild(bodyTabele);

    getStanice().subscribe((stanice) => {
            stanice. map((stanica: Stanica) => {
            drawStanicaRow(stanica, bodyTabele);
        })
    })
}

export function showView(host){
    host.innerHTML = "";

    crtajTabeluStanica(host);
    crtajSveStanice(host);
    
}

export function crtajStanicu2(stanica:Stanica, host: HTMLDivElement): void {

    let visina: number = (stanica.stanje / stanica.kapacitet) * 128;
    let visinaString: string = visina.toString() + "px";
    let boja: string;
    if(visina > 79)
            boja = "#33ff99";
    else{
        if(visina > 35  )
            boja = "#ffff4d";
         else    
            boja = "#ff5c33";
        }



    host.innerHTML += 
    `<form class="form-inline" id="stanicaForm">
        <div class = "stanica">
        <div class = "stanicaInput">
        <div class="red">
        <div class="form-group mb-2 labela">
            <label>ID: ${stanica.id}</label>     
        </div>
        </div>

        <div class="red">
        <div class="form-group mb-2 labela">
            <label>Kapacitet</label>     
        </div>
        <div class="form-group mx-sm-3 mb-2 srednji">
            <label> ${stanica.kapacitet}</label>
        </div>
        <div class="form-group mx-sm-3 mb-2 desni">
        </div>
        </div>

        <div class="red">
        <div class="form-group mb-2 labela">
            <label>Cena</label>     
        </div>
        <div class="form-group mx-sm-3 mb-2 srednji">
            <label>${stanica.cpj}</label>
        </div>
        <div class="form-group mx-sm-3 mb-2 desni">
        </div>
        </div>

        <div class="red">
        <div class="form-group mb-2 labela">
            <label>Zarada</label>     
        </div>
        <div class="form-group mx-sm-3 mb-2 srednji">
            <label>${stanica.zarada}</label>
        </div>
        <div class="form-group mx-sm-3 mb-2 desni">
        </div>
    </div>

        <div class="red">
            <div class="form-group mb-2 labela">
                <label >Stanje</label>     
            </div>
            <div class="form-group mx-sm-3 mb-2 srednji">
                <label id="stanje${stanica.id}">${stanica.stanje}</label>
            </div>
            <button type="submit" id="napuniStanicu${stanica.id}" class="btn btn-primary mb-2 napuniStanicu" data-id="${stanica.id.toString()}">Napuni</button>
        </div>

        

       



        </div>

        <div class="stanicaBaterija" style="height: ${visinaString}; background-color: ${boja}" id="stanicaBaterija${stanica.id.toString()}">

        </div>
        </div>
        



        <div class="vozilo">
            <div class="voziloInput">
                <div class="red">
                    <div class="form-group mb-2 labela">
                        <label>ID</label>     
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <input  class="form-control" id="inputID${stanica.id.toString()}" placeholder="ID vozila">
                    </div>
                    <div class="fake">
                    </div>
                </div>  

                <div class="red">
                    <div class="form-group mb-2 labela">
                       <label>Kolicina</label>     
                    </div>
                    <div class="form-group mx-sm-3 mb-2">
                        <input type="number" class="form-control" id="inputKolicina${stanica.id.toString()}" placeholder="kWh">
                    </div>
                    <div class="fake" id="poruka${stanica.id.toString()}">
                        
                    </div>
                </div>

                <div class="red">
                    <div class="form-group mb-2 labela">
                        <label id="labelCena${stanica.id.toString()}">Cena</label>     
                    </div>
                    <div class="fakeInput" id="fakeInput${stanica.id.toString()}">
                        <div id="proveriButton${stanica.id.toString()}" data-id="${stanica.id.toString()}" class=" proveriButton btn btn-primary mb-2 srednji">Proveri</div>
                    </div>
                    <button type="submit" id="napuniVozilo${stanica.id.toString()}" class="btn btn-primary mb-2  napuniVozilo" data-id="${stanica.id.toString()}">Napuni</button>
                </div>  
            </div>

            <div class="voziloBaterija" id="voziloBaterija${stanica.id.toString()}">
            </div>
        </div>

    </form>`
    
}

function dodajListenerDugmicima(){
    let buttons:NodeListOf<Element> = document.querySelectorAll(".proveriButton");
    buttons.forEach((button)=>{
        
        button.addEventListener("click", (event:Event) => {
            
                let idStanice = parseInt(button.getAttribute("data-id"));

                let inputId: HTMLInputElement =  document.getElementById("inputID" + idStanice) as HTMLInputElement;
                let idVozilaString: string = inputId.value;
                let idVozila: number = parseInt(idVozilaString);

                let inputKolicina:HTMLInputElement = document.getElementById("inputKolicina" + idStanice) as HTMLInputElement;

                let inputKolicinaString: string = inputKolicina.value;
                let kolicina = parseInt(inputKolicinaString);
                kolicina = kolicina - (kolicina % 5);
                inputKolicina.value = kolicina.toString();

                const divPoruke: HTMLDivElement = document.getElementById("poruka" + idStanice) as HTMLDivElement;

                const bat:HTMLDivElement = document.getElementById("voziloBaterija" + idStanice)as HTMLDivElement;
                crtajBaterijuVozila(idVozila, bat);
                

                if(idVozilaString && inputKolicinaString){
                    divPoruke.innerHTML ="";
                    let cenaLabel: HTMLLabelElement = document.getElementById("labelCena" + idStanice) as HTMLLabelElement;
                    odrediCenu(idStanice, kolicina).subscribe((cena:Number) => {
                        cenaLabel.innerHTML = "Cena: " + cena.toString();
                    })

                    let divZaBateriju: HTMLDivElement = document.getElementById("voziloBaterija" + idStanice) as HTMLDivElement;
                    crtajBaterijuVozila(idVozila, divZaBateriju);   
                }
                else{
                    let stanicaDiv:HTMLDivElement = document.getElementById("stanicaForm") as HTMLDivElement;
                    let divZaBateriju: HTMLDivElement = document.getElementById("voziloBaterija" + idStanice) as HTMLDivElement;
                    divZaBateriju.style.backgroundColor = stanicaDiv.style. backgroundColor;
                    divPoruke.style.color = "red";
                    divPoruke.innerHTML = "Unesi sve!"
                }
        })
    })
}

export function napuniVoziloListener(){
    let buttons:NodeListOf<Element> = document.querySelectorAll(".napuniVozilo");
    buttons.forEach((button) => {
        button.addEventListener("click", (event:Event) => {
            event.preventDefault(); 
            let idStanice = parseInt(button.getAttribute("data-id"));

            let inputId: HTMLInputElement =  document.getElementById("inputID" + idStanice) as HTMLInputElement;
            let idVozilaString: string = inputId.value;
            let idVozila: number = parseInt(idVozilaString);

            let inputKolicina:HTMLInputElement = document.getElementById("inputKolicina" + idStanice) as HTMLInputElement;
            let inputKolicinaString: string = inputKolicina.value;
            let kolicina = parseInt(inputKolicinaString);
            kolicina = kolicina - (kolicina % 5);
            inputKolicina.value= kolicina.toString();

            let zaPunjenje:number;

            const batStanice:HTMLDivElement = document.getElementById("stanicaBaterija" + idStanice) as HTMLDivElement;


            getVoziloById(idVozila).subscribe((vozilo:Vozila) => {
                let slobodno:number = vozilo.kapacitet - vozilo.stanje;
                if(slobodno<kolicina)
                    zaPunjenje = slobodno;
                else zaPunjenje = kolicina;

                if(zaPunjenje > 5){
                    obaviPunjenje(idStanice, idVozila, zaPunjenje);  
                    setTimeout(() => {
                        crtajBaterijuStanice(idStanice, batStanice);
                    },500);
                }
            })
            

            //obaviPunjenje(idStanice, idVozila, kolicina);
            const timerPregrevanje = timer(30000);
           
            setTimeout(() => {
                let napunjeno: number = 0;
                let zaTake: number = zaPunjenje / 5;


                interval(1000)            
                .pipe(
                    map(() => {
                        return from(getVoziloById(idVozila))
                    }),
                    take(zaTake),
                    takeUntil(timerPregrevanje)                    
                ).subscribe((obs) => {
                    obs.subscribe((vozilo: Vozila) => {
                        
                        puniZaPet(idStanice, idVozila, zaPunjenje);
                        
                        napunjeno+=5;
                        zaPunjenje -= 5;
                    })
                    
                })

            }, 500);
        })
    })
}

export function napuniStanicuListener(){
    let buttons:NodeListOf<Element> = document.querySelectorAll(".napuniStanicu");
    buttons.forEach((button) => {
        button.addEventListener("click", (event:Event) => {
            event.preventDefault(); 
            let idStanice = parseInt(button.getAttribute("data-id"));

            puniStanicuDoVrha(idStanice);
            const batStanice:HTMLDivElement = document.getElementById("stanicaBaterija" + idStanice) as HTMLDivElement;
            setTimeout(() => {
                crtajBaterijuStanice(idStanice, batStanice);
            }, 500)
            
        })
    })
}

export function showView2(host){
    host.innerHTML = "";
    const divSveStanice: HTMLDivElement = document.createElement("div");
    divSveStanice.className = "divSveStanice";
    host.appendChild(divSveStanice);

   
    crtajSveStanice2(divSveStanice);
    setTimeout(()=>{
        let buttons:NodeListOf<Element> = document.querySelectorAll(".napuniVozilo");
        let clicks:Array<Observable<any>> = new Array<Observable<any>>();
        buttons.forEach((button: HTMLButtonElement) => {
            clicks.push(fromEvent(button, "click"));
        })

        // let allClicks;
        // clicks.forEach((click) => {
        //     allClicks = merge(click);
        // })
        merge(clicks).subscribe((obs)=>{
            obs.subscribe(click => {
                const lbl:HTMLLabelElement = document.getElementById("lblInfo") as HTMLLabelElement;
                let idStanice = click.path[0].getAttribute("data-id");
                lbl.innerHTML = "Stanica " + idStanice +  " prima novo vozilo";
            })
        })
    },500);
   

       

}

export function crtajVrhStranice(host){
    host.innerHTML = 
    `<div class="mr-auto p-2 topDiv" id="searchDiv" >
        <button type="submit" id="prikaziHome" class="btn btn-primary mb-2 prikaziHome" >Home</button>
        <button type="submit" id="prikaziTabelu" class="btn btn-primary mb-2 prikaziTabelu" >Stanice</button>
        <label class="lblTop" id="searchLabel">Proveri stanje stanice: </label>
        <input id="searchInput" class="form-control srednji inputTop" />
        <label class="lblTopProcenat" id="responseLabel" style="color: green;"></label>
        
        <button type="submit" id="prazniVozila" class="btn btn-primary mb-2 prazniVozila" >Prazni </button>
        <input id="searchIDInput" class="form-control srednji inputIdTop" />
        <label class="lblInfo" id="lblInfo" ></label>

    </div>`

    const searchInput: HTMLInputElement = document.getElementById("searchInput") as HTMLInputElement;
    const responseLabel: HTMLLabelElement = document.getElementById("responseLabel") as HTMLLabelElement;
    responseLabel.style.width = "100px";

    


    const prikazTebele:HTMLButtonElement = document.getElementById("prikaziTabelu") as HTMLButtonElement;
    const prikazHome:HTMLButtonElement = document.getElementById("prikaziHome") as HTMLButtonElement;
    const prazniVozila:HTMLButtonElement = document.getElementById("prazniVozila") as HTMLButtonElement;

    setTimeout(() => {
        prikazTebele.addEventListener("click", (event: Event) => {
            document.getElementById("startDiv").innerHTML ="";
            crtajTabeluStanica(document.getElementById("startDiv"));
        })

        prikazHome.addEventListener("click", (event: Event) => {
            document.getElementById("startDiv").innerHTML ="";
            showView2(document.getElementById("startDiv"));
        })

        prazniVozila.addEventListener("click" , (event:Event) => {
            const searchIDInput: HTMLInputElement = document.getElementById("searchIDInput") as HTMLInputElement;
            let idString:string = searchIDInput.value;
            let idZaPraznjenje: number = parseInt(searchIDInput.value);
            prazniVozilo(idZaPraznjenje); 
        })
    },500);

    fromEvent(searchInput, 'input')
      .pipe(
        debounceTime(500),
        map((ev: any) => ev.target.value),
        switchMap((id: number) =>
          getStanicaById(id)
        )
      )
      .subscribe((stanica: Stanica) => {
        if(stanica.id){
            responseLabel.innerHTML = ((stanica.stanje/stanica.kapacitet)*100).toString() +"%";
            responseLabel.style.color = "green";
        }
        else{
            responseLabel.innerHTML = "Pogresan ID";
            responseLabel.style.color = "red";
        }

        if (searchInput.value == '') {
          responseLabel.innerHTML = '';
        }
      });
}

export function praviNizDugmica(){
    let nizDugmica:Array<HTMLElement> = new Array<HTMLButtonElement>();
    nizDugmica.push(document.getElementById("proveriButton1"));
    nizDugmica.push(document.getElementById("proveriButton2"));
    nizDugmica.push(document.getElementById("proveriButton3"));
    nizDugmica.push(document.getElementById("proveriButton4"));

    return nizDugmica;
}

function dodajListenereDugmadima(dugmad, idStanice){
    dugmad.forEach(dugme => {
        dugme.addEventListener("click", (event: Event) => {
        event.preventDefault();
        let input:HTMLInputElement = document.createElement("input");
        input = document.getElementById("inputID" + idStanice.toString()) as HTMLInputElement;
        let idVozilaString: string = input.value;
        let idVozila = parseInt(idVozilaString);
        })
    })
}

export function crtajSveStanice2(host){
    getStanice().subscribe((stanice: Array<Stanica>) => {
        stanice.map((stanica: Stanica) => {
            crtajStanicu2(stanica, host);
            const batDiv:HTMLDivElement = document.getElementById("stanicaBaterija" + stanica.id) as HTMLDivElement;
        })
        dodajListenerDugmicima();
        napuniVoziloListener();
        napuniStanicuListener();
    })
}

