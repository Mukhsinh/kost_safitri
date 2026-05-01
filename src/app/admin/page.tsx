import React from "react";
import { cn } from "@/lib/utils";
import {
    Users,
    TrendingUp,
    Wallet
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getDashboardStats() {
    const { count: totalResidents } = await supabase
        .from("Resident")
        .select("*", { count: "exact", head: true })
        .eq("status", "Active");

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const { data: transactions } = await supabase
        .from("Transaction")
        .select("type, amount")
        .gte("date", firstDay);

    const income = (transactions || []).filter(t => t.type === "Masuk").reduce((acc, t) => acc + t.amount, 0);
    const expense = (transactions || []).filter(t => t.type === "Keluar").reduce((acc, t) => acc + t.amount, 0);

    const { data: recentResidents } = await supabase
        .from("Resident")
        .select("*")
        .order("createdAt", { ascending: false })
        .limit(3);

    return {
        totalResidents: totalResidents || 0,
        income,
        expense,
        recentResidents: recentResidents || [],
    };
}

const AdminDashboard = async () => {
    let data = { totalResidents: 0, income: 0, expense: 0, recentResidents: [] as any[] };
    try {
        data = await getDashboardStats();
    } catch (e) {
        console.error("Failed to load dashboard stats:", e);
    }

    const formatCurrency = (val: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);

    const stats = [
        {
            name: "Total Penghuni",
            value: data.totalResidents.toString(),
            change: "Aktif",
            trend: "up",
            icon: Users,
            color: "text-blue-600 bg-blue-50"
        },
        {
            name: "Pemasukan Bulan Ini",
            value: formatCurrency(data.income),
            change: "Masuk",
            trend: "up",
            icon: Wallet,
            color: "text-emerald-600 bg-emerald-50"
        },
        {
            name: "Pengeluaran Bulan Ini",
            value: formatCurrency(data.expense),
            change: "Keluar",
            trend: "down",
            icon: TrendingUp,
            color: "text-red-600 bg-red-50"
        },
    ];

    const labaBersih = data.income - data.expense;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Statistik Utama</h1>
                <p className="text-slate-500">Ringkasan aktivitas operasional Kost SAFITRI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="p-6 bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-900 rounded-3xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-4 rounded-2xl", stat.color)}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-sm font-bold",
                                stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                            )}>
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-sm font-medium text-slate-400 mb-1">{stat.name}</div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Pendaftar Terbaru Table */}
                <div className="bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-900 rounded-3xl p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold">Penghuni Terbaru</h2>
                    </div>
                    <div className="space-y-6">
                        {data.recentResidents.map((res: any, idx: number) => (
                            <div key={res.id} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 text-sm">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">{res.fullName}</div>
                                        <div className="text-xs text-slate-400 font-medium">{res.roomType} • {new Date(res.createdAt).toLocaleDateString("id-ID")}</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">
                                    {res.status}
                                </div>
                            </div>
                        ))}
                        {data.recentResidents.length === 0 && (
                            <div className="text-sm text-slate-400 py-4">Belum ada penghuni.</div>
                        )}
                    </div>
                </div>

                {/* Laba Bersih Card */}
                <div className="bg-emerald-600 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-emerald-500/20">
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold mb-2">Laba Bersih Bulan Ini</h2>
                        <div className="text-4xl font-bold mb-8">{formatCurrency(labaBersih)}</div>
                    </div>
                    <Wallet className="absolute -bottom-6 -right-6 w-48 h-48 opacity-10" />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
