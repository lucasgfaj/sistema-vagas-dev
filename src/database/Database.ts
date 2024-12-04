import User from "../models/User";
import Vacancy from "../models/Vacancy";
import Developer from "../models/Developer";
import Enterprise from "../models/Enterprise"; // Importe a classe Enterprise

export default class Database {
    private static instance: Database;
    private users: User[] = [];
    private vacancies: Vacancy[] = [];
    private vacancyIdCounter: number = 1;

    private constructor() { }

    // Singleton para garantir uma única instância
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    // Adicionar usuário ao banco de dados
    public addUser(user: User): void {
        this.users.push(user);
    }

    // Buscar todos os usuários
    public getUsers(): User[] {
        return this.users;
    }

    // Buscar usuário por email
    public findUserByEmail(email: string): User | undefined {
        return this.users.find((user) => user.getEmail() === email);
    }

    // Buscar usuário por ID
    public findUserById(id: number): User | undefined {
        return this.users.find((user) => user.getID() === id);
    }

    // Buscar um desenvolvedor pelo ID
    public getDeveloperById(id: number): Developer | undefined {
        const user = this.findUserById(id);
        if (user && user.getTypeUser() === 'desenvolvedor' && user instanceof Developer) {
            return user;
        }
        return undefined; // Retorna undefined se não for um Developer
    }

    // Buscar uma empresa pelo ID
    public getEnterpriseById(id: number): Enterprise | undefined {
        const user = this.findUserById(id);
        if (user && user.getTypeUser() === 'empresa' && user instanceof Enterprise) {
            return user;
        }
        return undefined; // Retorna undefined se não for uma Enterprise
    }

    // Buscar usuário pela data de criação
    public findUserByDate(date: Date): User | undefined {
        return this.users.find((user) => user.getCreatedAt().getTime() === date.getTime());
    }

    // Filtrar usuários por tipo (desenvolvedor ou empresa)
    public getUsersByType(type: string): User[] {
        return this.users.filter(user => user.getTypeUser() === type);
    }

    // Método para adicionar vaga
    public addVacancy(vacancy: Vacancy): void {
        vacancy.setId(this.vacancyIdCounter++);
        this.vacancies.push(vacancy);
    }

    
    public getVacanciesByEnterpriseId(enterpriseId: number): Vacancy[] {
        return this.vacancies.filter(vacancy => vacancy.getId() === enterpriseId);
    }

    public getVacancies(): Vacancy[] {
        return this.vacancies;
    }

    public removeVacancy(vacancyId: number): void {
        this.vacancies = this.vacancies.filter(vacancy => vacancy.getId() !== vacancyId);
    }

    // Método para autenticar usuário
    public authenticateUser(email: string, password: string): User | undefined {
        const user = this.users.find(user => user.getEmail() === email);
        if (user && user.getPassword() === password) {
            return user;
        }
        return undefined;
    }
}
