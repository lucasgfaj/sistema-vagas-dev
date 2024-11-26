import Developer from "../Developer";

//Interface Requirindo a Skill: True or False


export default interface IValidator {
    validate(developer: Developer): boolean;
}
