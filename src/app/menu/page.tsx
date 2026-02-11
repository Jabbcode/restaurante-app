import { getAllDishes } from "@/lib/dishes";
import MenuContent from "@/components/menu/MenuContent";

export default async function MenuPage() {
  const dishes = await getAllDishes();

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

        <MenuContent dishes={dishes} />
      </div>
    </div>
  );
}
