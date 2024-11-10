import Address from "../model/Address";
import Animal from "../model/Animal";

export default class Database{
    
    private animals: Animal[] = [];
    private addresses: Address[] = [];

    public addNewAnimal(animal: Animal): void{
        this.animals.push(animal);
        console.log(this.animals);
    }
    public getAnimalByIndex(index: number): Animal{
       return this.animals[index];
    }
    public getAnimalByName(name: string): Animal{
        for (let i = 0; i < this.animals.length; i++) {
            if(this.animals[i].getName() == name){
                return this.animals[i];
            }
          }
          console.log("DEU RUIM");
          return new Animal();
    }

}