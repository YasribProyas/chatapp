import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";

import AppLoginCheck from "./components/appLoginCheck";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import Chat from "./pages/chat";
import { BrowserRouter } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <AppLoginCheck>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="chat" />} />
            <Route path="/chat/*" element={<Chat />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </BrowserRouter>
      </AppLoginCheck>
    </AuthContextProvider>
  );
}

export default App;
