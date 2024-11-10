"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class AnimalScreen {
    constructor(router) {
        this.prompt = (0, prompt_sync_1.default)();
        this.router = router;
    }
    // este método requisita as informações para cadastro de animais
    registerAnimal() {
        // para registrar um novo animal, precisamos da estrutura
        // de dados de um animal "Animal.ts".
        let animal = this.router.animalCrontroller.getNewAnimal();
        // peço o nome
        let animalName = this.prompt("Digite o nome do animal");
        animal.setName(animalName);
        // peço a raça
        let animalBreed = this.prompt("Digite o raça do animal");
        animal.setBreed(animalBreed);
        // hora de chamar o AnimalController para gravar nosso 
        //animal no banco
        this.router.animalCrontroller.registerNewAnimal(animal);
    }
}
exports.default = AnimalScreen;
