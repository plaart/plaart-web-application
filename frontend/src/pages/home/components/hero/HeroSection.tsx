import { HeroHeader } from "./HeroHeader";
import { HeroButtons } from "./HeroButtons";
import { DemoInterface } from "./DemoInterface";
import { FloatingElements } from "./FloatingElements";

const HeroSection = () => {
  return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        <div className="text-center">
          <HeroHeader />
          <HeroButtons />
          <DemoInterface />
        </div>
        <FloatingElements />
      </section>

  );
};

export default HeroSection;
