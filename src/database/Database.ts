import User from "../models/User";

export default class Database {
    private static instance: Database;
    private users: User[] = []; // Armazena os usuários cadastrados

    private constructor() {}

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

    public findUserById(id: number): User | undefined {
        return this.users.find((user) => user.getID() === id);
    }
}
