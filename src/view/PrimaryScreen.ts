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
                    // Cadastrar Usuário
                    console.log("Cadastro iniciado...");
                    // Chame a função correspondente ao cadastro aqui
                    break;

                case "2":
                    // Login Usuário
                    console.log("Login iniciado...");
                    // Chame a função correspondente ao login aqui
                    break;

                case "3":
                    // Listar Todos os Usuários
                    console.log("Recurso ainda não implementado, favor aguardar...");
                    break;

                case "4":
                    console.log("Saindo...");
                    showScreen = false; // Finaliza o loop
                    break;

                default:
                    console.log("Opção inválida. Por favor, tente novamente.");
            }
        }
    }
}
