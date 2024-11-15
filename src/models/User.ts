export interface UserDependencies {
    id: number;
    name: string;
    email: string;
    password: string;
    typeUser: "desenvolvedor" | "empresa";
}

export default class User {

    private userDependencies: UserDependencies;

    public constructor(userDependencies:UserDependencies) {
        this.userDependencies = userDependencies;
    }

    public getID(): number {
        return this.userDependencies.id
    }

    public setID(id: number): void {
        this.userDependencies.id = id
    }

    public getName(): string {
        return this.userDependencies.name;
    }

    public setName(name: string): void {
        this.userDependencies.name = name
    }

    public getEmail(): string {
        return this.userDependencies.email;
    }

    public setEmail(email: string): void {
        this.userDependencies.email = email
    }

    public getPassword(): string {
        return this.userDependencies.password;
    }

    public setPassword(password: string): void {
        this.userDependencies.password = password
    }
}

