import User, { UserDependencies } from "./User";
export default class Desenvolvedor extends User {

    constructor( userDeps: Omit<UserDependencies, "typeUser">){
        super({ ...userDeps, typeUser: "desenvolvedor" });
    }
}