import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStatusColor = (status: string) => {
  if (status === "completed") return "text-green-500"
  if (status === "in_progress") return "text-yellow-500"
  return "text-red-500"
}

export const getStatusText = (status: string) => {
  if (status === "completed") return "Completed"
  if (status === "in_progress") return "In Progress"
  return "Pending"
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}