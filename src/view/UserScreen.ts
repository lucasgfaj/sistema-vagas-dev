import promptSync from "prompt-sync";
import Router from "../Router";
import Database from "../database/Database";
import InputService from "../services/input.service";

export default class UserScreen {
    private inputService: InputService;
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();

    constructor(router: Router) {
        this.router = router;
        this.inputService = new InputService();
    }

    // Método para registrar um novo usuário
    public registerUser(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Cadastro de Usuário");
        console.log("Deseja se cadastrar como:");
        console.log("1 - Desenvolvedor");
        console.log("2 - Empresa");
        console.log("3 - Voltar");
        console.log("-------------------------------------------------------------------------------");

        const typeUser = this.prompt("Digite a opção desejada: ").trim();
        if (typeUser.toLowerCase() === "3") {
            this.router.navigateToPrimaryScreen();
            return;
        }

        switch (typeUser) {
            case "1":
                // Registrar Desenvolvedor
                this.router.navigateToRegisterDevelop();
                break;

            case "2":
                // Registrar Empresa
                this.router.navigateToRegisterEnterprise();
                break;

            default:
                console.log("Opção inválida. Tente novamente.");
                this.registerUser();
                return;
        }

        // Após o cadastro, navegue para a tela inicial
        this.router.navigateToPrimaryScreen();
    }


      // Método de login
      public loginUser(): void {
        console.log("---- Login ----");
        console.log("Digite 'B' a qualquer momento para voltar ao menu principal.");
    
        const email = this.inputService.promptWithCancel("Digite o e-mail: ");
        if (email === null) return;
    
        const password = this.inputService.promptWithCancel("Digite a senha: ");
        if (password === null) return;

        const userDatabase = this.db.findUserByEmail(email);
    
        if (userDatabase && userDatabase.getPassword() === password) {
            console.log(`Login bem-sucedido! Bem-vindo, ${userDatabase.getName()} (${userDatabase.getTypeUser()}).`);
    
            // Captura o ID do usuário
            const userId = userDatabase.getID();
    
            // Armazenar ou passar o ID para as telas subsequentes, como o Dashboard
            this.router.navigateToDashboard(userId, userDatabase.getTypeUser());
        } else {
            console.log("E-mail ou senha inválidos. Tente novamente.");
            this.router.navigateToPrimaryScreen();
        }
    }


    public navigateToDashboard(userId: number, userType: string): void {
        if (userType === "empresa") {
            this.router.navigateToDashboardEnterprise(userId);
        } else if (userType === "desenvolvedor") {
            this.router.navigateToDashboardDeveloper(userId);
        }
    }

    public listAllUsers(): void {
        const userAdmin = this.prompt("Digite Usuário Administrador: ");
        const passwordAdmin = this.prompt("Digite a Senha Administrador: ");
    
        if (userAdmin === "admin" && passwordAdmin === "admin") {
            console.log("Acesso concedido. Listando todos os usuários:");
    
            // Obter todos os usuários do banco de dados
            const users = this.db.getUsers();
    
            if (users.length === 0) {
                console.log("Nenhum usuário cadastrado.");
            } else {
                users.forEach(user => {
                    // Exibindo ID, Nome, Email, Senha e Data de Criação
                    console.log(`ID: ${user.getID()}`);
                    console.log(`Nome: ${user.getName()}`);
                    console.log(`Email: ${user.getEmail()}`);
                    console.log(`Senha: ${user.getPassword()}`);
                    console.log(`Data de Criação: ${user.getCreatedAt().toLocaleDateString("pt-BR")}`);
                    console.log('----------------------------------------');  // Separador entre usuários
                });
            }
        } else {
            console.log("Usuário ou senha do administrador incorretos.");
        }
    
        this.router.navigateToPrimaryScreen();
    }

}
