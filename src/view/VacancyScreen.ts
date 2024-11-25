import promptSync from "prompt-sync";
import Router from "../Router";
import Database from "../database/Database";

export default class VacancyScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();

    constructor(router: Router) {
        this.router = router;
    }

    public vacancyDeveloper(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log(`Opções de Vagas - Developer (Inserir Nome):`);
        console.log("");
        console.log("1 - Buscar Vagas");
        console.log("2 - Minhas Candidaturas");
        console.log("3 - Voltar ao Dashboard");
        console.log("-------------------------------------------------------------------------------");

        const choice = this.prompt("Digite a opção desejada: ").trim();

        switch (choice) {
            case "1":
             // Buscar Vagas
                break;
            case "2":
              // Listar Vagas do Candidato
                break;
            case "3":
                this.router.navigateToDashboardDeveloper(); // Voltar para Dashboard
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.vacancyDeveloper(); // Reexibir o menu
        }
    }

    public vacancyEnterprise(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log(`Opções de Gerenciamento de Vagas - Empresa (Inserir Nome):`);
        console.log("");
        console.log("1 - Criar Vaga");
        console.log("2 - Listar Minhas Vagas");
        console.log("3 - Ver Candidatos de uma Vaga");
        console.log("4 - Voltar ao Menu");
        console.log("-------------------------------------------------------------------------------");

        const choice = this.prompt("Digite a opção desejada: ").trim();

        switch (choice) {
            case "1":
                // Criar Vaga
                break;
            case "2":
                // Listar Minhas Vagas
                break;
            case "3":
                // Ver Candidatos de uma Vaga
                break;
            case "4":
                this.router.navigateToDashboardEnterprise();
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.vacancyEnterprise(); // Reexibir o menu
        }
    }
}