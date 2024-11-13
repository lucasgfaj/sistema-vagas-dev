import Skills from "./Skills";
import User, { UserDependencies } from "./User";
export default class Developer extends User {
    private skills: Skills[]
    constructor( userDeps: Omit<UserDependencies, "typeUser">, skills: Skills[]){
        super({ ...userDeps, typeUser: "desenvolvedor" });
        this.skills = skills
    }

      // Exibe o perfil do desenvolvedor
      public showProfile(): void {
        console.log(`Desenvolvedor: ${this.getName()}`);
        console.log("Habilidades:");
        this.skills.forEach(skills => console.log(`- ${skills.toString()}`));
    }


    // Verifica se o desenvolvedor possui uma habilidade específica
    public hasAbility(tech: string): boolean {
        return this.skills.some(skill => skill.getName().toLowerCase() === tech.toLowerCase());
    }

    // Adiciona uma nova habilidade ao desenvolvedor
    public addSkill(skill: Skills): void {
        this.skills.push(skill);
        console.log(`Habilidade ${skill.getName()} adicionada com sucesso!`);
    }
}