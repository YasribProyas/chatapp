import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface IAppLoginCheckProp {
  children: ReactNode;
}

export default function AppLoginCheck({ children }: IAppLoginCheckProp) {
  const { user } = useContext(AuthContext);

  if (!user) {
    if (localStorage.getItem("token")) {
      return <h1>Loading</h1>;
    }
    return <>{children}</>;
  }
  if (user.error) {
    localStorage.removeItem("token");
  }
  return <>{children}</>;
  // return !user && localStorage.getItem("token") ? (
  //   <h1>Loading</h1>
  // ) : (
  //   <>{children}</>
  // );
}
