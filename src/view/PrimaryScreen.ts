import promptSync from "prompt-sync";
import Router from "../Router";

export default class PrimaryScreen {
    private prompt = promptSync();
    private router!: Router;

    constructor(router: Router) {
        this.router = router;
    }

    public getFirstScreen(): void {
        console.log(
            "-------------------------------------------------------------------------------\n" +
            "Bem-vindo ao Vagas Dev!\n" +
            "Você deseja:\n" +
            "1 - Cadastrar\n" +
            "2 - Login\n" +
            "3 - Listar Todos os Usuários (Admin)\n" +
            "4 - Sair\n" +
            "-------------------------------------------------------------------------------"
        );

        let showScreen: boolean = true;

        while (showScreen) {
            let choice = this.prompt("Digite a opção desejada: ");

            switch (choice.trim()) {
                case "1":
                    // Navegar para a tela de cadastro
                    this.router.navigateToRegisterUser();
                    break;

                case "2":
                    // Navegar para a tela de login
                    this.router.navigateToLoginUser();
                    break;

                case "3":   
                    // Listar Todos os Usuários
                    this.router.navigateToListAllUsers();
                    break;

                case "4":
                    showScreen = false;
                    console.log("Saindo do sistema...");
                    process.exit(0);
                    break;

                default:
                    console.log("Opção inválida. Por favor, tente novamente.");
                    this.getFirstScreen();
            }
        }
    }
}
