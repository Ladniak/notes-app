"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SideNav() {
    const pathname = usePathname();

    const navItems = [
        { label: "Tasks", href: "/dashboard" },
        { label: "Profile", href: "/dashboard/profile" },
        { label: "Settings", href: "/dashboard/settings" },
    ];

    const handleSignOut = () => {
        signOut({ callbackUrl: "/login" })
    }

    return (
        <div className="flex flex-col justify-between h-screen w-64 bg-gray-100 p-4">
            <nav>
                <ul className="space-y-3">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`block p-2 rounded ${pathname === item.href
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-blue-100"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex justify-end">
                <button
                    onClick={handleSignOut}
                >
                    <LogOut size={24} strokeWidth={2} />
                </button>
            </div>
        </div>
    );
}