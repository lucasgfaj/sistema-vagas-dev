import Database from "../database/Database";
import Vacancy from "../models/Vacancy";



export default class VacancyController {
  // Terá como Controller de Vagas que será procurar vagas
  // com tema especifico e visualizar os detalhes da vaga
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }


  public createVacancy(enterpriseId: number, title: string, description: string, requirements: string[], language: string): void {
    const vacancy = new Vacancy(enterpriseId, title, description, requirements, language);
    this.db.addVacancy(vacancy); // ID gerado automaticamente dentro do método addVacancy
}


  //Listar vagas de uma empresa especifica 
  public listVacanciesByEnterprise(enterpriseId: number): Vacancy[] {
    return this.db.getVacanciesByEnterpriseId(enterpriseId);
}

  // Listar todas as vagas
  public listVacancies(): Vacancy[] {
    return this.db.getVacancies();
  }

  // Deletar uma vaga
  public deleteVacancyById(enterpriseId: number, vacancyId: number): void {
    const vacancies = this.db.getVacancies();
    
    // Encontra a vaga pelo ID
    const vacancy = vacancies.find(v => v.getId() === vacancyId);
    
    if (!vacancy) {
        throw new Error("Vaga não encontrada.");
    }

    // Verifica se a vaga pertence à empresa que está tentando excluí-la
    if (vacancy.getEnterpriseId() !== enterpriseId) {
        throw new Error("Você não tem permissão para excluir essa vaga.");
    }

    // Se a vaga for encontrada e pertence à empresa, remove a vaga
    const index = vacancies.indexOf(vacancy);
    this.db.removeVacancy(index);
}

  // Obter candidatos de uma vaga
   public getCandidatesForVacancy(title: string): number[] {  // Alterado para number[]
    const vacancy = this.db.getVacancies().find(v => v.getTitle() === title);
    if (!vacancy) {
      throw new Error("Vaga não encontrada.");
    }
    return vacancy.getCandidates();  // Retorna um array de números (IDs)
  }

   // Inscrever um desenvolvedor em uma vaga
   public registerDeveloperToVacancy(developerId: number, vacancyTitle: string): void {
    const vacancy = this.db.getVacancies().find(v => v.getTitle() === vacancyTitle);
    if (!vacancy) {
      throw new Error("Vaga não encontrada.");
    }

    const developer = this.db.getUsers().find(u => u.getID() === developerId);
    if (!developer || developer.getTypeUser() !== 'desenvolvedor') {
      throw new Error("Desenvolvedor não encontrado.");
    }

    vacancy.addCandidate(developerId); // Adiciona o desenvolvedor à vaga
    console.log(`${developer.getName()} se inscreveu na vaga: ${vacancyTitle}`);
  }

  // Remover um desenvolvedor de uma vaga
  public removeDeveloperFromVacancy(developerId: number, vacancyTitle: string): void {
    const vacancy = this.db.getVacancies().find(v => v.getTitle() === vacancyTitle);
    if (!vacancy) {
      throw new Error("Vaga não encontrada.");
    }

    const developer = this.db.getUsers().find(u => u.getID() === developerId);
    if (!developer || developer.getTypeUser() !== 'desenvolvedor') {
      throw new Error("Desenvolvedor não encontrado.");
    }

    vacancy.removeCandidate(developerId); // Remove o desenvolvedor da vaga
    console.log(`${developer.getName()} desistiu da vaga: ${vacancyTitle}`);
  }

}
