import promptSync from "prompt-sync";

class InputService {
    private prompt = promptSync(); // Inicializa o promptSync uma vez

    // Método para capturar a entrada do usuário com a opção de cancelamento
    public promptWithCancel(message: string): string | null {
        const input = this.prompt(message);
        
        if (input.toUpperCase() === 'B') {
            console.log("Operação cancelada.");
            return null;  // Retorna null para indicar que a operação foi cancelada
        }
        
        return input;  // Retorna o valor do input normalmente
    }

    // Método genérico para solicitar informações
    public collectInformation(): string | null {
        return this.promptWithCancel("Digite algo ou 'B' para cancelar:");
    }
}

export default InputService; // Não se esqueça de exportar a classe, caso precise usá-la em outro arquivo
