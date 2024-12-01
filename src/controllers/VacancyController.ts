import Database from "../database/Database";
import Vacancy from "../models/Vacancy";


export default class VacancyController {
  // Terá como Controller de Vagas que será procurar vagas
  // com tema especifico e visualizar os detalhes da vaga
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }


  // Método para criar uma nova vaga
  public createVacancy(title: string, description: string, requirements: string[], language: string): void {
    const vacancy = new Vacancy(title, description, requirements, language);
    this.db.addVacancy(vacancy);
  }

  // Listar todas as vagas
  public listVacancies(): Vacancy[] {
    return this.db.getVacancies();
  }

  // Deletar uma vaga
  public deleteVacancy(title: string): void {
    const vacancies = this.db.getVacancies();
    const index = vacancies.findIndex(v => v.getTitle() === title);
    if (index === -1) {
      throw new Error("Vaga não encontrada.");
    }
    this.db.removeVacancy(index);
  }

  // Obter candidatos de uma vaga
  public getCandidatesForVacancy(title: string): string[] {
    const vacancy = this.db.getVacancies().find(v => v.getTitle() === title);
    if (!vacancy) {
      throw new Error("Vaga não encontrada.");
    }
    return vacancy.getCandidates();
  }
}
