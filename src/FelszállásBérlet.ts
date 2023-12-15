import Felszállás from "./Felszállás";

export default class FelszállásBérlet extends Felszállás {
    #típus: string;
    #érvényes: Date;

    get ezÉrvényesFelszállás():boolean {
        return this.#érvényes >= this._idő;
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
