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

        // Obter os dados do desenvolvedor
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar emails
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Senha com pelo menos 8 caracteres, 1 letra e 1 número

        // Obter os dados da empresa
        let name = this.inputService.promptWithCancel("Informe a Razão Social: ");
        if (name === null) return;

        let email: string | null;
        do {
            email = this.inputService.promptWithCancel("Informe o e-mail: ");
            if (email === null) return;
            if (!emailRegex.test(email)) {
                console.log("Erro: O email inserido é inválido. Tente novamente.");
            }
        } while (!emailRegex.test(email));

        let password: string | null;
        do {
            password = this.inputService.promptWithCancel("Informe a senha: ");
            if (password === null) return;
            if (!passwordRegex.test(password)) {
                console.log("Erro: A senha deve ter pelo menos 8 caracteres, incluindo uma letra e um número. Tente novamente")
            }
        } while (!passwordRegex.test(password));



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
        console.log(`Opções de Gerenciamento de Vaga:`);
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
                this.vacancyEnterprise(userId);
                break;
            case "4":
                this.deleteVacancy(userId);
                this.vacancyEnterprise(userId);
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
        console.log("Criar Nova Vaga : Digite 'B' para Cancelar");
        console.log("-------------------------------------------------------------------------------");
    
        const enterpriseId = userId; // Usando userId como enterpriseId para simplificação
    
        const title = this.getInputWithValidation("Título da vaga");
        if (!title) {
            this.dashboardEnterprise(userId);
            return;
        }
    
        const description = this.getInputWithValidation("Descrição");
        if (!description) {
            this.dashboardEnterprise(userId);
            return;
        }
    
        const requirementsInput = this.getInputWithValidation("Requisitos (separados por vírgula)");
        if (!requirementsInput) {
            this.dashboardEnterprise(userId);
            return;
        }
    
        const requirements = requirementsInput.split(",").map(req => req.trim()).filter(req => req.length > 0);
        if (requirements.length === 0) {
            console.log("Você deve fornecer pelo menos um requisito.");
            this.dashboardEnterprise(userId);
            return;
        }
    
        const language = this.getInputWithValidation("Linguagem desejada");
        if (!language) {
            this.dashboardEnterprise(userId);
            return;
        }
    
        // Chamada para o controller usando o serviço
        this.vacancyController.createVacancy(enterpriseId, title, description, requirements, language);
        console.log("Vaga criada com sucesso!");
        this.vacancyEnterprise(userId);
    }
    
    private getInputWithValidation(promptMessage: string): string | null {
        while (true) {
            // Utilizando o serviço diretamente
            const input = this.inputService.promptWithCancel(`${promptMessage}: `);
    
            if (input === null) {
                console.log("Operação cancelada."); // Feedback amigável
                return null;
            }
    
            if (input.trim().length > 0) {
                return input.trim(); // Retorna somente se válido
            }
    
            console.log("Entrada inválida. Por favor, tente novamente."); // Reitera o erro
        }
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
        } finally {

        }

        this.vacancyEnterprise(userId);
    }


}
