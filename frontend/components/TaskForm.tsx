"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Plus } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tasRequest } from "@/validations/task.validation"
import { z } from "zod"
import { useState } from "react"
import { createTask } from "@/lib/task"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useRouter } from "next/navigation"

export default function TaskForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof tasRequest>>({
        resolver: zodResolver(tasRequest),
        defaultValues: {
            title: "",
            description: "",
            status: "pending",
            due_date: "",
        },
        mode: "onChange",
    })

    const onSubmit = async (data: z.infer<typeof tasRequest>) => {
        setIsLoading(true)
        try{
            const response = await createTask(data) 
            if(response.status === 201){
                toast.success("Task created successfully")
                router.refresh()
            }
            form.reset()
        } catch (error: any) {
            toast.error("Task creation failed" + error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

  return (
     <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Task Manager</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Add a new task..."
                                                {...field}
                                                id={field.name}
                                                className="flex-1"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> 
                    </div>
                    <div className="flex gap-2 space-y-2">
                        <FormField
                            control={form.control}
                            name="due_date"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="due_date">Due Date</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="datetime-local"
                                                placeholder="Add a new due date..."
                                                {...field}
                                                id={field.name}
                                                className="flex-1"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 mt-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">Description</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Textarea
                                                placeholder="Add a new description..."
                                                {...field}
                                                id={field.name}
                                                className="flex-1 h-24"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                    </div>
                    <div className="flex gap-2 space-x-2 mb-2">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel htmlFor="status">Status</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
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
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                        <Button type="submit" size="icon" className="w-full" disabled={isLoading || !form.formState.isValid}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                        </Button>
                    </div>

                </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}