import HeroSection from "./components/hero/HeroSection";
import { Navbar } from "./components/navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HomePage;
