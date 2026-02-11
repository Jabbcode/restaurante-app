export type Category = "entrantes" | "principales" | "postres" | "bebidas";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  featured?: boolean;
  available?: boolean;
}

export const categoryLabels: Record<Category, string> = {
  entrantes: "Entrantes",
  principales: "Platos Principales",
  postres: "Postres",
  bebidas: "Bebidas",
};
