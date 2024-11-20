import promptSync from "prompt-sync";
import Router from "../Router";
import User from "../models/User";

export default class UserScreen {

    private prompt = promptSync();
    private router!: Router;

    constructor(router: Router) {
        this.router = router;
    }

    public registerUser(): void {}

    public loginUser(): void {}
}
