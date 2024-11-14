import User, { UserDependencies } from "./User";

export default class Enterprise extends User {

    constructor(userController: UserDependencies){
        super(userController);
    }

}