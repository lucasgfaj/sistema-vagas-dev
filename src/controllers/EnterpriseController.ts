import Enterprise from "../models/Enterprise";
import Database from "../database/Database";
import { TypeUser } from "../enums/TypeUser";

export default class EnterpriseController {

    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    // Método para criar uma nova instância de Enterprise
    public getNewEnterprise(): Enterprise {
        let enterprise = new Enterprise();
        enterprise.setTypeUser(TypeUser.desenvolvedor);
        return enterprise;
    }

    // Método para gerar um novo ID para a empresa
    private generateEnterpriseID(): number {
        const users = this.db.getUsers();
        return users.length > 0 ? Math.max(...users.map(user => user.getID())) + 1 : 1;
    }

    // Método para registrar a empresa no banco de dados
    public registerNewEnterprise(enterprise: Enterprise): void {
        // Gerar ID para a empresa
        const newId = this.generateEnterpriseID();
        enterprise.setID(newId);

        enterprise.setCreatedAt();

        // Adicionar no banco de dados
        this.db.addUser(enterprise);
        console.log(`Cadastro de Empresa concluído! Seja bem-vindo, ${enterprise.getName()}`);
    }

    public getEnterpriseByID(id: number): Enterprise | undefined{
        return this.db.findUserById(id) as Enterprise;
    }
}
