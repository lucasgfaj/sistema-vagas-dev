export default class Vacancy {

    constructor(
        public title: string,
        public description: string,
        public requirements: string[]
    ){}

    verifyRequirements(skills: string[]): boolean {
        return this.requirements.every(req => skills.includes(req));
      }
}