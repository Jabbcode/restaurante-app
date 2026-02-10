import { Dish } from "@/types/menu";

export const dishes: Dish[] = [
  // Entrantes
  {
    id: "1",
    name: "Croquetas de Jamón",
    description: "Cremosas croquetas caseras de jamón ibérico, crujientes por fuera y suaves por dentro.",
    price: 9.50,
    image: "/images/dishes/croquetas.jpg",
    category: "entrantes",
    featured: true,
  },
  {
    id: "2",
    name: "Gazpacho Andaluz",
    description: "Sopa fría de tomate tradicional con pepino, pimiento y un toque de ajo.",
    price: 7.00,
    image: "/images/dishes/gazpacho.jpg",
    category: "entrantes",
  },
  {
    id: "3",
    name: "Ensalada Mediterránea",
    description: "Mix de lechugas frescas con tomate cherry, queso feta, aceitunas y vinagreta de limón.",
    price: 8.50,
    image: "/images/dishes/ensalada.jpg",
    category: "entrantes",
  },

  // Platos Principales
  {
    id: "4",
    name: "Paella Valenciana",
    description: "Arroz tradicional con pollo, conejo, judías verdes y garrofón. Cocinada a fuego lento.",
    price: 18.00,
    image: "/images/dishes/paella.jpg",
    category: "principales",
    featured: true,
  },
  {
    id: "5",
    name: "Solomillo al Pedro Ximénez",
    description: "Tierno solomillo de ternera con reducción de vino Pedro Ximénez y patatas al horno.",
    price: 22.50,
    image: "/images/dishes/solomillo.jpg",
    category: "principales",
    featured: true,
  },
  {
    id: "6",
    name: "Lubina a la Espalda",
    description: "Lubina fresca al horno con aceite de oliva, ajo y perejil. Servida con verduras de temporada.",
    price: 19.00,
    image: "/images/dishes/lubina.jpg",
    category: "principales",
  },
  {
    id: "7",
    name: "Cochinillo Asado",
    description: "Cochinillo asado al estilo tradicional con piel crujiente. Acompañado de ensalada.",
    price: 24.00,
    image: "/images/dishes/cochinillo.jpg",
    category: "principales",
  },

  // Postres
  {
    id: "8",
    name: "Tarta de Queso",
    description: "Tarta de queso casera al estilo vasco, cremosa con un toque caramelizado.",
    price: 6.50,
    image: "/images/dishes/tarta-queso.jpg",
    category: "postres",
    featured: true,
  },
  {
    id: "9",
    name: "Crema Catalana",
    description: "Postre tradicional con crema de yema y azúcar caramelizado por encima.",
    price: 5.50,
    image: "/images/dishes/crema-catalana.jpg",
    category: "postres",
  },
  {
    id: "10",
    name: "Flan Casero",
    description: "Flan de huevo tradicional con caramelo, receta de la abuela.",
    price: 5.00,
    image: "/images/dishes/flan.jpg",
    category: "postres",
  },

  // Bebidas
  {
    id: "11",
    name: "Sangría de la Casa",
    description: "Sangría elaborada con vino tinto, frutas frescas de temporada y un toque de canela.",
    price: 12.00,
    image: "/images/dishes/sangria.jpg",
    category: "bebidas",
  },
  {
    id: "12",
    name: "Agua Mineral",
    description: "Agua mineral natural o con gas. Botella de 750ml.",
    price: 3.00,
    image: "/images/dishes/agua.jpg",
    category: "bebidas",
  },
  {
    id: "13",
    name: "Vino Tinto Reserva",
    description: "Copa de vino tinto Rioja Reserva, envejecido 24 meses en barrica de roble.",
    price: 5.50,
    image: "/images/dishes/vino.jpg",
    category: "bebidas",
  },
];

export const getFeaturedDishes = (): Dish[] => {
  return dishes.filter((dish) => dish.featured);
};

export const getDishesByCategory = (category: string): Dish[] => {
  if (category === "todos") return dishes;
  return dishes.filter((dish) => dish.category === category);
};
