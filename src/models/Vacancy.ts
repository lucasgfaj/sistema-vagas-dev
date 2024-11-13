export default class Vacancy {

    constructor(
        public title: string,
        public description: string,
        public requirements: string[]
    ){}


    public getTitle(): string{
        return this.title;
    }
    
    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description
    }

    public setDescription(description: string): void {
        this.description = description;
    }


    verifyRequirements(skills: string[]): boolean {
        return this.requirements.every(req => skills.includes(req));
      }

      
}