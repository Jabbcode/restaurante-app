import { PrismaClient, Category } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import 'dotenv/config'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const dishes = [
  // Entrantes
  {
    name: "Croquetas de Jamón",
    description: "Cremosas croquetas caseras de jamón ibérico, crujientes por fuera y suaves por dentro.",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&h=300&fit=crop",
    category: Category.entrantes,
    featured: true,
  },
  {
    name: "Gazpacho Andaluz",
    description: "Sopa fría de tomate tradicional con pepino, pimiento y un toque de ajo.",
    price: 7.00,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
    category: Category.entrantes,
    featured: false,
  },
  {
    name: "Ensalada Mediterránea",
    description: "Mix de lechugas frescas con tomate cherry, queso feta, aceitunas y vinagreta de limón.",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
    category: Category.entrantes,
    featured: false,
  },

  // Platos Principales
  {
    name: "Paella Valenciana",
    description: "Arroz tradicional con pollo, conejo, judías verdes y garrofón. Cocinada a fuego lento.",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400&h=300&fit=crop",
    category: Category.principales,
    featured: true,
  },
  {
    name: "Solomillo al Pedro Ximénez",
    description: "Tierno solomillo de ternera con reducción de vino Pedro Ximénez y patatas al horno.",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop",
    category: Category.principales,
    featured: true,
  },
  {
    name: "Lubina a la Espalda",
    description: "Lubina fresca al horno con aceite de oliva, ajo y perejil. Servida con verduras de temporada.",
    price: 19.00,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
    category: Category.principales,
    featured: false,
  },
  {
    name: "Cochinillo Asado",
    description: "Cochinillo asado al estilo tradicional con piel crujiente. Acompañado de ensalada.",
    price: 24.00,
    image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
    category: Category.principales,
    featured: false,
  },

  // Postres
  {
    name: "Tarta de Queso",
    description: "Tarta de queso casera al estilo vasco, cremosa con un toque caramelizado.",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=400&h=300&fit=crop",
    category: Category.postres,
    featured: true,
  },
  {
    name: "Crema Catalana",
    description: "Postre tradicional con crema de yema y azúcar caramelizado por encima.",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop",
    category: Category.postres,
    featured: false,
  },
  {
    name: "Flan Casero",
    description: "Flan de huevo tradicional con caramelo, receta de la abuela.",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400&h=300&fit=crop",
    category: Category.postres,
    featured: false,
  },

  // Bebidas
  {
    name: "Sangría de la Casa",
    description: "Sangría elaborada con vino tinto, frutas frescas de temporada y un toque de canela.",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
    category: Category.bebidas,
    featured: false,
  },
  {
    name: "Agua Mineral",
    description: "Agua mineral natural o con gas. Botella de 750ml.",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop",
    category: Category.bebidas,
    featured: false,
  },
  {
    name: "Vino Tinto Reserva",
    description: "Copa de vino tinto Rioja Reserva, envejecido 24 meses en barrica de roble.",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
    category: Category.bebidas,
    featured: false,
  },
]

async function main() {
  console.log('Seeding dishes...')

  // Delete existing dishes to avoid duplicates
  await prisma.dish.deleteMany()

  // Insert all dishes
  for (const dish of dishes) {
    const created = await prisma.dish.create({
      data: dish,
    })
    console.log(`Created dish: ${created.name}`)
  }

  console.log(`Seeded ${dishes.length} dishes successfully!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
