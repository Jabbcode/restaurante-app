"use client";

import { useState } from "react";
import { Dish } from "@/types/menu";
import DishCard from "./DishCard";
import CategoryFilter from "./CategoryFilter";

interface MenuContentProps {
  dishes: Dish[];
}

export default function MenuContent({ dishes }: MenuContentProps) {
  const [activeCategory, setActiveCategory] = useState("todos");

  const filteredDishes = activeCategory === "todos"
    ? dishes
    : dishes.filter((dish) => dish.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>

      {/* Empty State */}
      {filteredDishes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No hay platos disponibles en esta categoría.
          </p>
        </div>
      )}
    </>
  );
}
