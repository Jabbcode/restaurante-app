"use client"

import { useState, useEffect, useCallback } from "react"

interface NotificationCounts {
  messages: number
  reservations: number
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [counts, setCounts] = useState<NotificationCounts>({ messages: 0, reservations: 0 })
  const [lastCounts, setLastCounts] = useState<NotificationCounts>({ messages: 0, reservations: 0 })

  // Check permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission)
    }
  }, [])

  // Request permission
  const requestPermission = useCallback(async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === "granted"
    } catch {
      return false
    }
  }, [])

  // Show notification
  const showNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (permission !== "granted") return

      try {
        new Notification(title, {
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          ...options,
        })
      } catch {
        // Notification failed silently
      }
    },
    [permission]
  )

  // Fetch counts
  const fetchCounts = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications/counts")
      if (res.ok) {
        const data = await res.json()
        setCounts(data)

        // Show notification if counts increased
        if (permission === "granted") {
          if (data.messages > lastCounts.messages) {
            const newCount = data.messages - lastCounts.messages
            showNotification(
              `${newCount} nuevo${newCount > 1 ? "s" : ""} mensaje${newCount > 1 ? "s" : ""}`,
              {
                body: "Tienes mensajes pendientes de revisar",
                tag: "new-messages",
              }
            )
          }
          if (data.reservations > lastCounts.reservations) {
            const newCount = data.reservations - lastCounts.reservations
            showNotification(
              `${newCount} nueva${newCount > 1 ? "s" : ""} reservacion${newCount > 1 ? "es" : ""}`,
              {
                body: "Tienes reservaciones pendientes de confirmar",
                tag: "new-reservations",
              }
            )
          }
        }

        setLastCounts(data)
      }
    } catch {
      // Fetch failed silently
    }
  }, [permission, lastCounts, showNotification])

  // Poll for updates
  useEffect(() => {
    fetchCounts() // Initial fetch

    const interval = setInterval(fetchCounts, 60000) // Every minute
    return () => clearInterval(interval)
  }, [fetchCounts])

  const totalCount = counts.messages + counts.reservations

  return {
    permission,
    requestPermission,
    showNotification,
    counts,
    totalCount,
    refetch: fetchCounts,
  }
}
