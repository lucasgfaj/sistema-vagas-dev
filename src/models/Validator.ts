import Developer from "./Developer";
import IValidator from "./packages/IValidator";

// Classe de Validação de Skill
export default class Validator implements IValidator {
    validate(developer: Developer): boolean {
        const skills = developer.getSkills();

        // Verificar se o desenvolvedor tem habilidades
        if (skills.length === 0) {
            console.log("Erro: O desenvolvedor precisa ter pelo menos uma habilidade.");
            return false;
        }

        // Validar se todas as habilidades têm pelo menos 3 letras
        for (const skill of skills) {
            if (skill.getName().length < 3) {
                console.log(`Erro: A habilidade '${skill.getName()}' precisa ter pelo menos 3 caracteres.`);
                return false;
            }
        }

        return true;
    }
}
