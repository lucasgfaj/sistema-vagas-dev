import promptSync from "prompt-sync";
import DeveloperController from "../controllers/DeveloperController";
import Router from "../Router";
import Database from "../database/Database";
import Validator from "../models/Validator";
import VacancyController from "../controllers/VacancyController";

export default class DeveloperScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();
    private developerController: DeveloperController;
    private vacancyController: VacancyController;
    constructor(router: Router) {
        this.router = router;

        const validator = new Validator();
        this.developerController = new DeveloperController(this.db, validator); // Passando o validator
        this.vacancyController = new VacancyController(this.db)
    }

     // Método para registrar um novo desenvolvedor
     public registerDeveloper(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Cadastro de Desenvolvedor");
        console.log("-------------------------------------------------------------------------------");

        let developer = this.developerController.getNewDeveloper();

        // Obter os dados do desenvolvedor
        developer.setName(this.prompt("Informe seu Nome: "));
        developer.setEmail(this.prompt("Informe o e-mail: "));
        developer.setPassword(this.prompt("Informe a senha: "));

        // Registrar as habilidades
        const skills = this.developerController.registerSkills();
        developer.setSkills(skills);

        // Validar e registrar o desenvolvedor
        const isValid = this.developerController.validateAndRegisterDeveloper(developer);

        if (!isValid) {
            console.log("Erro no cadastro. Por favor, verifique as habilidades.");
            return; // Não continuar o fluxo caso a validação falhe
        }

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
        console.log("3 - Desistir de Candidatura");
        console.log("4 - Voltar ao Dashboard");
        console.log("-------------------------------------------------------------------------------");
    
        const choice = this.prompt("Digite a opção desejada: ").trim();
    
        switch (choice) {
          case "1":
            this.searchVacancies();
            break;
          case "2":
            this.listMyCandidatures();
            break;
          case "3":
            this.withdrawApplication();
            break;
          case "4":
            this.router.navigateToDashboardDeveloper(); // Voltar para Dashboard
            break;
          default:
            console.log("Opção inválida. Por favor, tente novamente.");
            this.vacancyDeveloper(); // Reexibir o menu
        }
      }
    
      // Buscar vagas e inscrever-se
      private searchVacancies(): void {
        console.log("-------------------------------------------------------------------------------");
        const vacancies = this.vacancyController.listVacancies();
        vacancies.forEach((vacancy, index) => {
          console.log(`${index + 1}. ${vacancy.getTitle()} - ${vacancy.getDescription()}`);
        });
    
        const vacancyChoice = this.prompt("Digite o número da vaga que deseja se inscrever: ").trim();
        const selectedVacancy = vacancies[parseInt(vacancyChoice) - 1];
        if (!selectedVacancy) {
          console.log("Vaga inválida.");
          return;
        }
    
        const developerId = 1; // Substitua pelo ID do desenvolvedor atual
        this.vacancyController.registerDeveloperToVacancy(developerId, selectedVacancy.getTitle());
      }
    
      // Listar candidaturas do desenvolvedor
      private listMyCandidatures(): void {
        console.log("-------------------------------------------------------------------------------");
        const developerId = 1; // Substitua pelo ID do desenvolvedor atual
        this.db.getVacancies().forEach(vacancy => {
          if (vacancy.getCandidates().includes(developerId)) {
            console.log(`- ${vacancy.getTitle()}`);
          }
        });
        console.log("-------------------------------------------------------------------------------");
      }
    
      // Desistir de uma candidatura
      private withdrawApplication(): void {
        console.log("-------------------------------------------------------------------------------");
        const developerId = 1; // Substitua pelo ID do desenvolvedor atual
        const vacancies = this.db.getVacancies().filter(vacancy => vacancy.getCandidates().includes(developerId));
    
        vacancies.forEach((vacancy, index) => {
          console.log(`${index + 1}. ${vacancy.getTitle()}`);
        });
    
        const choice = this.prompt("Digite o número da vaga que deseja desistir: ").trim();
        const selectedVacancy = vacancies[parseInt(choice) - 1];
        if (!selectedVacancy) {
          console.log("Vaga inválida.");
          return;
        }
    
        this.vacancyController.removeDeveloperFromVacancy(developerId, selectedVacancy.getTitle());
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
