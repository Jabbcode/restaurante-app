import { getFeaturedDishes } from "@/lib/dishes";
import HeroSection from "@/components/ui/HeroSection";
import NewsletterSection from "@/components/ui/NewsletterSection";
import {
  AnimatedAboutSection,
  AnimatedFeaturedDishes,
  AnimatedCTASection,
} from "@/components/home/AnimatedSections";

export default async function Home() {
  const featuredDishes = await getFeaturedDishes();

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Restaurante"
        subtitle="Cocina tradicional con ingredientes frescos y de temporada"
        ctaText="Ver Menu"
        ctaHref="/menu"
      />

      {/* About Section with Animation */}
      <AnimatedAboutSection />

      {/* Featured Dishes with Animation */}
      <AnimatedFeaturedDishes featuredDishes={featuredDishes} />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section with Animation */}
      <AnimatedCTASection />
    </>
  );
}
