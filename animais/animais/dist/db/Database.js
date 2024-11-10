"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Animal_1 = __importDefault(require("../model/Animal"));
class Database {
    constructor() {
        this.animals = [];
        this.addresses = [];
    }
    addNewAnimal(animal) {
        this.animals.push(animal);
        console.log(this.animals);
    }
    getAnimalByIndex(index) {
        return this.animals[index];
    }
    getAnimalByName(name) {
        for (let i = 0; i < this.animals.length; i++) {
            if (this.animals[i].getName() == name) {
                return this.animals[i];
            }
        }
        console.log("DEU RUIM");
        return new Animal_1.default();
    }
}
exports.default = Database;
