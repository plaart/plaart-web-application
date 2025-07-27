import { useState } from "react";
import { AuthNavbar } from "./components/AuthNavbar";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AnimatedBackground } from "./components/AnimatedBackground";

// Componente principal que maneja el estado
const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState("login");

  const togglePage = () => {
    setCurrentPage(currentPage === "login" ? "register" : "login");
  };

  return (
    <div className="min-h-screen bg-white">
      <AuthNavbar onTogglePage={togglePage} currentPage={currentPage} />

      <div className="flex">
        {/* Lado izquierdo - Formulario */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 ">
          <div className="w-full max-w-md">
            {currentPage === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
        {/* Lado derecho - Diseño animado */}
        <AnimatedBackground type={currentPage} />
      </div>
    </div>
  );
};

export default AuthPages;
