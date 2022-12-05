import User from "./User";

export default interface AuthUser extends User {
    email: string;
    token: string;
}