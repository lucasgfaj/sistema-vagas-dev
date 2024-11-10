export default class Address {

    private street: string;
    private nr: number;

    constructor(street: string, nr: number) {
        this.street = street;
        this.nr = nr;
    }

    public setStreet(street: string): void{
        this.street = street;
    }
    public getStreet(): string{
        return this.street;
    }

    public setNr(nr: number): void{
        this.nr = nr;
    }
    public getNr(): number{
        return this.nr;
    }

}