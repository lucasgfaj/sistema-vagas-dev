import promptSync from "prompt-sync";
import Router from "../Router";
import User from "../models/User";
import Database from "../database/Database";

export default class DashboardScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();

    constructor(router: Router) {
        this.router = router;
    }

    public dashboardDeveloper(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log(`Bem-vindo(a), (Inserir Nome)`);
        console.log("");
        console.log("1 - Vagas");
        console.log("2 - Habilidades");
        console.log("3 - Sair");
        console.log("-------------------------------------------------------------------------------");

        const choice = this.prompt("Digite a opção desejada: ").trim();

        switch (choice) {
            case "1":
               // Você pode implementar esse método para listar as vagas
                break;
            case "2":
              // Gerenciar as habilidades do usuário
                break;
            case "3":
                this.router.navigateToPrimaryScreen(); // Voltar para a tela principal
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.dashboardDeveloper(); // Reexibir o menu
        }
    }

    public dashboardEnterprise(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log(`Bem-vindo(a), (Inserir Nome)`);
        console.log("");
        console.log("1 - Gerenciar Vagas");
        console.log("2 - Sair");
        console.log("-------------------------------------------------------------------------------");

        const choice = this.prompt("Digite a opção desejada: ").trim();

        switch (choice) {
            case "1":
                // Método para gerenciar vagas
                break;
            case "2":
                // Voltar para a tela principal
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.router.navigateToDashboardEnterprise(); // Reexibir o menu
        }
    }
}