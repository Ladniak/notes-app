"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import SideNav from "@/components/SideNav";

interface TaskForm {
    title: string;
    description: string;
    status: "pending" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate: string;
}

export default function CreateTaskPage() {
    const router = useRouter();
    const [form, setForm] = useState<TaskForm>({
        title: "",
        description: "",
        status: "pending",
        priority: "medium",
        dueDate: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        setIsLoading(false);
        router.push("/dashboard");
    };

    return (
        <div className="flex min-h-screen">
            <SideNav />
            <main className="flex-1 bg-gray-50 p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Create New Task
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-lg"
                >
                    <input
                        name="title"
                        type="text"
                        placeholder="Task title"
                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <select
                            name="status"
                            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
                            value={form.status}
                            onChange={handleChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In progress</option>
                            <option value="done">Done</option>
                        </select>

                        <select
                            name="priority"
                            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
                            value={form.priority}
                            onChange={handleChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <input
                        name="dueDate"
                        type="date"
                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
                        value={form.dueDate}
                        onChange={handleChange}
                    />

                    <Button type="submit" isLoading={isLoading}>
                        Create Task
                    </Button>
                </form>
            </main>
        </div>
    );
}
