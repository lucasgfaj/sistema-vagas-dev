import promptSync from "prompt-sync";


import Router from "../Router";

export default class PrimaryScreen {

    private prompt = promptSync();
    private router!: Router;

    constructor(router: Router) {
        this.router = router;
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
                    console.log("Digitou 1");  
                    break;

                case "2":

                    console.log("Digitou 2");

                    break;
                case "3":

                    console.log("Digitou 3");

                    break;
                case "4":

                    console.log("Digitou 4");

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