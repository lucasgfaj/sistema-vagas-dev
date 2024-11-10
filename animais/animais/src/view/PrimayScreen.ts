import promptSync from "prompt-sync";
import AnimalScreen from "./AnimalScreen";
import Router from "../control/Router";

export default class PrimaryScreen {

    private prompt = promptSync();
    private animalScreen!: AnimalScreen;
    private router!: Router;

    constructor(router: Router) {
        this.router = router;
        this.animalScreen = new AnimalScreen(this.router);
    }


    public getFirstScreen(): void {
        let showScreen: boolean = true;
        while (showScreen) {
            //isto é apresentado no terminal e coletada a entrada do user
            let choice = this.prompt(
                "Escolha:\n1 - Cadastrar \n2 - Listar\n3 - Atualizar\n4 - Apagar\n5 - Sair"
            );

            switch (choice) {
                case "1":
                    let choice2 = this.prompt("Escolha:\n1 - Cadastrar Animais\n2 - Cadastrar Proprietários")
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