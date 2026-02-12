import { z } from "zod"

// Phone validation: allows +, spaces, dashes, and requires at least 9 digits
const phoneRegex = /^[+]?[\d\s-]{9,}$/
const optionalPhoneValidation = z.string()
  .regex(phoneRegex, "Formato de teléfono inválido (ej: +34 600 123 456)")
  .transform(val => val.replace(/[\s-]/g, ""))
  .optional()
  .or(z.literal(""))

export const messageSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: optionalPhoneValidation,
  message: z.string().min(1, "El mensaje es requerido"),
})

export const messageUpdateSchema = z.object({
  status: z.enum(["PENDING", "READ", "REPLIED", "ARCHIVED"]).optional(),
})

export type MessageInput = z.infer<typeof messageSchema>
export type MessageUpdateInput = z.infer<typeof messageUpdateSchema>
