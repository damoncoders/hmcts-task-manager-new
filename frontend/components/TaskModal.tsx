"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { tasRequest } from "@/validations/task.validation"
import { z } from "zod"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { editTask, viewTask } from "@/lib/task"

interface TaskEditModalProps {
    taskId: number | null
    isOpen: boolean
    onClose: () => void
    mode: "edit" | "view"
}

export default function TaskEditModal({ taskId, isOpen, onClose, mode }: TaskEditModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof tasRequest>>({
        resolver: zodResolver(tasRequest),
        defaultValues: {
            title: "",
            description: "",
            status: "pending",
            due_date: "",
        },
    })

    useEffect(() => {
        const fetchTask = async () => {
            if (taskId) {
                try {
                    const response = await viewTask(taskId)
                    const task = await response.data.data
                    form.reset(task)
                } catch (error) {
                    toast.error("Failed to fetch task details")
                }
            }
        }
        fetchTask()
    }, [taskId, form])

    const onSubmit = async (data: z.infer<typeof tasRequest>) => {
        if (!taskId) return
        setIsLoading(true)
        try {
            const response = await editTask(taskId, data)
            if (response.status === 200) {
                toast.success("Task updated successfully")
                router.refresh()
                onClose()
            } else {
                throw new Error("Failed to update task")
            }
        } catch (error) {
            toast.error("Failed to update task")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === "edit" ? "Edit Task" : "View Task"}</DialogTitle>
                    <DialogDescription className="sr-only">
                        {mode === "edit" ? "Edit the task details below" : "View the task details below"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={mode === "view"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="due_date"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} disabled={mode === "view"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} value={field.value || ""} disabled={mode === "view"} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange} disabled={mode === "view"}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="in_progress">In Progress</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2">
                            {mode === "edit" && (
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                            )}
                            {mode === "edit" && (
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}