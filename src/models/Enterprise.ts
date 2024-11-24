import User from "./User";

export default class Enterprise extends User {
    private jobCode!: number;

    constructor() {
        super();
    }

    getJobCode(): number {
        return this.jobCode;
    }

    setJobCode(jobCode: number): void {
        this.jobCode = jobCode;
    }
}
