import User, { UserDependencies } from "./User";
import Vacancy from "./Vacancy";


export default class Enterprise extends User {
    private publicVacancys: Vacancy[];

    constructor(userDeps: Omit<UserDependencies, "typeUser">){
        super({ ...userDeps, typeUser: "empresa" });
        this.publicVacancys = [];
    }

    publishVacancy(vacancy: Vacancy){

    }
}