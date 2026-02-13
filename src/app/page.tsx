import Link from "next/link";
import { getFeaturedDishes } from "@/lib/dishes";
import DishCard from "@/components/menu/DishCard";
import HeroSection from "@/components/ui/HeroSection";
import NewsletterSection from "@/components/ui/NewsletterSection";

export default async function Home() {
  const featuredDishes = await getFeaturedDishes();

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Restaurante"
        subtitle="Cocina tradicional con ingredientes frescos y de temporada"
        ctaText="Ver Menú"
        ctaHref="/menu"
      />

      {/* About Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-gray-800 mb-6">
                Nuestra Historia
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                Desde 1985, hemos servido los sabores más auténticos de nuestra tierra.
                Nuestra cocina combina recetas tradicionales heredadas de generación en
                generación con técnicas modernas que realzan cada ingrediente.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Trabajamos con productores locales para traer a tu mesa los ingredientes
                más frescos y de mejor calidad. Cada plato cuenta una historia de pasión,
                tradición y amor por la buena cocina.
              </p>
              <Link
                href="/nosotros"
                className="inline-block border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Conoce más
              </Link>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800')",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
              Platos Destacados
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Descubre nuestros platos más populares, preparados con los mejores
              ingredientes y todo el sabor de nuestra cocina tradicional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} variant="featured" />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Ver Menú Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para disfrutar?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Reserva tu mesa y vive una experiencia gastronómica inolvidable.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Hacer Reserva
          </Link>
        </div>
      </section>
    </>
  );
}
