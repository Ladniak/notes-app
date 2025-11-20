"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import SideNav from "@/components/SideNav";
import Image from "next/image";

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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        <div className="flex min-h-screen bg-gray-50">
            <SideNav />

            <main className="flex-1 flex items-center justify-center p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full max-w-5xl">

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-10 rounded-3xl shadow-lg space-y-5 w-full"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">
                            Create New Task
                        </h2>

                        <input
                            name="title"
                            type="text"
                            placeholder="Task title"
                            className="w-full p-3 rounded-xl bg-gray-100 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            className="w-full p-3 rounded-xl bg-gray-100 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                            rows={4}
                            value={form.description}
                            onChange={handleChange}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <select
                                name="status"
                                className="p-3 rounded-xl bg-gray-100 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>

                            <select
                                name="priority"
                                className="p-3 rounded-xl bg-gray-100 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition"
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
                            className="w-full p-3 rounded-xl bg-gray-100 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-400 transition"
                            value={form.dueDate}
                            onChange={handleChange}
                        />

                        <Button type="submit" isLoading={isLoading}>
                            Create Task
                        </Button>
                    </form>

                    {/* Illustration */}
                    <div className="hidden lg:flex justify-center">
                        <Image
                            src="/images/task-side.png"
                            alt="Create task illustration"
                            width={420}
                            height={420}
                            className="rounded-2xl shadow-md object-contain"
                        />
                    </div>

                </div>
            </main>
        </div>
    );
}
