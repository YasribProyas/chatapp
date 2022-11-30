import { Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";
import Chat from "./pages/chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />
    </Routes>
  );
}

export default App;
