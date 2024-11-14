import User, { UserDependencies } from "./User";
export default class Developer extends User {
    constructor(userController: UserDependencies){
        super(userController);
    }

}