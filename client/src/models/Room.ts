import Message from "./message";
import User from "./User";

export default interface Room {
    pubid: String,
    owner: String,
    name: String,
    photo: String,
    members: [User],
    messages: [Message]
}