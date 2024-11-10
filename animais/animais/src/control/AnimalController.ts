import Database from "../db/Database";
import Animal from "../model/Animal";

export default class AnimalController {

    private db!: Database;

    constructor(db: Database) {
        this.db = db;
    }


    public getNewAnimal(): Animal {
        return new Animal();
    }

    public registerNewAnimal(animal: Animal): void {
       this.db.addNewAnimal(animal);
    }



}