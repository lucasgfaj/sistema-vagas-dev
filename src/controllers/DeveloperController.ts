import Skills from "../models/Skills";
import Database from "../database/Database";
import Developer from "../models/Developer";
import Validator from "../models/Validator";
import ProviderErrors from "../models/ProviderError";
import Vacancy from "../models/Vacancy";

export default class DeveloperController {
    private skills: Skills[] = [];
    private db: Database;
    private validator: Validator;
    private vacancies: Vacancy[] = [];

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

    // Método para obter um desenvolvedor pelo ID
    public getDeveloperById(id: number): Developer | undefined {
        return this.db.findUserById(id) as Developer;
    }

    // Registrar Skills e Seleciona seu ID
    public registerSkills(): Skills[] {
        const prompt = require('prompt-sync')();
        let skills: Skills[] = []; // Variável local para as habilidades

        while (true) {
            const name = prompt("Informe o nome da habilidade: ");
            const level = prompt("Informe o nível (Júnior, Pleno, Senior): ");
            const skill = new Skills(name, level);
            skills.push(skill); // Adiciona a habilidade na lista local

            console.log(`Habilidade "${skill.getName()}" com ID ${skill.getId()} registrada.`);

            const addMore = prompt("Deseja adicionar mais habilidades? (s/n): ").trim().toLowerCase();
            if (addMore !== "s") break;
        }

        return skills; // Retorna a lista de habilidades
    }

    // Método para listar habilidades do desenvolvedor
    public listSkills(developerId: number): void {
        const developer = this.getDeveloperById(developerId);
        if (developer) {
            const skills = developer.getSkills();
            if (skills.length > 0) {
                console.log("Habilidades do desenvolvedor:");
                skills.forEach(skill => {
                    console.log(`ID: ${skill.getId()}, Nome: ${skill.getName()}, Nível: ${skill.getLevel()}`);
                });
            } else {
                console.log("Nenhuma habilidade registrada.");
            }
        }
    }

    public removeSkills(skillId: number): void {
        const index = this.skills.findIndex(skill => skill.getId() === skillId);
        if (index !== -1) {
            console.log("Habilidade não encontrada");
            return;
        }
        this.skills.splice(index, 1)
        console.log("Habilidade com ID ${skillId} removida com sucesso!");
    }

    // Método para validar habilidades e registrar o desenvolvedor
    public validateAndRegisterDeveloper(developer: Developer): boolean {
        // Validando as habilidades antes de registrar
        if (!this.validator.validate(developer)) {
            throw new ProviderErrors(1);
        }

        // Se a validação passar, registra o desenvolvedor
        this.registerNewDeveloper(developer);
        return true;
    }

}
