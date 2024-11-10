"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animal {
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getSpecie() {
        return this.specie;
    }
    setSpecie(specie) {
        this.specie = specie;
    }
    getGender() {
        return this.gender;
    }
    setGender(gender) {
        this.gender = gender;
    }
    getBreed() {
        return this.breed;
    }
    setBreed(breed) {
        this.breed = breed;
    }
}
exports.default = Animal;
