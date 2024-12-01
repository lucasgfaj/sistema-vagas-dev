export default class Vacancy {
    private id!: number; // ID único da vaga
    private candidates: string[] = [];

    constructor(
        private title: string,
        private description: string,
        private requirements: string[],
        private language: string
    ) {}

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    public getRequirements(): string[] {
        return this.requirements;
    }

    setRequirements(requirements: string[]): void {
        this.requirements = requirements;
    }

    public addCandidate(candidate: string): void {
        this.candidates.push(candidate);
    }

    public getCandidates(): string[] {
        return this.candidates;
    }
}
