export default class Vacancy {
    private id!: number; // ID único da vaga
    private candidates: number[] = []; // Alterando para number[] para armazenar IDs de desenvolvedores

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

    // Adiciona o ID de um candidato à vaga
    public addCandidate(candidateId: number): void {
        if (!this.candidates.includes(candidateId)) {
            this.candidates.push(candidateId);
        }
    }

    // Remove o candidato da vaga com base no ID
    public removeCandidate(candidateId: number): void {
        const index = this.candidates.indexOf(candidateId);
        if (index !== -1) {
            this.candidates.splice(index, 1);
        } else {
            console.log(`Candidato com ID ${candidateId} não encontrado.`);
        }
    }

    // Retorna os IDs dos candidatos
    public getCandidates(): number[] {
        return this.candidates;
    }
}
