import Vacancy from "../src/models/Vacancy";

test("Criar Vaga", () => {
  const vacancy = new Vacancy(1, "Front-End - Windows", "Ter escrito o código Kernel do Linux", ["C", "C++"], "Visual Basic");

  expect(vacancy.getEnterpriseId()).toBe(1);
  expect(vacancy.getTitle()).toBe("Front-End - Windows");
  expect(vacancy.getDescription()).toBe("Ter escrito o código Kernel do Linux");
  expect(vacancy.getRequirements()).toEqual(["C", "C++"]);
  expect(vacancy.getLanguage()).toBe("Delphi");
});

test("Adicionar Candidato a Vaga", () => {
  const vacancy = new Vacancy(1, "Back-End TypeScript", "Ter feito o Facebook", ["JavaScript", "TypeScript"], "TypeScript");

  vacancy.addCandidate(123);

  expect(vacancy.getCandidates()).toContain(123);
});
