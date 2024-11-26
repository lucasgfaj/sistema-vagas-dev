import Developer from "./Developer";
import IValidator from "./packages/IValidator";

//Classe de Validação de Skill

export default class Validator implements IValidator {
    validate(developer: Developer): boolean {
        if (developer.getSkills().length === 0) {
            console.log("Erro: O desenvolvedor precisa ter pelo menos uma habilidade.");
            return false;
        }
        return true;
    }
}