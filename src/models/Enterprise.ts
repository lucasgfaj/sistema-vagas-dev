import User from "./User";

export default class Enterprise extends User {


    jobCode!: number;
    skillCode!: number;

    constructor(){
        super();
    }

}