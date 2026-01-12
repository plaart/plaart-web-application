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
    <div className="min-h-screen bg-white relative">
      {/* Navbar en modo automático */}
      <AuthNavbar />

      {/* Selector de idioma - POSICIONADO CORRECTAMENTE */}
      <div className="absolute top-20 right-4 z-40">
        <LanguageSwitcher variant="light" size="sm" />
      </div>

      <div className="flex">
        {/* Lado izquierdo - Formularios */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
          <div className="w-full max-w-md">

            {/* Formularios */}
            {currentPage === "login" ? <LoginForm /> : <RegisterForm />}
            
            {/* Footer del formulario */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                {currentPage === "login" 
                  ? "¿No tienes cuenta? " 
                  : "¿Ya tienes cuenta? "
                }
                <a 
                  href={currentPage === "login" ? "/auth/register" : "/auth/login"}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {currentPage === "login" ? "Regístrate aquí" : "Inicia sesión"}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Lado derecho - Diseño animado */}
        <AnimatedBackground type={currentPage} />
      </div>

      {/* Botón para volver al home - MEJORADO */}
      <div className="absolute top-20 left-4 z-40">
        <a 
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="text-sm font-medium">Inicio</span>
        </a>
      </div>
    </div>
  );
};

export default AuthPages;
