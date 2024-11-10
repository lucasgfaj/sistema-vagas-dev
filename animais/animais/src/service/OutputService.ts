import Address from "../model/Address";
import Animal from "../model/Animal";

export default class OutputService {

    public printObjectState(obj: Animal | Address) {
        console.log("----------------");
        console.log(obj);
    }
}