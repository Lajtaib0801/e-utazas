export default abstract class Felszállás {
    protected megállóSorszáma: number;
    protected idő: Date;
    protected kártyaAzon: string;

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this.megállóSorszáma = parseInt(m[0]);
        const d: string = m[1];
        const év: number = parseInt(d.substring(0, 4));
        const hónap: number = parseInt(d.substring(4, 6));
        const nap: number = parseInt(d.substring(6, 8));
        const óra: number = parseInt(d.substring(9, 11));
        const perc: number = parseInt(d.substring(11, 13));
        this.idő = new Date(év, hónap - 1, nap, óra, perc, 0, 0);
        this.kártyaAzon = m[2];
    }
}
