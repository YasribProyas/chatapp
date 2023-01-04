import mongoose from "mongoose";
export class ChatMessage {
    sent_by: string;
    text: string;
    time: number;
    constructor(sent_by: string, text: string) {
        this.sent_by = sent_by;
        this.text = text;
        this.time = Date.now();
    }
}

export type ChatMessageType = {
    sent_by: string;
    text: string;
    time: number;
}