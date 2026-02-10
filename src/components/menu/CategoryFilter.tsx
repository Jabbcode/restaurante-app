"use client";

import { Category, categoryLabels } from "@/types/menu";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories: Array<{ value: string; label: string }> = [
  { value: "todos", label: "Todos" },
  ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label })),
];

export default function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={`
            px-4 py-2 rounded-full font-medium transition-all
            ${
              activeCategory === category.value
                ? "bg-orange-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
