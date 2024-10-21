import HeroSection from "./sections/HeroSection";
import PartnerSection from "./sections/PartnerSection";
import AboutSection from "./sections/AboutSection";
import ProgramSection from "./sections/ProgramSection";
import ClassSection from "./sections/ClassSection";
import TestimonialSection from "./sections/TestimonialSection";
import ContactSection from "./sections/ContactSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PartnerSection />
      <AboutSection />
      <ProgramSection />
      <ClassSection />
      <TestimonialSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
