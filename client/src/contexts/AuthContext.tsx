import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import AuthUser from "../models/AuthUser";

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

interface IAuthContextProviderProp {
  children: React.ReactNode;
}

type UserState = {
  user: AuthUser | null;
};
type UserAction = {
  type: "LOGIN" | "LOGOUT";
  payload: AuthUser | null;
};

type UserContextType = {
  dispatch: React.Dispatch<UserAction>;
  user: AuthUser | null;
};

export const AuthContext = createContext<UserContextType>(
  {} as UserContextType
);

export const authReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "LOGIN":
      const user = action.payload;
      if (user?.token) localStorage.setItem("token", user.token);
      if (user?.rooms) user.rooms = user.rooms.filter((room) => !!room);
      return { user };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: IAuthContextProviderProp) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const localUserToken = localStorage.getItem("token");
    if (localUserToken) {
      let user: AuthUser;
      fetch(backendUrl + "user/tokenlogin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token: localUserToken }),
      })
        .then((res) => res.json())
        .then((res) => {
          user = res;
          dispatch({ type: "LOGIN", payload: user });
        })
        .catch(() => {
          return;
          localStorage.removeItem("token");
        });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
