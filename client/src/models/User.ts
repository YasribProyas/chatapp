import Room from "./Room";

export default interface User {
    error?: string,
    pubid: String,
    name: String,
    email: String,
    hash: String,
    photo: String,
    is_guest: Boolean,
    rooms: [Room],
}