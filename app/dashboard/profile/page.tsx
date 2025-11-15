"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SideNav from "../../../components/SideNav";
import Button from "@/components/Button";

export default function ProfilePage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        inProgress: 0,
        pending: 0,
    });

    useEffect(() => {
        fetch("/api/users/stats")
            .then(res => res.json())
            .then(data => {
                if (!data.message) {
                    setStats(data);
                }
            });
    }, []);


    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        setIsLoading(true);
        setMessage("");

        const res = await fetch("/api/users/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("Ok " + data.message);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else {
            setMessage("error " + data.message);
        }

        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SideNav />

            <main className="flex-1 p-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Profile</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: "Total Tasks", value: stats.total, color: "text-blue-600" },
                        { label: "Completed", value: stats.completed, color: "text-green-600" },
                        { label: "In Progress", value: stats.inProgress, color: "text-yellow-600" },
                        { label: "Pending", value: stats.pending, color: "text-red-600" },
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
                        >
                            <p className="text-gray-500">{stat.label}</p>
                            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                        </motion.div>
                    ))}
                </div>


                <section className="bg-white p-8 rounded-2xl shadow-md max-w-lg border border-gray-100">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                        Change Password
                    </h3>

                    <form onSubmit={handlePasswordChange} className="space-y-5">
                        <input
                            type="password"
                            placeholder="Current password"
                            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="New password"
                            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <Button type="submit" isLoading={isLoading}>
                            {isLoading ? "Updating..." : "Update Password"}
                        </Button>

                    </form>

                    {message && (
                        <p
                            className={`mt-4 text-center font-medium ${message.includes("Ok") ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </section>
            </main>
        </div>
    );
}
