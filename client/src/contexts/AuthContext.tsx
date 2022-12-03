import React, { createContext, useReducer, Dispatch } from "react";
import AuthUser from "../models/AuthUser";

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
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: IAuthContextProviderProp) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
