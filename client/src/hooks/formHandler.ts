import { FormEvent, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import AuthUser from "../models/AuthUser";
import Room from "../models/Room";
import User from "../models/User";


const backendUrl: string = import.meta.env.VITE_BACKEND_URL;


// export function useLoginCheck() {

//     const { dispatch } = useAuthContext();
//     const [error, setError] = useState<Error | null>();
//     const [isLoading, setIsLoading] = useState(false);

//     const loginCheck = async () => {


//         const user: AuthUser = await fetch(backendUrl + "user/signin", {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         })
//             .then(res => res.json())
//             .catch(setError)
//             .finally(() => setIsLoading(false));


//         if (user.error) {
//             return setError(Error(user.error));
//         }
//         if (user.token) {
//             localStorage.setItem("user", user.token);
//             dispatch({ type: "LOGIN", payload: user });
//         }
//     }
//     return { signin, isLoading, error };
// }

export function useLogin() {

    const { dispatch } = useAuthContext();
    const [error, setError] = useState<Error | null>();
    const [isLoading, setIsLoading] = useState(false);

    const signin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)
        const formData = new FormData(e.target as HTMLFormElement);

        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;

        const user: AuthUser = await fetch(backendUrl + "user/signin", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .catch(setError)
            .finally(() => setIsLoading(false));


        if (user.error) {
            return setError(Error(user.error));
        }
        if (user.token) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }
    return { signin, isLoading, error, setError };
}

export function useSignup() {

    const { dispatch } = useAuthContext();
    const [error, setError] = useState<Error | null>();
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);

        const name: string = formData.get("name") as string;
        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;
        const photoType: string = formData.get("photoType") as string;

        const user: AuthUser = await fetch(backendUrl + "user/signup", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, photoType })
        })
            .then(res => res.json())
            .catch(setError)
            .finally(() => setIsLoading(false));

        if (user.error) {
            return setError(Error(user.error));
        }
        if (user.token) {
            // TODO: make sure to get full user detail from backend
            dispatch({ type: "LOGIN", payload: user });
        }

    }
    return { signup, isLoading, error };
}

export function useCreateRoom() {
    const [error, setError] = useState<Error | null>();
    const [isLoading, setIsLoading] = useState(false);

    const createRoom = async (e: FormEvent) => {

        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);

        const roomName: string = formData.get("roomName") as string;
        const photoType: string = formData.get("photoType") as string;
        console.log("create room", roomName);
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoading(false);
            setError(Error("Please login first"));
            return;
        }
        const roomInfo: Room = await fetch(backendUrl + "room/create", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({ roomName, photoType })
        })
            .then(res => res.json())
            .catch(setError)
            .finally(() => setIsLoading(false));

        if (roomInfo.error) {
            setError(Error(roomInfo.error));
        }
        return roomInfo;

    }
    return { createRoom, isLoading, error };
}