"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });

        if (res?.ok) {
            router.push("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 w-full max-w-md">

                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
                        Login
                    </button>

                </form>

                {error && (
                    <p className="text-red-600 text-center mt-4 font-medium">
                        {error}
                    </p>
                )}

                <p className="text-center text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </main>
    );
}