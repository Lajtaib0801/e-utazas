import Felszállás from "./Felszállás";

export default class FelszállásJegy extends Felszállás {
    #jegyekSzáma: number;

    constructor(sor: string) {
        super(sor); //meghívja az ősosztály ctorát
        this.#jegyekSzáma = parseInt(sor.split(" ")[4]);
    }
}
