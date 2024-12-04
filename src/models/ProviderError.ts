export default class ProviderErrors extends Error {

    constructor(ex:number){
        
        if (ex === 1){
            super("Erro no cadastro. Por favor, verifique as habilidades.");
        }
        if (ex === 2){
            super("Ocorreu um erro ao remover a vaga:");
        }
    }
}