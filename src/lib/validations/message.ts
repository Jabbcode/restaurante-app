import { z } from "zod"

export const messageSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(1, "El mensaje es requerido"),
})

export const messageUpdateSchema = z.object({
  status: z.enum(["PENDING", "READ", "REPLIED", "ARCHIVED"]).optional(),
})

export type MessageInput = z.infer<typeof messageSchema>
export type MessageUpdateInput = z.infer<typeof messageUpdateSchema>
