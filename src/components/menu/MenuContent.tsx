"use client";

import { useState, useMemo } from "react";
import { Dish } from "@/types/menu";
import DishCard from "./DishCard";
import CategoryFilter from "./CategoryFilter";
import Pagination from "@/components/ui/Pagination";

const ITEMS_PER_PAGE = 6;

interface MenuContentProps {
  dishes: Dish[];
}

export default function MenuContent({ dishes }: MenuContentProps) {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDishes = useMemo(() => {
    return activeCategory === "todos"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);
  }, [dishes, activeCategory]);

  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE);

  const paginatedDishes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDishes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredDishes, currentPage]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Category Filter */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Dishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedDishes.map((dish) => (
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

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
