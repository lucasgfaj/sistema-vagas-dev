// view/UserScreen.ts
import promptSync from "prompt-sync";
import Router from "../Router";
import User from "../models/User";
import Developer from "../models/Developer";
import Enterprise from "../models/Enterprise";
import Database from "../database/Database";
import Skills from "../models/Skills";

export default class UserScreen {
    private prompt = promptSync();
    private router: Router;
    private db = Database.getInstance();

    constructor(router: Router) {
        this.router = router;
    }

    public registerUser(): void {
        console.log("-------------------------------------------------------------------------------");
        console.log("Cadastro de Usuário");
        console.log("Deseja se cadastrar como:");
        console.log("1 - Desenvolvedor");
        console.log("2 - Empresa");
        console.log("");
        console.log("B - Voltar");
        console.log("-------------------------------------------------------------------------------");

        const typeUser = this.prompt("Digite a opção desejada: ").trim();
        if (typeUser.toLowerCase() === "b") return;

        let newUser: User;

        switch (typeUser) {
            case "1":
                // Cadastrar Desenvolvedor
                const devName = this.prompt("Informe seu Nome: ");
                const devEmail = this.prompt("Informe o e-mail: ");
                const devPassword = this.prompt("Informe a senha: ");
                const skills = this.registerSkills();

                newUser = new Developer();
                newUser.typeUser = "desenvolvedor";
                newUser.setName(devName);
                newUser.setEmail(devEmail);
                newUser.setPassword(devPassword);
                (newUser as Developer).setSkills(skills);
                break;

            case "2":
                // Cadastrar Empresa
                const companyName = this.prompt("Informe a Razão Social: ");
                const companyEmail = this.prompt("Informe o e-mail: ");
                const companyPassword = this.prompt("Informe a senha: ");

                newUser = new Enterprise();
                newUser.typeUser = "empresa";
                newUser.setName(companyName);
                newUser.setEmail(companyEmail);
                newUser.setPassword(companyPassword);
                break;

            default:
                console.log("Opção inválida. Tente novamente.");
                this.registerUser();
                return;
        }

        // Gerar ID
        const users = this.db.getUsers();
        const newId = users.length > 0 ? Math.max(...users.map(user => user.getID())) + 1 : 1;
        newUser.setID(newId);

        // Salvar no banco de dados
        this.db.addUser(newUser);
        console.log(`Cadastro concluído! Seja bem-vindo: ${newUser.getName()}`);

        // Após o cadastro, navegue para a tela inicial
        this.router.navigateToPrimaryScreen();
    }

    private registerSkills(): Skills[] {
        const skills: Skills[] = [];
        while (true) {
            const name = this.prompt("Informe o nome da habilidade: ");
            const level = this.prompt("Informe o nível (Júnior, Pleno, Senior): ");
            const skill = new Skills(name, level);
            skills.push(skill);

            const addMore = this.prompt("Deseja adicionar mais habilidades? (s/n): ").trim().toLowerCase();
            if (addMore !== "s") break;
        }
        return skills;
    }

    public loginUser(): void {
        console.log("---- Login ----");
        console.log("Digite 'b' a qualquer momento para voltar ao menu principal.");

        const email = this.prompt("Digite o email: ");
        if (email.trim().toLowerCase() === "b") return;

        const password = this.prompt("Digite a senha: ");
        if (password.trim().toLowerCase() === "b") return;

        const user = this.db.findUserByEmail(email);

        if (user && user.getPassword() === password) {
            console.log(`Login bem-sucedido! Bem-vindo, ${user.getName()} (${user.typeUser}).`);
        } else {
            console.log("Email ou senha inválidos. Tente novamente.");
        }

        // Após o login, navegue para a tela inicial
        this.router.navigateToPrimaryScreen();
    }
}
