import { z } from "zod"

export const reservationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
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
