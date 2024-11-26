import IUser from "./packages/IUser";
import User from "./User";

export default class Enterprise extends User implements IUser {
    private jobCode!: number;

    constructor() {
        super();
        this.setCreatedAt();
    }

    getJobCode(): number {
        return this.jobCode;
    }

    setJobCode(jobCode: number): void {
        this.jobCode = jobCode;
    }

    public override dateUser(): void {
        console.log(`Data de registro da empresa: ${this.getCreatedAt()}`);
    }


}
