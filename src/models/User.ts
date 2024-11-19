import { IUsers } from './packages/IUsers';
export default class User implements IUsers {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public typeUser: "desenvolvedor" | "empresa";

    public constructor(userDependencies: IUsers) {
        this.id = userDependencies.id;
        this.name = userDependencies.name;
        this.email = userDependencies.email;
        this.password = userDependencies.password;
        this.typeUser = userDependencies.typeUser;
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
}
