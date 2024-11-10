import PromptSync from "prompt-sync";
import Router from "../control/Router";
import Animal from "../model/Animal";

export default class AnimalScreen {

    private prompt = PromptSync();
    private router!: Router;

    constructor(router: Router) {
        this.router = router;
    }



    // este método requisita as informações para cadastro de animais
    public registerAnimal(): void {
        // para registrar um novo animal, precisamos da estrutura
        // de dados de um animal "Animal.ts".
        let animal: Animal = this.router.animalCrontroller.getNewAnimal();
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