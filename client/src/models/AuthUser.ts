import Room from "./Room";
import User from "./User";

export default interface AuthUser extends User {
    token: string,
    is_guest: Boolean,
    email: String,
    rooms: Room[],
}