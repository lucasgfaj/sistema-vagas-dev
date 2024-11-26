// DeveloperScreen.ts
import promptSync from "prompt-sync";
import DeveloperController from "../controllers/DeveloperController";
import Developer from "../models/Developer";
import Router from "../Router";
import Database from "../database/Database";

export default class DeveloperScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();
    private developerController: DeveloperController;

    constructor(router: Router) {
        this.router = router;
        this.developerController = new DeveloperController(this.db);
    }

    // Método para registrar um novo desenvolvedor
    public registerDeveloper(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Cadastro de Desenvolvedor");
        console.log("-------------------------------------------------------------------------------");

        let developer: Developer = this.developerController.getNewDeveloper();

        // Obter os dados do desenvolvedor
        developer.setName(this.prompt("Informe seu Nome: "));
        developer.setEmail(this.prompt("Informe o e-mail: "));
        developer.setPassword(this.prompt("Informe a senha: "));
        
        // Registrar as habilidades
        const skills = this.developerController.registerSkills();
        developer.setSkills(skills);

        // Registrar no banco de dados (controlador se encarrega de gerar o ID)
        this.developerController.registerNewDeveloper(developer);

        console.log("Desenvolvedor registrado com sucesso!");
        this.router.navigateToPrimaryScreen();
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

    public skillsDeveloper(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log(`Opções de Habilidades - Developer (Inserir Nome):`);
        console.log("");
        console.log("1 - Listar Habilidades");
        console.log("2 - Adicionar");
        console.log("3 - Remover");
        console.log("4 - Volta ao Menu");
        console.log("-------------------------------------------------------------------------------");

        const choice = this.prompt("Digite a opção desejada: ").trim();

        switch (choice) {
            case "1":
             // Listar Habilidades
                break;
            case "2":
             // Adicionar Habilidades
                break;
            case "3":
             // Remover Habilidades
                break;
            case "4":
                this.router.navigateToDashboardDeveloper(); // Voltar para Dashboard
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.skillsDeveloper(); // Reexibir o menu
        }
    }

}
