import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import Chat from "./pages/chat";
import { User } from "./interfaces/UserInterface";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Routes>
      <Route path="/" element={<Chat user={user} />} />
      <Route
        path="login"
        element={<LoginForm user={user} setUser={setUser} />}
      />
      <Route
        path="signup"
        element={<SignupForm user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;
