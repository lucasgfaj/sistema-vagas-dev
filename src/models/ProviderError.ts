export default class ProviderErrors extends Error {

    constructor(ex:number){
        
        super();
        if (ex === 1){
            super("Erro no cadastro. Por favor, verifique as habilidades.");
        }
    }
}