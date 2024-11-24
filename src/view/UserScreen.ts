import promptSync from "prompt-sync";
import Router from "../Router";
import User from "../models/User";
import Developer from "../models/Developer";
import Enterprise from "../models/Enterprise";
import Database from "../database/Database";

export default class UserScreen {
    private prompt = promptSync();
    private router!: Router;
    private db = Database.getInstance(); // Obtendo a instância do banco de dados

    constructor(router: Router) {
        this.router = router;
    }

    public registerUser(): void {
        console.log("---- Cadastro de Usuário ----");
        console.log("Digite 'b' a qualquer momento para voltar ao menu principal.");

        const name = this.prompt("Digite o nome: ");
        if (name.trim().toLowerCase() === "b") return;

        const email = this.prompt("Digite o email: ");
        if (email.trim().toLowerCase() === "b") return;

        const password = this.prompt("Digite a senha: ");
        if (password.trim().toLowerCase() === "b") return;

        const typeUser = this.prompt(
            "Digite o tipo de usuário (1 - Desenvolvedor, 2 - Empresa): "
        ).trim();
        if (typeUser.toLowerCase() === "b") return;

        let newUser: User;

        if (typeUser === "1") {
            newUser = new Developer();
            newUser.typeUser = "desenvolvedor";
        } else if (typeUser === "2") {
            newUser = new Enterprise();
            newUser.typeUser = "empresa";
        } else {
            console.log("Tipo de usuário inválido. Tente novamente.");
            return;
        }

        // Configurando dados do usuário
        const users = this.db.getUsers();
        newUser.setID(users.length + 1); // ID único
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(password);

        // Salvando no banco de dados
        this.db.addUser(newUser);
        console.log("Usuário cadastrado com sucesso!");
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
    }
}
