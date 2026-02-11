import { prisma } from './prisma'
import { Category as PrismaCategory, Dish as PrismaDish } from '@prisma/client'
import { Dish } from '@/types/menu'

function mapDish(dish: PrismaDish): Dish {
  return {
    id: dish.id,
    name: dish.name,
    description: dish.description,
    price: Number(dish.price),
    image: dish.image,
    category: dish.category as Dish['category'],
    featured: dish.featured,
    available: dish.available,
  }
}

export async function getAllDishes(): Promise<Dish[]> {
  const dishes = await prisma.dish.findMany({
    where: { available: true },
    orderBy: { name: 'asc' },
  })
  return dishes.map(mapDish)
}

export async function getFeaturedDishes(): Promise<Dish[]> {
  const dishes = await prisma.dish.findMany({
    where: { featured: true, available: true },
    orderBy: { name: 'asc' },
  })
  return dishes.map(mapDish)
}

export async function getDishesByCategory(category: string): Promise<Dish[]> {
  if (category === 'todos') {
    return getAllDishes()
  }

  const dishes = await prisma.dish.findMany({
    where: {
      category: category as PrismaCategory,
      available: true,
    },
    orderBy: { name: 'asc' },
  })
  return dishes.map(mapDish)
}

export async function getDishById(id: string): Promise<Dish | null> {
  const dish = await prisma.dish.findUnique({
    where: { id },
  })
  return dish ? mapDish(dish) : null
}
