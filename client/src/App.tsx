import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";

import AppLoginCheck from "./components/appLoginCheck";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import Chat from "./pages/chat";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <AppLoginCheck>
        <Routes>
          <Route path="/" element={<Navigate to="chat" />} />
          <Route path="chat/*" element={<Chat />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignupForm />} />
        </Routes>
      </AppLoginCheck>
    </AuthContextProvider>
  );
}

export default App;
