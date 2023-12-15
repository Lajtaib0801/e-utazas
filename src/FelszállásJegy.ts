import Felszállás from "./Felszállás";

export default class FelszállásJegy extends Felszállás {
    #jegyekSzáma: number;

    get ezÉrvényesFelszállás():boolean {
        return this.#jegyekSzáma > 0;
    }

    constructor(sor: string) {
        super(sor); //meghívja az ősosztály ctorát
        this.#jegyekSzáma = parseInt(sor.split(" ")[4]);
    }
}
