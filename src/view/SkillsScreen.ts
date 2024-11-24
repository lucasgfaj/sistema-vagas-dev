import promptSync from "prompt-sync";
import Router from "../Router";
import Database from "../database/Database";

export default class SkillsScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();

    constructor(router: Router) {
        this.router = router;
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