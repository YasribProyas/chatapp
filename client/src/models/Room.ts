import Message from "./Message";
import User from "./User";

export default interface Room {
    error?: string,
    pubid: string,
    owner: string,
    name: string,
    photo: string,
    members: [User],
    messages: [Message]
}