export default class User {

    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public typeUser!: "desenvolvedor" | "empresa";
    
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

    public dateUser(){
        console.log("Data não Implementada")
    }
}
