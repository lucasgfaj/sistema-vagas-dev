import { IUsers } from './packages/IUsers';
import User from "./User";

export default class Enterprise extends User implements IUsers {

    constructor(userController: IUsers){
        super(userController);
    }

}