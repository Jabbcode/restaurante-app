import { NextRequest, NextResponse } from "next/server"
import { getDashboardStats, getExtendedStats } from "@/lib/stats"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const extended = searchParams.get("extended") === "true"

    const stats = extended ? await getExtendedStats() : await getDashboardStats()

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Error al obtener las estadísticas" },
      { status: 500 }
    )
  }
}
