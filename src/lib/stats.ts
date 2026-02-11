import { prisma } from './prisma'

export async function getDashboardStats() {
  const [
    totalDishes,
    availableDishes,
    featuredDishes,
    totalMessages,
    pendingMessages,
    totalReservations,
    pendingReservations,
  ] = await Promise.all([
    prisma.dish.count(),
    prisma.dish.count({ where: { available: true } }),
    prisma.dish.count({ where: { featured: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: 'PENDING' } }),
    prisma.reservation.count(),
    prisma.reservation.count({ where: { status: 'PENDING' } }),
  ])

  return {
    dishes: {
      total: totalDishes,
      available: availableDishes,
      featured: featuredDishes,
    },
    messages: {
      total: totalMessages,
      pending: pendingMessages,
    },
    reservations: {
      total: totalReservations,
      pending: pendingReservations,
    },
  }
}
