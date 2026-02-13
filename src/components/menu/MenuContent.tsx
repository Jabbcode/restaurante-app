"use client";

import { useState, useMemo } from "react";
import { Dish } from "@/types/menu";
import DishCard from "./DishCard";
import CategoryFilter from "./CategoryFilter";
import Pagination from "@/components/ui/Pagination";
import Lightbox from "@/components/ui/Lightbox";
import { useLightbox } from "@/hooks/useLightbox";

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

  // Lightbox images from filtered dishes
  const lightboxImages = useMemo(() => {
    return filteredDishes.map((dish) => ({
      src: dish.image,
      alt: dish.name,
      title: dish.name,
    }));
  }, [filteredDishes]);

  const { isOpen, currentIndex, openLightbox, closeLightbox } = useLightbox(lightboxImages);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageClick = (dishId: string) => {
    // Find the index in the filtered dishes array
    const index = filteredDishes.findIndex((d) => d.id === dishId);
    if (index !== -1) {
      openLightbox(index);
    }
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
          <DishCard
            key={dish.id}
            dish={dish}
            onImageClick={() => handleImageClick(dish.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredDishes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No hay platos disponibles en esta categoria.
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={currentIndex}
        isOpen={isOpen}
        onClose={closeLightbox}
      />
    </>
  );
}
