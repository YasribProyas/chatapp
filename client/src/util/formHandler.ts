import { FormEvent, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;


export function useLogin() {

    const [error, setError] = useState<Error | null>();
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);

        const email: string = formData.get("email") as string;
        const password: string = formData.get("password") as string;

        const userJWT = await fetch(backendUrl + "user/signin", {
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


        if (userJWT.error) {
            return setError(Error(userJWT.error));
        }
        if (userJWT.token) {
            localStorage.setItem("user", userJWT.token);
            // TODO: make sure to get full user detail from backend
            dispatch({ type: "LOGIN", payload: userJWT });
        }
    }
    return { signin, isLoading, error };
}

export function useSignup() {
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

        const userJWT = await fetch(backendUrl + "user/signup", {
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

        if (userJWT.error) {
            return setError(Error(userJWT.error));
        }
        if (userJWT.token) localStorage.setItem("user", userJWT.token);

    }
    return { signup, isLoading, error };
}