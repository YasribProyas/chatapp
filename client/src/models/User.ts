import Room from "./Room";

export default interface User {
    pubid: String,
    name: String,
    email: String,
    hash: String,
    photo: String,
    is_guest: Boolean,
    rooms: [Room],
}