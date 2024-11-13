import User, { UserDependencies } from "./User";
import Vacancy from "./Vacancy";


export default class Enterprise extends User {
    private publicVacancys: Vacancy[];

    constructor(userDeps: Omit<UserDependencies, "typeUser">){
        super({ ...userDeps, typeUser: "empresa" });
        this.publicVacancys = [];
    }

    publishVacancy(vacancy: Vacancy): void {
        this.publicVacancys.push(vacancy);
        console.log(`Vaga "${vacancy.getTitle()}" publicada com sucesso pela empresa ${this.name}.`)
    }
    
    listarPublishVacancy(): void {
        console.log(`Vagas publicadas por ${this.name}:`);
        this.publicVacancys.forEach((vacancy, index) => {
          console.log(`${index + 1}. ${vacancy.getTitle()} - ${vacancy.getDescription()}`);
        });
      }


}