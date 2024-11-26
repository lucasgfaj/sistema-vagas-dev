import User from "./User";
import Skills from "./Skills";

export default class Developer extends User {
    private skills: Skills[] = [];

    constructor() {
        super();
    }

    getSkills(): Skills[] {
        return this.skills;
    }

    setSkills(skills: Skills[]): void {
        this.skills = skills;
    }

    public dateUser(){
        return Date.now;
    }

}
