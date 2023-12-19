import Felszállás from "./Felszállás";
import Segéd from "./Segéd";

export default class FelszállásBérlet extends Felszállás {
    #típus: string;
    #érvényes: Date;

    get ezIngyenes(): boolean {
        return ["NYP", "RVS", "GYK"].includes(this.#típus);
    }

    get ezKedvezményes(): boolean {
        return ["TAB", "NYB"].includes(this.#típus);
    }

    get ezÉrvényesFelszállás(): boolean {
        return this.#érvényes.valueOf() >= this._idő.valueOf();
    }

    get ezLejárHáromNap(): boolean {
        const e1: number = this._idő.getFullYear();
        const h1: number = this._idő.getMonth();
        const n1: number = this._idő.getDate();
        const e2: number = this._idő.getFullYear();
        const h2: number = this._idő.getMonth();
        const n2: number = this._idő.getDate();
        return this.ezÉrvényesFelszállás && Segéd.napokszama(e1, h1, n1, e2, h2, n2) <= 3;
    }

    get ezLejárHáromNapSaját(): boolean {
        const érvényesMs: number = this.#érvényes.valueOf();
        const utazásNapjaMs: number = this._idő.valueOf();
        const diff: number = érvényesMs - utazásNapjaMs;
        return this.ezÉrvényesFelszállás && ~~(diff / (24 * 60 * 60 * 1000)) <= 3;
    }

    get állománySora(): string {
        return `${this._kártyaAzon} ${this.#érvényes.toLocaleDateString()}`
    }
    constructor(sor: string) {
        super(sor);
        const m: string[] = sor.split(" ");
        this.#típus = m[3];
        const év: number = parseInt(m[4].substring(0, 4));
        const hónap: number = parseInt(m[4].substring(4, 6));
        const nap: number = parseInt(m[4].substring(6, 8));
        this.#érvényes = new Date(év, hónap - 1, nap, 23, 59, 59, 999);
    }
}
