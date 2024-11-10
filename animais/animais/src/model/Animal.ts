export default class Animal {
    private id: number;
    private name: string;
    private specie: string;
    private breed: string;
    private gender: string;
    
    constructor(id: number, name: string, specie: string, breed: string, gender: string) {
        this.id = id;
        this.name = name;
        this.specie = specie;
        this.breed = breed;
        this.gender = gender;
    }
    
    public getID(): number {
        return this.id;
    }

    public setID(id: number): void{
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public getSpecie(): string {
        return this.specie;
    }
    public setSpecie(specie: string): void {
        this.specie = specie;
    }
    public getGender(): string {
        return this.gender;
    }
    public setGender(gender: string): void {
        this.gender = gender;
    }
    public getBreed(): string {
        return this.breed;
    }
    public setBreed(breed: string): void {
        this.breed = breed;
    }
}