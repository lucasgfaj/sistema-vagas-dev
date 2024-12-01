import promptSync from "prompt-sync";
import EnterpriseController from "../controllers/EnterpriseController";
import Enterprise from "../models/Enterprise";
import Router from "../Router";
import Database from "../database/Database";
import VacancyController from "../controllers/VacancyController";

export default class EnterpriseScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();
    private enterpriseController: EnterpriseController;
    private vacancyController: VacancyController;

    constructor(router: Router) {
        this.router = router;
        this.enterpriseController = new EnterpriseController(this.db);
        this.vacancyController = new VacancyController(this.db);
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
        console.log("4 - Deletar Vaga");
        console.log("5 - Voltar ao Menu");
        console.log("-------------------------------------------------------------------------------");
    
        const choice = this.prompt("Digite a opção desejada: ").trim();
    
        switch (choice) {
            case "1":
                this.createVacancy();
                break;
            case "2":
                this.listVacancies();
                break;
            case "3":
                this.listCandidates();
                break;
            case "4":
                this.deleteVacancy();
                break;
            case "5":
                this.router.navigateToDashboardEnterprise();
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.vacancyEnterprise();
        }
    }
    
    private createVacancy(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Criar Nova Vaga");
        console.log("-------------------------------------------------------------------------------");
    
        const title = this.prompt("Título da vaga: ").trim();
        const description = this.prompt("Descrição: ").trim();
        const requirements = this.prompt("Requisitos (separados por vírgula): ").trim().split(",");
        const language = this.prompt("Linguagem desejada: ").trim();
    
        this.vacancyController.createVacancy(title, description, requirements, language);
        console.log("Vaga criada com sucesso!");
        this.vacancyEnterprise();
    }
    
    private listVacancies(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Minhas Vagas");
        console.log("-------------------------------------------------------------------------------");
    
        const vacancies = this.vacancyController.listVacancies();
        if (vacancies.length === 0) {
            console.log("Nenhuma vaga cadastrada.");
        } else {
            vacancies.forEach(v => {
                console.log(`ID: ${v.getId()}`);
                console.log(`Título: ${v.getTitle()}`);
                console.log(`Descrição: ${v.getDescription()}`);
                console.log(`Linguagem: ${v.getLanguage()}`);
                console.log("-------------------------------------------------------------------------------");
            });
        }
        this.vacancyEnterprise();
    }
    
    private listCandidates(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Ver Candidatos de uma Vaga");
        console.log("-------------------------------------------------------------------------------");
    
        const title = this.prompt("Informe o título da vaga: ").trim();
    
        try {
            const candidates = this.vacancyController.getCandidatesForVacancy(title);
            if (candidates.length === 0) {
                console.log(`Nenhum candidato para a vaga "${title}".`);
            } else {
                console.log(`Candidatos para a vaga "${title}":`);
                candidates.forEach((candidate, index) => {
                    console.log(`${index + 1}. ${candidate}`);
                });
            }
        } catch (error) {
            console.log("Ocorreu um erro ao listar candidatos.");
        }
    
        this.vacancyEnterprise();
    }
    
    private deleteVacancy(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Deletar Vaga");
        console.log("-------------------------------------------------------------------------------");
    
        const title = this.prompt("Informe o título da vaga a ser deletada: ").trim();
    
        try {
            this.vacancyController.deleteVacancy(title);
            console.log(`Vaga "${title}" deletada com sucesso.`);
        } catch (error) {
            console.log("Ocorreu um erro ao remover.");
        }
    
        this.vacancyEnterprise();
    }
    
}
