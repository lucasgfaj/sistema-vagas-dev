import promptSync from "prompt-sync";
import EnterpriseController from "../controllers/EnterpriseController";
import Enterprise from "../models/Enterprise";
import Router from "../Router";
import Database from "../database/Database";
import VacancyController from "../controllers/VacancyController";
import ProviderErrors from "../models/ProviderError";
import InputService from "../services/input.service";


export default class EnterpriseScreen {
    private inputService: InputService;
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();
    private enterpriseController: EnterpriseController;
    private vacancyController: VacancyController;
    
    

    constructor(router: Router) {
        this.router = router;
        this.inputService = new InputService();
        this.enterpriseController = new EnterpriseController(this.db);
        this.vacancyController = new VacancyController(this.db);
    }

    // Método para registrar uma nova empresa
    public registerEnterprise(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Cadastro de Empresa :  Digte B para Cancelar");
        console.log("-------------------------------------------------------------------------------");

        let enterprise: Enterprise = this.enterpriseController.getNewEnterprise();

        // Obter os dados da empresa
        const name = this.inputService.promptWithCancel("Informe a Razão Social: ");
        if (name === null) return
        const email = this.inputService.promptWithCancel("Informe o e-mail: ");
        if (email === null) return
        const password = this.inputService.promptWithCancel("Informe a senha: ");
        if  (password === null) return
        
        enterprise.setName(name);
        enterprise.setEmail(email);
        enterprise.setPassword(password);


        
        // Registrar no banco de dados (controlador se encarrega de gerar o ID)
        this.enterpriseController.registerNewEnterprise(enterprise);

        console.log("Empresa registrada com sucesso!");
        this.router.navigateToPrimaryScreen();
    }

    public dashboardEnterprise(userId: number): void {
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
                this.router.navigateToVacancyScreenEnterprise(userId);
                break;
            case "2":
                // Voltar para a tela PrimaryScreen
                this.router.navigateToPrimaryScreen();
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.dashboardEnterprise(userId); // Reexibir o menu
        }
    }

    public vacancyEnterprise(userId: number): void {
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
                this.createVacancy(userId);
                break;
            case "2":
                this.listVacancies(userId);
                break;
            case "3":
                this.listCandidates(userId);
                break;
            case "4":
                this.deleteVacancy(userId);
                break;
            case "5":
                this.router.navigateToDashboardEnterprise(userId);
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.");
                this.vacancyEnterprise(userId);
        }
    }
    
    private createVacancy(userId: number): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Criar Nova Vaga");
        console.log("-------------------------------------------------------------------------------");
    
        // Garantir que o usuário que está criando a vaga é uma empresa
        const enterpriseId = userId;  // Usando userId como enterpriseId para simplificação
    
        const title = this.prompt("Título da vaga: ").trim();
        if (title.trim().toLowerCase() === "4") this.vacancyEnterprise(userId);
        const description = this.prompt("Descrição: ").trim();
        if (description.trim().toLowerCase() === "4") this.vacancyEnterprise(userId);
        const requirements = this.prompt("Requisitos (separados por vírgula): ").trim().split(",");
        const language = this.prompt("Linguagem desejada: ").trim();
        if (language.trim().toLowerCase() === "4") this.vacancyEnterprise(userId);
    
        // Passando o enterpriseId corretamente
        this.vacancyController.createVacancy(enterpriseId, title, description, requirements, language);
        console.log("Vaga criada com sucesso!");
        this.vacancyEnterprise(userId);
    }
    
    private listVacancies(userId: number): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Minhas Vagas");
        console.log("-------------------------------------------------------------------------------");
    
        // Usando listVacanciesByEnterprise para listar as vagas da empresa com userId (enterpriseId)
        const vacancies = this.vacancyController.listVacanciesByEnterprise(userId);
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
        this.vacancyEnterprise(userId);
    }
    
    
    private listCandidates(userId: number): void {
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
    
        this.vacancyEnterprise(userId);
    }
    
    public deleteVacancy(userId: number): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Deletar Vaga");
        console.log("-------------------------------------------------------------------------------");
    
        // Solicita o ID da vaga a ser deletada
        const vacancyId = parseInt(this.prompt("Informe o ID da vaga a ser deletada: ").trim());
    
        try {
            // Passando o enterpriseId (userId) e o vacancyId para a remoção
            this.vacancyController.deleteVacancyById(userId, vacancyId);
            console.log(`Vaga de ID ${vacancyId} deletada com sucesso.`);
        } catch (error: any) {
           throw new ProviderErrors(2);
        }finally {

        }
    
        this.vacancyEnterprise(userId);
    }
    
    
}
