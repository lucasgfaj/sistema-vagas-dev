import Animal from "../Animal";

export default class AnimalDomestico extends Animal {
    private petShop: string;
    private owner: string;

    constructor(id: number, name: string, specie: string, breed: string, gender: string, petShop: string, owner: string){
    super (id, name, specie, breed, gender);
    this.petShop = petShop;
    this.owner = owner;
}

public getPetShop(): string {
    return this.petShop;
}

public setPetShop(petShop: string): void{
    this.petShop = petShop;
}

public getOwner(): string {
    return this.owner;
}

public setOwner(onwer: string): void{
    this.owner = onwer;
}



}