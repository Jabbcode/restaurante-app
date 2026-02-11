import { z } from "zod"

export const dishSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  image: z.string().url("La imagen debe ser una URL válida"),
  category: z.enum(["entrantes", "principales", "postres", "bebidas"], {
    message: "Categoría inválida",
  }),
  featured: z.boolean(),
  available: z.boolean(),
})

export const dishUpdateSchema = dishSchema.partial()

export type DishInput = z.infer<typeof dishSchema>
export type DishUpdateInput = z.infer<typeof dishUpdateSchema>
