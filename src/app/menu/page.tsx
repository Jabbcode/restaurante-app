"use client";

import { useState } from "react";
import { getDishesByCategory } from "@/data/dishes";
import DishCard from "@/components/menu/DishCard";
import CategoryFilter from "@/components/menu/CategoryFilter";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const dishes = getDishesByCategory(activeCategory);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nuestro Menú
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explora nuestra selección de platos preparados con ingredientes frescos
            y recetas tradicionales que deleitarán tu paladar.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        {/* Empty State */}
        {dishes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay platos disponibles en esta categoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
