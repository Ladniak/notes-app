"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
    const pathname = usePathname();

    const navItems = [
        { label: "Tasks", href: "/dashboard" },
        { label: "Profile", href: "/dashboard/profile" },
        { label: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <nav className="w-64 h-screen bg-gray-100 p-4">
            <ul className="space-y-3">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={`block p-2 rounded ${pathname === item.href ? "bg-blue-500 text-white" : "text-gray-700"
                                }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
