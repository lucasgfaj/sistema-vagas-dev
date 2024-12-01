export default class Skills {
  private static skillIdCounter: number = 1; // Contador estático para IDs
  private id: number;
  private name: string;
  private level?: string;

  constructor(name: string, level?: string) {
      this.id = Skills.skillIdCounter++; // Atribui um ID único
      this.name = name;
      this.level = level;
  }

  getId(): number {
      return this.id;
  }

  getName(): string {
      return this.name;
  }

  setName(name: string): void {
      this.name = name;
  }
  
  getLevel(): string {
      return this.level ?? "Nível não definido";
  }

  // Define o nível da habilidade
  setLevel(newLevel: string): void {
      const validateLevel = ["Júnior", "Pleno", "Senior"];
      if (validateLevel.includes(newLevel)) {
          this.level = newLevel;
          console.log(`Nível da habilidade "${this.name}" atualizado para: ${newLevel}`);
      } else {
          console.log("Nível inválido. Escolha entre: Júnior, Pleno ou Senior.");
      }
  }
}
