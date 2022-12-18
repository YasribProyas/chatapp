import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface IAppLoginCheckProp {
  children: ReactNode;
}

export default function AppLoginCheck({ children }: IAppLoginCheckProp) {
  const { user } = useContext(AuthContext);

  return !user && localStorage.getItem("token") ? (
    <h1>Loading</h1>
  ) : (
    <>{children}</>
  );
}
