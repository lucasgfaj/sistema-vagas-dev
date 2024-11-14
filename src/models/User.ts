export interface UserDependencies {
    id: number;
    name: string;
    email: string;
    password: string;
    typeUser: "desenvolvedor" | "empresa";
}

export default class User {

    private id!: number;
    protected name!: string;
    private email!: string;
    private password!: string;
    private typeUser!: "desenvolvedor" | "empresa";
    private dateCreate!: Date;

    public constructor(userDependencies: UserDependencies) {
        this.id = userDependencies.id;
        this.name = userDependencies.name;
        this.email = userDependencies.email;
        this.password = userDependencies.password;
        this.typeUser = userDependencies.typeUser;
        this.dateCreate = new Date();
    }

    public getID(): number {
        return this.id
    }

    public setID(id: number): void {
        this.id = id
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password
    }


    public validateEmail(): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(this.email);
    }

    public getUserInfo(): string {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Type: ${this.typeUser}, Date Created: ${this.dateCreate}`;
    }

    // Método da Classe de Alterar Senha do Usuário//
   /* public alterPassword(newPassword: string): void{
        if (this.newPassword.length >= 6){
            this.password = newPassword;
            console.log("Alter Password Sucess!")
         } else {
            console.log ("This password is not validate, password has 6 caracters!")
         }
        
    }
    */
}

