import SideNav from "./components/SideNav";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Task from "@/models/Task";
import connectDB from "@/lib/db";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    await connectDB();
    const tasks = await Task.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return (
        <div className="flex min-h-screen">
            <SideNav />

            <div className="flex-1 p-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3">Your Tasks</h2>
                    {tasks.length === 0 ? (
                        <p>No tasks yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {tasks.map((task) => (
                                <li key={task._id} className="p-3 border rounded flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{task.title}</p>
                                        {task.description && <p className="text-gray-500">{task.description}</p>}
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${task.completed ? "bg-green-200" : "bg-yellow-200"
                                            }`}
                                    >
                                        {task.completed ? "Done" : "Pending"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
}
