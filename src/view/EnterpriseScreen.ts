import promptSync from "prompt-sync";
import EnterpriseController from "../controllers/EnterpriseController";
import Enterprise from "../models/Enterprise";
import Router from "../Router";
import Database from "../database/Database";

export default class EnterpriseScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();
    private enterpriseController: EnterpriseController;

    constructor(router: Router) {
        this.router = router;
        this.enterpriseController = new EnterpriseController(this.db);
    }

    // Método para registrar uma nova empresa
    public registerEnterprise(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Cadastro de Empresa");
        console.log("-------------------------------------------------------------------------------");

        let enterprise: Enterprise = this.enterpriseController.getNewEnterprise();

        // Obter os dados da empresa
        enterprise.setName(this.prompt("Informe a Razão Social: "));
        enterprise.setEmail(this.prompt("Informe o e-mail: "));
        enterprise.setPassword(this.prompt("Informe a senha: "));
        
        // Registrar no banco de dados (controlador se encarrega de gerar o ID)
        this.enterpriseController.registerNewEnterprise(enterprise);

        console.log("Empresa registrada com sucesso!");
        this.router.navigateToPrimaryScreen();
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
