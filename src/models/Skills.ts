export default class Skills {
    private name: string;
    private level: string;

    constructor(name: string, level: string) {
        this.name = name;
        this.level = level;
    }

    getNome(): string {
        return this.name;
    }
    getNivel(): string {
        return this.level;
    }

    // Define o nível da habilidade
     setLevel(newLevel: string): void {
     const validateLevel = ["Júnior", "Pleno", "Senior"];
     if (validateLevel.includes(newLevel)) {
      this.level = newLevel;
       console.log(`Nível da habilidade "${this.name}" atualizado para: ${newLevel}`);
     } else {
       console.log("Nível inválido. Escolha entre: iniciante, intermediário ou avançado.");
     }
   }
}