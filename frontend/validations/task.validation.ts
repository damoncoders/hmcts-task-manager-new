import { z } from "zod"

export const tasRequest = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    status: z.enum(['pending', 'completed', 'in_progress']),
    due_date: z.string().min(1, { message: "Due date and time is required" }),
})