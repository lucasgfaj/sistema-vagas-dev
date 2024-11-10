"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Animal_1 = __importDefault(require("../model/Animal"));
class AnimalController {
    constructor(db) {
        this.db = db;
    }
    getNewAnimal() {
        return new Animal_1.default();
    }
    registerNewAnimal(animal) {
        this.db.addNewAnimal(animal);
    }
}
exports.default = AnimalController;
