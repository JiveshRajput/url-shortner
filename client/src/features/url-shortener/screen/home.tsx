import { ProductSection, ContactUsSection, HeroSection, HowItWorksSection } from '../components';

export const HomeScreen = () => {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <HowItWorksSection />
      <ContactUsSection />
    </main>
  );
};
