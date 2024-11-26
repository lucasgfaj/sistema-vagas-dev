import User from "./User";
import Skills from "./Skills";
import IUser from "./packages/IUser";

export default class Developer extends User implements IUser{
    private skills: Skills[] = [];

    constructor() {
        super();
        this.setCreatedAt(); 
    }

    getSkills(): Skills[] {
        return this.skills;
    }

    setSkills(skills: Skills[]): void {
        this.skills = skills;
    }

      public override dateUser(): void {
        console.log(`Data de registro da empresa: ${this.getCreatedAt()}`);
    }
}
