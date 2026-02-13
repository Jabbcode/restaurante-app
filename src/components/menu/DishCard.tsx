"use client";

import { Dish, categoryLabels } from "@/types/menu";

interface DishCardProps {
  dish: Dish;
  variant?: "default" | "featured";
  onImageClick?: () => void;
}

export default function DishCard({ dish, variant = "default", onImageClick }: DishCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`
        bg-white rounded-xl overflow-hidden shadow-md
        hover:shadow-xl transition-all duration-300
        hover:-translate-y-1 group
        ${isFeatured ? "ring-2 ring-orange-400" : ""}
      `}
    >
      {/* Image Container */}
      <div
        className={`relative h-48 overflow-hidden bg-gray-100 ${onImageClick ? "cursor-zoom-in" : ""}`}
        onClick={onImageClick}
        role={onImageClick ? "button" : undefined}
        tabIndex={onImageClick ? 0 : undefined}
        onKeyDown={onImageClick ? (e) => e.key === "Enter" && onImageClick() : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        <img
          src={dish.image}
          alt={dish.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/400x300/f5f5f5/999999?text=Plato";
          }}
        />

        {/* Zoom indicator */}
        {onImageClick && (
          <div className="absolute bottom-3 right-3 z-20 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <span className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
          {categoryLabels[dish.category]}
        </span>

        {/* Featured Badge */}
        {dish.featured && (
          <span className="absolute top-3 right-3 z-20 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Destacado
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {dish.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {dish.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            {dish.price.toFixed(2)} &euro;
          </span>
        </div>
      </div>
    </article>
  );
}
