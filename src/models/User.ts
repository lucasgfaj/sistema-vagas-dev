export default class User {

    private id!: number;
    private name!: string;
    private email!: string;
    private password!: string;
    private typeUser!: "desenvolvedor" | "empresa"
    private dateCreate!: Date;

    public constructor(id: number, name: string, email: string, password: string, typeUser: "desenvolvedor" | "empresa") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.typeUser = typeUser;
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

