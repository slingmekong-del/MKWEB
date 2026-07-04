import HeroSection from "@/components/home/HeroSection";
import StatsStrip from "@/components/home/StatsStrip";
import AboutTeaser from "@/components/home/AboutTeaser";
import ProductsTeaser from "@/components/home/ProductsTeaser";
import ServicesTeaser from "@/components/home/ServicesTeaser";

export default function HomePage() {
  return (
    <div className="pt-16">
      <HeroSection />
      <StatsStrip />
      <AboutTeaser />
      <ProductsTeaser />
      <ServicesTeaser />
    </div>
  );
}
