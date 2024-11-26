export default interface IUser {
    getID(): number;
    getName(): string;
    getEmail(): string;
    getTypeUser(): "desenvolvedor" | "empresa";
}