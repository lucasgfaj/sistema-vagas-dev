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
    const allVacancies = this.db.getVacancies();

    const enterpriseVacancies = allVacancies.filter(vacancy => vacancy.getEnterpriseId() === enterpriseId);
    
    return enterpriseVacancies;  // Retorna todas as vagas da empresa
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

// Obter candidatos de uma vaga (com ID e nome)
public getCandidatesForVacancy(title: string): { id: number, name: string }[] {
  const vacancy = this.db.getVacancies().find(v => v.getTitle() === title);
  if (!vacancy) {
    throw new Error("Vaga não encontrada.");
  }

  const candidatesIds = vacancy.getCandidates(); // IDs dos candidatos
  const candidates = candidatesIds.map((candidateId) => {
    const developer = this.db.getUsers().find(u => u.getID() === candidateId);
    if (developer && developer.getTypeUser() === 'desenvolvedor') {
      return { id: developer.getID(), name: developer.getName() }; // Retorna um objeto com ID e nome
    }
    return null; // Caso o desenvolvedor não seja encontrado ou não seja um desenvolvedor
  }).filter((candidate): candidate is { id: number; name: string } => candidate !== null); // Removendo os valores nulos e afirmando o tipo

  return candidates;
}


  public assignCandidateToVacancy(candidateId: number, title: string): void {
    const vacancy = this.db.getVacancies().find(v => v.getTitle() === title);
    if (!vacancy) {
        console.log("Vaga não encontrada.");
        return;
    }

    const candidate = this.db.getUsers().find(u => u.getID() === candidateId);
    if (!candidate || candidate.getTypeUser() !== 'desenvolvedor') {
        console.log("Candidato não encontrado ou tipo de usuário inválido.");
        return;
    }

    // Aqui você pode realizar a ação necessária, como associar o candidato à vaga
    vacancy.addCandidate(candidateId); // Se a função addCandidate não existir, você pode adaptá-la
    console.log(`${candidate.getName()} foi selecionado para a vaga "${title}".`);
}

  // Inscrever um desenvolvedor em uma vaga
  public registerDeveloperToVacancy(developerId: number, vacancyTitle: string, developerName: string): void {
    const vacancy = this.db.getVacancies().find(v => v.getTitle() === vacancyTitle);
    if (!vacancy) {
      throw new Error("Vaga não encontrada.");
    }

    const developer = this.db.getUsers().find(u => u.getID() === developerId);
    if (!developer || developer.getTypeUser() !== 'desenvolvedor') {
      throw new Error("Desenvolvedor não encontrado ou tipo de usuário inválido.");
    }

    vacancy.addCandidate(developerId); // Adiciona o desenvolvedor à vaga
    console.log(`${developerName} se inscreveu na vaga: ${vacancyTitle}`);
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
