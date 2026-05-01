"use client";

import React from "react";
import Link from "next/link";
import { Home, Grid, UserPlus, Image as ImageIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav = () => {
    const menus = [
        { name: "Beranda", icon: Home, href: "#" },
        { name: "Fasilitas", icon: Grid, href: "#fasilitas" },
        { name: "Daftar", icon: UserPlus, href: "#daftar", primary: true },
        { name: "Foto", icon: ImageIcon, href: "#kamar" },
        { name: "Lokasi", icon: MapPin, href: "#lokasi" },
    ];

    return (
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
            <div className="bg-white/80 dark:bg-emerald-950/80 backdrop-blur-xl border border-white/20 dark:border-emerald-800/50 rounded-2xl shadow-2xl p-2 flex items-center justify-between">
                {menus.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all",
                            item.primary
                                ? "bg-emerald-600 text-white rounded-xl py-2 shadow-lg shadow-emerald-500/30 scale-110 -translate-y-4"
                                : "text-emerald-900/60 dark:text-emerald-100/60 hover:text-emerald-600"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5", item.primary && "w-6 h-6")} />
                        <span className={cn("text-[10px] font-bold uppercase tracking-tighter", item.primary ? "text-white" : "text-emerald-900/40")}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
