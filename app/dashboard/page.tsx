"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
        else setTasks([]);
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

    function handleEdit(task: Task) {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description || "");
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
            <SideNav />

            <main className="flex-1 p-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md"
                >
                    <h2 className="text-3xl font-bold">Your Tasks</h2>
                    <p className="text-blue-100 mt-1">
                        Manage, track and organize your daily goals
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-md mb-8 border border-gray-200"
                >
                    <h3 className="text-xl font-semibold mb-4">
                        {editingTask ? "Edit Task " : "Add New Task "}
                    </h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Task title"
                            className="w-full border border-gray-300 p-3 rounded-xl focus:border-blue-500 outline-none transition"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Description (optional)"
                            className="w-full border border-gray-300 p-3 rounded-xl focus:border-blue-500 outline-none transition"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow"
                        >
                            {editingTask ? "Save Changes" : "Add Task"}
                        </button>
                    </div>
                </motion.form>

                {tasks.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-500 text-center mt-20"
                    >
                        No tasks yet. Start by adding your first one
                    </motion.p>
                ) : (
                    <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {tasks.map((task) => (
                            <motion.li
                                key={task._id}
                                whileHover={{ scale: 1.02 }}
                                className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between transition"
                            >
                                <div>
                                    <h4 className="text-lg font-semibold mb-2 text-gray-800">
                                        {task.title}
                                    </h4>
                                    {task.description && (
                                        <p className="text-gray-600 text-sm mb-4">
                                            {task.description}
                                        </p>
                                    )}
                                    <span
                                        className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${task.status === "done"
                                            ? "bg-green-100 text-green-600"
                                            : task.status === "in-progress"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {task.status}
                                    </span>
                                </div>

                                <div className="flex gap-3 mt-5">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="flex-1 bg-indigo-50 text-indigo-600 font-medium py-2 rounded-xl hover:bg-indigo-100 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="flex-1 bg-red-50 text-red-600 font-medium py-2 rounded-xl hover:bg-red-100 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </main>
        </div>
    );
}
