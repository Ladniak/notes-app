"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import SideNav from "../../components/SideNav";
import Button from "@/components/Button";

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: "pending" | "in-progress" | "done";
}

export default function DashboardPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);

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
        setTasks(Array.isArray(data) ? data : []);
    }

    async function handleDelete(id: string) {
        await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        fetchTasks();
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
            <button
                onClick={() => setMenuOpen(true)}
                className="
                                lg:hidden fixed top-4 left-4 
                                bg-white p-3 rounded-xl shadow-md border border-gray-200
                            "
            >
                ☰
            </button>


            <SideNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <main className="flex-1 p-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="
                        mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 
                        text-white p-6 rounded-2xl shadow-md
                        flex justify-between items-center
                    "
                >
                    <div>
                        <h2 className="text-3xl font-bold">Your Tasks</h2>
                        <p className="text-blue-100 mt-1">
                            Manage, track and organize your daily goals
                        </p>
                    </div>

                    <Button
                        onClick={() => router.push("/task/form")}
                        className="bg-white text-blue-600 font-semibold hover:bg-blue-50"
                    >
                        + Add Task
                    </Button>
                </motion.div>

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
                                className="
                                    p-5 bg-white rounded-2xl border border-gray-200 
                                    shadow-sm flex flex-col justify-between transition
                                "
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
                                    <Button
                                        onClick={() => router.push(`/task/${task._id}`)}
                                        variant="secondary"
                                        className="flex-1 text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        onClick={() => handleDelete(task._id)}
                                        variant="danger"
                                        className="flex-1 text-red-600 bg-red-50 hover:bg-red-100"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </main>
        </div>
    );
}
