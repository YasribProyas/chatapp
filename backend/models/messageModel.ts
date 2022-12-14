import mongoose from "mongoose";
export class ChatMessage {
    sent_by: string;
    text: string;
    timestamps: number;
    constructor(sent_by: string, text: string) {
        this.sent_by = sent_by;
        this.text = text;
        this.timestamps = Date.now();
    }
}