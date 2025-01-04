import { UserParameters } from "@/models/UserParameters";

export class UserWithoutId {
    public static EMPTY_USER_WITHOUT_ID: UserWithoutId = new UserWithoutId({ email: "", firstname: "", lastname: "" });
    public email: string;
    public firstname: string;
    public lastname: string;
    public createdAt: Date;

    constructor(params: UserParameters) {
        this.email = params.email;
        this.firstname = params.firstname;
        this.lastname = params.lastname;
        this.createdAt = new Date();
    }
}