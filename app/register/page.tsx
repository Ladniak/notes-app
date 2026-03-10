"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) router.push("/login");
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 w-full max-w-md">

                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <input
                        placeholder="Name"
                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <button className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                        Register
                    </button>

                </form>

                <p className="text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    );
}