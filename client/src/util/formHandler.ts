import { FormEvent } from "react";

const backendUrl: string = import.meta.env.VITE_BACKEND_URL


export function formSubmit(e: FormEvent, callback: Function) {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const action: string = form.action.split("/").reverse()[0];
    const formData = new FormData(form);

    switch (action) {
        case "login":
            login(formData, callback)
            break;
        case "signup":
            signup(formData, callback)
            break;

        default:
            break;
    }

}

function login(formData: FormData, callback: Function) {
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    fetch(backendUrl + "login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(res => console.log("yoyo", res));
}

function signup(formData: FormData, callback: Function) {

    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;
    const photoType: string = formData.get("photoType") as string;

    fetch(backendUrl + "signup", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ email, password, photoType })
    }).then(res => console.log("yoyo", res));
}