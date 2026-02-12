import { z } from "zod"

// Phone validation: allows +, spaces, dashes, and requires at least 9 digits
const phoneRegex = /^[+]?[\d\s-]{9,}$/
const phoneValidation = z.string()
  .min(1, "El teléfono es requerido")
  .regex(phoneRegex, "Formato de teléfono inválido (ej: +34 600 123 456)")
  .transform(val => val.replace(/[\s-]/g, "")) // Clean spaces and dashes for storage

export const reservationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: phoneValidation,
  date: z.string().min(1, "La fecha es requerida"),
  time: z.string().min(1, "La hora es requerida"),
  guests: z.number().int().min(1, "Mínimo 1 persona").max(20, "Máximo 20 personas"),
  notes: z.string().optional(),
})

export const reservationUpdateSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"]).optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  guests: z.number().int().min(1).max(20).optional(),
  notes: z.string().optional(),
})

export type ReservationInput = z.infer<typeof reservationSchema>
export type ReservationUpdateInput = z.infer<typeof reservationUpdateSchema>
