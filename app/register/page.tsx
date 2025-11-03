"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <main className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
                <button className="bg-blue-500 text-white py-2 rounded">Register</button>
            </form>
        </main>
    );
}
