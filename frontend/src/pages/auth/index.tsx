import { useLocation } from "react-router-dom";
import { AuthNavbar } from "./components/AuthNavbar";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

// Componente principal que funciona con URLs
const AuthPages = () => {
  const location = useLocation();

  // Determinar la página actual basándose en la URL
  const currentPage = location.pathname.includes("/register")
    ? "register"
    : "login";

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar en modo automático */}
      <AuthNavbar />

      <div className="flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <LanguageSwitcher />
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
