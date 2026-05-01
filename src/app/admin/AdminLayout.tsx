"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Wallet,
    MessageSquare,
    Settings,
    LogOut,
    Bell,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session && !isLoginPage) {
                router.push("/admin/login");
            } else if (session) {
                setUser(session.user);
            }
            setLoading(false);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session && !isLoginPage) {
                router.push("/admin/login");
            } else if (session) {
                setUser(session.user);
            }
        });

        return () => subscription.unsubscribe();
    }, [isLoginPage, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    if (loading && !isLoginPage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-emerald-950">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (isLoginPage) {
        return <>{children}</>;
    }

    const sidebarItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Penghuni", href: "/admin/residents", icon: Users },
        { name: "Keuangan", href: "/admin/finance", icon: Wallet },
        { name: "Testimoni", href: "/admin/reviews", icon: MessageSquare },
        { name: "Pengaturan", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-emerald-950/10 flex">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white dark:bg-emerald-950 border-r border-slate-200 dark:border-emerald-900 flex flex-col fixed inset-y-0 z-50">
                <div className="p-6">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                            <LayoutDashboard className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-emerald-950 dark:text-emerald-50 tracking-tight">
                            Admin <span className="text-emerald-600">SAFITRI</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-emerald-50 hover:text-emerald-600",
                                pathname === item.href
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm shadow-emerald-500/5 dark:bg-emerald-900/40 dark:border-emerald-800"
                                    : "text-slate-600 dark:text-emerald-100/60"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-emerald-900">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow ml-64 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-20 bg-white dark:bg-emerald-950 border-b border-slate-200 dark:border-emerald-900 px-8 flex items-center justify-between sticky top-0 z-40">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-emerald-50">Panel Administrasi</h2>

                    <div className="flex items-center gap-6">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-emerald-900 pl-6">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold uppercase">
                                {user?.email?.charAt(0) || "A"}
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-sm font-bold text-slate-800 dark:text-emerald-50">
                                    {user?.email?.split('@')[0] || "Admin"}
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-tighter">Superadmin</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

