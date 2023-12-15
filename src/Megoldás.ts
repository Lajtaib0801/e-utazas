import Felszállás from "./Felszállás";
import fs from "fs";
import FelszállásJegy from "./FelszállásJegy";
import FelszállásBérlet from "./FelszállásBérlet";

export interface IMaxMegálló {
    megálló: number;
    felszálló: number;
}

export default class Megoldás {
    #utasadatok: Felszállás[] = [];

    get utasokSzáma(): number {
        return this.#utasadatok.length;
    }

    get érvénytelenFelszállásokSzáma(): number {
        let db: number = 0;
        for (const e of this.#utasadatok) {
            if (!e.ezÉrvényesFelszállás) {
                db++;
            }
        }
        return db;
    }

    get maxMegálló(): IMaxMegálló {
        let max: IMaxMegálló = { felszálló: -1, megálló: -1 };

        let aktMegálló: number = 0;
        let aktFelszálló: number = 0;
        for (const e of this.#utasadatok) {
            if (e.megállóSorszáma == aktMegálló) {
                aktFelszálló++;
            } else {
                if (aktFelszálló > max.felszálló) {
                    max.felszálló = aktFelszálló;
                    max.megálló = aktMegálló;
                }
                aktMegálló = e.megállóSorszáma;
                aktFelszálló = 1;
            }
        }
        //29-es megálló ellenőrzése
        if (aktFelszálló > max.felszálló) {
            max.felszálló = aktFelszálló;
            max.megálló = aktMegálló;
        }
        return max;
    }

    get maxMegállóVektor(): IMaxMegálló {
        let max: IMaxMegálló = { felszálló: -1, megálló: -1 };
        const stat: number[] = new Array(30).fill(0);
        for (const e of this.#utasadatok) stat[e.megállóSorszáma]++;
        max.felszálló = Math.max(...stat);
        max.megálló = stat.indexOf(max.felszálló);
        return max;
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim();
                const típus: string = aktSor.split(" ")[3];
                if (típus == "JGY") {
                    this.#utasadatok.push(new FelszállásJegy(aktSor));
                }
                if (["FEB", "TAB", "NYB", "NYP", "RVS", "GYK"].includes(típus)) {
                    this.#utasadatok.push(new FelszállásBérlet(aktSor));
                }
            });
    }
}
