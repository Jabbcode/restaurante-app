import { prisma } from './prisma'

export async function getDashboardStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [
    totalDishes,
    availableDishes,
    featuredDishes,
    totalMessages,
    pendingMessages,
    totalReservations,
    pendingReservations,
    todayReservations,
    confirmedTodayReservations,
  ] = await Promise.all([
    prisma.dish.count(),
    prisma.dish.count({ where: { available: true } }),
    prisma.dish.count({ where: { featured: true } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: 'PENDING' } }),
    prisma.reservation.count(),
    prisma.reservation.count({ where: { status: 'PENDING' } }),
    prisma.reservation.count({
      where: {
        date: { gte: today, lt: tomorrow },
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    }),
    prisma.reservation.count({
      where: {
        date: { gte: today, lt: tomorrow },
        status: 'CONFIRMED',
      },
    }),
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
      today: todayReservations,
      confirmedToday: confirmedTodayReservations,
    },
  }
}

export async function getExtendedStats() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  const monthAgo = new Date(today)
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const [
    // Basic stats
    basicStats,
    // Messages by status
    messagesByStatus,
    // Reservations by status
    reservationsByStatus,
    // Recent activity
    recentMessages,
    recentReservations,
    // Weekly stats
    messagesThisWeek,
    reservationsThisWeek,
    // Monthly totals
    messagesThisMonth,
    reservationsThisMonth,
  ] = await Promise.all([
    getDashboardStats(),
    prisma.contactMessage.groupBy({
      by: ['status'],
      _count: { status: true },
    }),
    prisma.reservation.groupBy({
      by: ['status'],
      _count: { status: true },
    }),
    prisma.contactMessage.count({
      where: { createdAt: { gte: weekAgo } },
    }),
    prisma.reservation.count({
      where: { createdAt: { gte: weekAgo } },
    }),
    prisma.contactMessage.count({
      where: { createdAt: { gte: weekAgo } },
    }),
    prisma.reservation.count({
      where: { createdAt: { gte: weekAgo } },
    }),
    prisma.contactMessage.count({
      where: { createdAt: { gte: monthAgo } },
    }),
    prisma.reservation.count({
      where: { createdAt: { gte: monthAgo } },
    }),
  ])

  return {
    ...basicStats,
    messages: {
      ...basicStats.messages,
      byStatus: messagesByStatus.reduce(
        (acc, item) => ({ ...acc, [item.status]: item._count.status }),
        {} as Record<string, number>
      ),
      thisWeek: messagesThisWeek,
      thisMonth: messagesThisMonth,
    },
    reservations: {
      ...basicStats.reservations,
      byStatus: reservationsByStatus.reduce(
        (acc, item) => ({ ...acc, [item.status]: item._count.status }),
        {} as Record<string, number>
      ),
      thisWeek: reservationsThisWeek,
      thisMonth: reservationsThisMonth,
    },
    activity: {
      recentMessages,
      recentReservations,
    },
  }
}
