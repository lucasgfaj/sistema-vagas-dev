"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const AnimalScreen_1 = __importDefault(require("./AnimalScreen"));
class PrimaryScreen {
    constructor(router) {
        this.prompt = (0, prompt_sync_1.default)();
        this.router = router;
        this.animalScreen = new AnimalScreen_1.default(this.router);
    }
    getFirstScreen() {
        let showScreen = true;
        while (showScreen) {
            //isto é apresentado no terminal e coletada a entrada do user
            let choice = this.prompt("Escolha:\n1 - Cadastrar \n2 - Listar\n3 - Atualizar\n4 - Apagar\n5 - Sair");
            switch (choice) {
                case "1":
                    let choice2 = this.prompt("Escolha:\n1 - Cadastrar Animais\n2 - Cadastrar Proprietários");
                    switch (choice2) {
                        case "1":
                            //aqui chamo a tela de cadastro de animais
                            this.animalScreen.registerAnimal();
                            break;
                    }
                    break;
                case "2":
                    console.log("digitou 2");
                    break;
                case "3":
                    console.log("digitou 3");
                    break;
                case "4":
                    console.log("digitou 4");
                    break;
                case "5":
                    showScreen = false;
                    break;
                default:
                    console.log("Invalid answer!");
            }
        }
    }
}
exports.default = PrimaryScreen;
