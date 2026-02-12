"use client"

import { useState } from "react"

// Phone validation regex: allows +, spaces, dashes, and requires at least 9 digits
const phoneRegex = /^[+]?[\d\s-]{9,}$/

function validatePhone(phone: string): string | null {
  if (!phone) return "El teléfono es requerido"
  if (!phoneRegex.test(phone)) return "Formato de teléfono inválido (ej: +34 600 123 456)"
  return null
}

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate phone before submission
    const phoneValidationError = validatePhone(formData.phone)
    if (phoneValidationError) {
      setPhoneError(phoneValidationError)
      return
    }

    setSending(true)
    setError(null)

    try {
      const res = await fetch("/api/reservaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          guests: Number(formData.guests),
          notes: formData.notes || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al enviar la reservación")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo enviar la reservación")
    } finally {
      setSending(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear phone error when user starts typing
    if (name === "phone" && phoneError) {
      setPhoneError(null)
    }
  }

  const handlePhoneBlur = () => {
    if (formData.phone) {
      const error = validatePhone(formData.phone)
      setPhoneError(error)
    }
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0]

  // Time slots
  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
  ]

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ¡Reservación enviada!
        </h3>
        <p className="text-green-600 mb-4">
          Hemos recibido tu solicitud. Te contactaremos pronto para confirmar tu reservación.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({
              name: "",
              email: "",
              phone: "",
              date: "",
              time: "",
              guests: 2,
              notes: "",
            })
          }}
          className="text-green-700 hover:text-green-800 underline"
        >
          Hacer otra reservación
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Teléfono *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            onBlur={handlePhoneBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
              phoneError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+34 600 000 000"
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          placeholder="tu@email.com"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            min={today}
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Hora *
          </label>
          <select
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          >
            <option value="">Seleccionar</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Personas *
          </label>
          <select
            id="guests"
            name="guests"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "persona" : "personas"}
              </option>
            ))}
            <option value="13">Más de 12 (contactar)</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Notas adicionales
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
          placeholder="Alergias, ocasión especial, preferencias de mesa..."
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        {sending ? "Enviando..." : "Reservar Mesa"}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Te confirmaremos la reservación por email o teléfono en menos de 24 horas.
      </p>
    </form>
  )
}
