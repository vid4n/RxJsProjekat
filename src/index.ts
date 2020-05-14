import { showView2, napuniVoziloListener, crtajBaterijuVozila, crtajVrhStranice, crtajTabeluStanica } from "./draw/drawStanica";
import { mozeSeIzvrsitiPunjenje } from "./services/StanicaService";
import { obaviPunjenje } from "./services/UpdateService";
import { getVozila } from "./services/VoziloService";
import { Vozila } from "./models/Vozila";



crtajVrhStranice(document.getElementById("topDiv"));
//crtajTabeluStanica(document.getElementById("tabelaDiv"));
showView2(document.getElementById("startDiv"));     


