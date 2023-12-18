import fs from "fs"; //  https://nodejs.org/docs/latest-v14.x/api/fs.html
import http from "http"; //  https://nodejs.org/docs/latest-v14.x/api/http.html
import url from "url"; //  https://nodejs.org/docs/latest-v14.x/api/url.html
import Megoldás, { IMaxMegálló } from "./Megoldás";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    // favicon.ico kérés kiszolgálása:
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        fs.createReadStream("favicon.ico").pipe(res);
        return;
    }
    // Weboldal inicializálása + head rész:
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Jedlik Ts Template</title>");
    res.write("</head>");
    res.write("<body><form><pre>");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

    // Kezd a kódolást innen -->

    const mo: Megoldás = new Megoldás("utasadat.txt");
    res.write(`2. feladat\nA buszra ${mo.utasokSzáma} utas akar felszállni.\n`);
    res.write(`3. feladat\nA buszra ${mo.érvénytelenFelszállásokSzáma} utas nem szállhatott fel.\n`);
    const legtöbbFelszálló: IMaxMegálló = mo.maxMegálló;
    res.write(`3. feladat\nA legtöbb utas (${legtöbbFelszálló.felszálló} fő) a ${legtöbbFelszálló.megálló}. megállóban próbált felszállni.\n`);

    const legtöbbFelszállóVektor: IMaxMegálló = mo.maxMegállóVektor;
    res.write(`3. feladat\nA legtöbb utas (${legtöbbFelszállóVektor.felszálló} fő) a ${legtöbbFelszállóVektor.megálló}. megállóban próbált felszállni.\n`);

    res.write(`5. feladat\nIngyenesen utazók száma: ${mo.ingyenesenUtazók} fő\nA kedvezményesen utazók száma: ${mo.kedvezményesenUtazók} fő\n`);
    // <---- Fejezd be a kódolást

    res.write("</pre></form></body></html>");
    res.end();
}
