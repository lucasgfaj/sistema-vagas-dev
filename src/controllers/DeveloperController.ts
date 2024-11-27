import Skills from "../models/Skills";
import Database from "../database/Database";
import Developer from "../models/Developer";
import Validator from "../models/Validator";
export default class DeveloperController {

    private db: Database;
    private validator: Validator;

    constructor(db: Database, validator: Validator) {
        this.db = db;
        this.validator = validator;
    }

    // Método para criar uma nova instância de Developer
    public getNewDeveloper(): Developer {
        let developer = new Developer();
        developer.setTypeUser("desenvolvedor"); 
        return developer;
    }

    // Método para gerar um novo ID para o desenvolvedor
    private generateDeveloperID(): number {
        const users = this.db.getUsers();
        return users.length > 0 ? Math.max(...users.map(user => user.getID())) + 1 : 1;
    }

    // Método para registrar o desenvolvedor no banco de dados
    public registerNewDeveloper(developer: Developer): void {

     
        // Gerar ID para o desenvolvedor
        const newId = this.generateDeveloperID();
        developer.setID(newId);

        // Definir a data de criação
        developer.setCreatedAt();

        // Adicionar no banco de dados
        this.db.addUser(developer);
        console.log(`Cadastro de Desenvolvedor concluído! Seja bem-vindo, ${developer.getName()}`);
    }

    
    // Método para registrar as habilidades do desenvolvedor
    public registerSkills(): Skills[] {
        const prompt = require('prompt-sync')();
        const skills: Skills[] = [];
        
        while (true) {
            const name = prompt("Informe o nome da habilidade: ");
            const level = prompt("Informe o nível (Júnior, Pleno, Senior): ");
            const skill = new Skills(name, level);
            skills.push(skill);

            const addMore = prompt("Deseja adicionar mais habilidades? (s/n): ").trim().toLowerCase();
            if (addMore !== "s") break;
        }

        return skills;
    }

    // Método para validar habilidades e registrar o desenvolvedor
    public validateAndRegisterDeveloper(developer: Developer): boolean {
        // Validando as habilidades antes de registrar
        if (!this.validator.validate(developer)) {
            return false;
        }

        // Se a validação passar, registra o desenvolvedor
        this.registerNewDeveloper(developer);
        return true;
    }

}
