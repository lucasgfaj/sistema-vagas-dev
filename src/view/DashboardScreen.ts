import promptSync from "prompt-sync";
import Router from "../Router";
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
               // Acessar Vagas Developer
                this.router.navigateToVacancyScreenDeveloper();
                break;
            case "2":
              // Gerenciar as habilidades do usuário
                this.router.navigateToSkillsScreen();
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
                // Gerenciar Vagas
                this.router.navigateToVacancyScreenEnterprise();
                break;
            case "2":
                // Voltar para a tela PrimaryScreen
                this.router.navigateToPrimaryScreen();
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.dashboardEnterprise(); // Reexibir o menu
        }
    }
}