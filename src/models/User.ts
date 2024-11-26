export default abstract class User {

    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public typeUser!: "desenvolvedor" | "empresa";
    public createdAt!: Date;

    public constructor() {
        0
    }

    public getID(): number {
        return this.id;
    }

    public setID(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getTypeUser(): "desenvolvedor" | "empresa" {
        return this.typeUser;
    }

    public setTypeUser(typeUser: "desenvolvedor" | "empresa"): void {
        this.typeUser = typeUser;
    }

    public dateUser(): void {
        console.log("Data não implementada na classe base");
    }

    public setCreatedAt(): void {
        this.createdAt = new Date(); // Define a data atual como a data de criação
    }

    public getCreatedAt(): Date {
        if (!this.createdAt) {
            throw new Error("Data de criação não foi definida.");
        }
        return this.createdAt;
    }

}
