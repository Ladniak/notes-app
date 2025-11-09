"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideNav from "../../components/SideNav";

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "done";
}

export default function DashboardPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        const res = await fetch("/api/tasks");
        if (res.status === 401) {
            router.push("/login");
            return;
        }
        const data = await res.json();
        if (Array.isArray(data)) setTasks(data);
        else setTasks([]); // безпечний fallback
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const method = editingTask ? "PUT" : "POST";
        const url = editingTask ? `/api/tasks/${editingTask._id}` : "/api/tasks";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, status: "pending" }),
        });

        setTitle("");
        setDescription("");
        setEditingTask(null);
        fetchTasks();
    }

    async function handleDelete(id: string) {
        await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        fetchTasks();
    }

    async function handleEdit(task: Task) {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description || "");
    }

    return (
        <div className="flex min-h-screen">
            <SideNav />

            <main className="flex-1 p-6 bg-gray-50">
                <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>

                <form
                    onSubmit={handleSubmit}
                    className="mb-6 space-y-3 bg-white p-4 rounded-lg shadow"
                >
                    <input
                        type="text"
                        placeholder="Task title"
                        className="w-full border p-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full border p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {editingTask ? "Update Task" : "Add Task"}
                    </button>
                </form>

                {tasks.length === 0 ? (
                    <p className="text-gray-600">No tasks yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {tasks.map((task) => (
                            <li
                                key={task._id}
                                className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-medium text-lg">{task.title}</p>
                                    {task.description && (
                                        <p className="text-gray-500 text-sm">{task.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
