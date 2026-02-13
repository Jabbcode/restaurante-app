"use client"

import Link from "next/link"
import { Dish } from "@/types/menu"
import DishCard from "@/components/menu/DishCard"
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/animations"

interface AnimatedSectionsProps {
  featuredDishes: Dish[]
}

export function AnimatedAboutSection() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <h2 className="font-serif text-4xl font-bold text-gray-800 mb-6">
                Nuestra Historia
              </h2>
              <p className="text-gray-600 text-lg mb-4">
                Desde 1985, hemos servido los sabores mas autenticos de nuestra tierra.
                Nuestra cocina combina recetas tradicionales heredadas de generacion en
                generacion con tecnicas modernas que realzan cada ingrediente.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Trabajamos con productores locales para traer a tu mesa los ingredientes
                mas frescos y de mejor calidad. Cada plato cuenta una historia de pasion,
                tradicion y amor por la buena cocina.
              </p>
              <Link
                href="/nosotros"
                className="inline-block border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Conoce mas
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800')",
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export function AnimatedFeaturedDishes({ featuredDishes }: AnimatedSectionsProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
              Platos Destacados
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Descubre nuestros platos mas populares, preparados con los mejores
              ingredientes y todo el sabor de nuestra cocina tradicional.
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.15}
        >
          {featuredDishes.map((dish) => (
            <StaggerItem key={dish.id}>
              <DishCard dish={dish} variant="featured" />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Ver Menu Completo
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function AnimatedCTASection() {
  return (
    <ScrollReveal>
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Listo para disfrutar?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Reserva tu mesa y vive una experiencia gastronomica inolvidable.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-medium px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Hacer Reserva
          </Link>
        </div>
      </section>
    </ScrollReveal>
  )
}
