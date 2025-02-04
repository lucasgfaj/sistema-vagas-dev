import { TypeUser } from "../../enums/TypeUser";
export default interface IUser {
    getID(): number;
    getName(): string;
    getEmail(): string;
    getTypeUser(): TypeUser;
    getCreatedAt(): Date;
}   