import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { getTasks } from "@/lib/task";
import { Metadata } from "next";  
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Create Task",
  description: "Create a new task",
};

export default function Home() {
  const tasks =  getTasks()
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <Toaster position="bottom-right" richColors />
      <div className="w-full max-w-md space-y-6">
        <TaskForm />
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
