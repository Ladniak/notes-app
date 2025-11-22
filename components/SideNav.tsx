"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SideNav({ isOpen, onClose }: any) {
    const pathname = usePathname();

    const navItems = [
        { label: "Tasks", href: "/dashboard" },
        { label: "Profile", href: "/dashboard/profile" },
        { label: "Settings", href: "/dashboard/settings" },
    ];

    const handleSignOut = () => {
        signOut({ callbackUrl: "/login" });
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 w-64 bg-white shadow-xl z-40 h-full
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:static lg:translate-x-0 lg:shadow-md lg:h-auto
                `}
            >
                <div className="flex flex-col justify-between h-full">

                    <nav className="p-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathname === item.href
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 hover:bg-blue-100"
                                            }`}
                                        onClick={onClose}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-4 flex items-center justify-between text-gray-600">
                        <button
                            onClick={handleSignOut}
                            className="p-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
                        >
                            <LogOut size={22} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
