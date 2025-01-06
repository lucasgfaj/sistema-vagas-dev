import promptSync from "prompt-sync";
import Router from "../Router";
import Database from "../database/Database";
import ReportsController from "../controllers/ReportsController";
import path from "path";

export default class ReportsScreen {
    private prompt = promptSync();
    private router: Router;
    private reportsController!: ReportsController;

    constructor(router: Router) {
        this.router = router;
        this.reportsController = new ReportsController(); // Inicializa o ReportsController
    }

    public reportScreen(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Dashboard de Reports");
        console.log(""); 
        console.log("1 - Relatório de Todos os Usuários");
        console.log("2 - Relatório de Todas as Vagas");
        console.log("3 - Relatório de Usuários do Tipo Desenvolvedor");
        console.log("4 - Relatório de Usuários do Tipo Empresa");
        console.log("5 - Sair");
        console.log(""); 
        console.log("Os relatórios são gerados em PDF");
        console.log("");
        console.log("-------------------------------------------------------------------------------");
    
        const choice = this.prompt("Escolha uma opção: ");
        const reportsDir = path.resolve(__dirname, "../../Reports");

        switch (choice) {
            case "1":
                this.reportsController.generateAllUsersReport();
                console.log(`Relatório de todos os usuários gerado na pasta: ${reportsDir}`);
                break;
            case "2":
                this.reportsController.generateAllVacanciesReport();
                console.log(`Relatório de todas as vagas gerado na pasta: ${reportsDir}`);
                break;
            case "3":
                this.reportsController.generateDevelopersReport();
                console.log(`Relatório de desenvolvedores gerado na pasta: ${reportsDir}`);
                break;
            case "4":
                this.reportsController.generateEnterprisesReport();
                console.log(`Relatório de empresas gerado na pasta: ${reportsDir}`);
                break;
            case "5":
                console.log("Saindo...");
                this.router.navigateToPrimaryScreen();
                break;
            default:
                console.log("Opção inválida.");
        }
    }
}
