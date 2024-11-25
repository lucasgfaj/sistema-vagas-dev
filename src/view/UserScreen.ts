import promptSync from "prompt-sync";
import Router from "../Router";
import DeveloperController from "../controllers/DeveloperController";
import EnterpriseController from "../controllers/EnterpriseController";
import Database from "../database/Database";
import User from "../models/User";
import Developer from "../models/Developer";
import Enterprise from "../models/Enterprise";

export default class UserScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();

    private developerController: DeveloperController;
    private enterpriseController: EnterpriseController;

    constructor(router: Router) {
        this.router = router;
        this.developerController = new DeveloperController(this.db);
        this.enterpriseController = new EnterpriseController(this.db);
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
                this.registerDeveloper();
                break;

            case "2":
                // Registrar Empresa
                this.registerEnterprise();
                break;

            default:
                console.log("Opção inválida. Tente novamente.");
                this.registerUser();
                return;
        }

        // Após o cadastro, navegue para a tela inicial
        this.router.navigateToPrimaryScreen();
    }

    private registerDeveloper(): void {
        let developer: Developer = this.developerController.getNewDeveloper();

        // Obter os dados do desenvolvedor
        developer.setName(this.prompt("Informe seu Nome: "));
        developer.setEmail(this.prompt("Informe o e-mail: "));
        developer.setPassword(this.prompt("Informe a senha: "));
        
        // Registrar as habilidades
        const skills = this.developerController.registerSkills();
        developer.setSkills(skills);

        // Registrar no banco de dados (controlador se encarrega de gerar o ID)
        this.developerController.registerNewDeveloper(developer);
    }

    private registerEnterprise(): void {
        let enterprise: Enterprise = this.enterpriseController.getNewEnterprise();

        // Obter os dados da empresa
        enterprise.setName(this.prompt("Informe a Razão Social: "));
        enterprise.setEmail(this.prompt("Informe o e-mail: "));
        enterprise.setPassword(this.prompt("Informe a senha: "));
        
        // Registrar no banco de dados (controlador se encarrega de gerar o ID)
        this.enterpriseController.registerNewEnterprise(enterprise);
    }

      // Método de login
      public loginUser(): void {
        console.log("---- Login ----");
        console.log("Digite '4' a qualquer momento para voltar ao menu principal.");

        const email = this.prompt("Digite o e-mail: ");
        if (email.trim().toLowerCase() === "4") this.router.navigateToPrimaryScreen();

        const password = this.prompt("Digite a senha: ");
        if (password.trim().toLowerCase() === "4") this.router.navigateToPrimaryScreen();

        const userDatabase = this.db.findUserByEmail(email);

        if (userDatabase && userDatabase.getPassword() === password) {
            console.log(`Login bem-sucedido! Bem-vindo, ${userDatabase.getName()} (${userDatabase.getTypeUser()}).`);

            // Verifica o tipo do usuário autenticado
            if (userDatabase.getTypeUser() === "empresa") {
                this.router.navigateToDashboardEnterprise(); // Redireciona para o dashboard da empresa
            } else if (userDatabase.getTypeUser() === "desenvolvedor") {
                this.router.navigateToDashboardDeveloper(); // Redireciona para o dashboard do desenvolvedor
            } else {
                console.log("Tipo de usuário inválido. Contate o suporte.");
                this.router.navigateToPrimaryScreen();
            }
        } else {
            console.log("E-mail ou senha inválidos. Tente novamente.");
            this.router.navigateToPrimaryScreen();
        }
    }

    // Método para listar todos os usuários (Administrador)
    public listAllUsers(): void {
        const userAdmin = this.prompt("Digite Usuário Administrador: ");
        const passwordAdmin = this.prompt("Digite a Senha Administrador: ");

        if (userAdmin === "admin" && passwordAdmin === "admin") {
            console.log("Acesso concedido. Listando todos os usuários:");
            const users = this.db.getUsers();

            if (users.length === 0) {
                console.log("Nenhum usuário cadastrado.");
            } else {
                users.forEach(user => {
                    console.log(`ID: ${user.getID()}, Nome: ${user.getName()}, Tipo: ${user.getTypeUser()}`);
                });
            }
        } else {
            console.log("Usuário ou senha do administrador incorretos.");
        }

        this.router.navigateToPrimaryScreen();
    }

}
