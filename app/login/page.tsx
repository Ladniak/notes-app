"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        });
        if (res?.ok) router.push("/dashboard");
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
                <button className="bg-blue-500 text-white py-2 rounded">Login</button>
            </form>
        </main>
    );
}
