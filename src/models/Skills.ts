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


//   // Define o nível da habilidade
//   setNivel(novoNivel: string): void {
//     const niveisValidos = ["iniciante", "intermediário", "avançado"];
//     if (niveisValidos.includes(novoNivel)) {
//       this.nivel = novoNivel;
//       console.log(`Nível da habilidade "${this.nome}" atualizado para: ${novoNivel}`);
//     } else {
//       console.log("Nível inválido. Escolha entre: iniciante, intermediário ou avançado.");
//     }
//   }
}