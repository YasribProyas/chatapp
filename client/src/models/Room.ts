import Message from "./Message";
import User from "./User";

export default interface Room {
    error?: string,
    pubid: String,
    owner: String,
    name: String,
    photo: String,
    members: [User],
    messages: [Message]
}