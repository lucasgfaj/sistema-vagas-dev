import promptSync from "prompt-sync";
import EnterpriseController from "../controllers/EnterpriseController";
import Enterprise from "../models/Enterprise";
import Router from "../Router";
import Database from "../database/Database";
import VacancyController from "../controllers/VacancyController";
import ProviderErrors from "../models/ProviderError";


export default class EnterpriseScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();

    constructor(router: Router) {
        this.router = router;
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
        console.log("Os relátorios são gerados em PDF");
        console.log("");
        console.log("-------------------------------------------------------------------------------");
    }
}