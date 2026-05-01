"use client";

import React, { useState, useEffect } from "react";
import {
    ArrowUpCircle,
    ArrowDownCircle,
    Download,
    Plus,
    Search,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddTransactionDialog } from "@/components/admin/AddTransactionDialog";

const FinancialPage = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/transactions");
            const data = await res.json();
            setTransactions(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const formatCurrency = (val: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(val);

    const totalIncome = transactions.filter(t => t.type === "Masuk").reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === "Keluar").reduce((acc, t) => acc + t.amount, 0);
    const labaBersih = totalIncome - totalExpense;

    const filteredTransactions = transactions.filter(tx =>
        (tx.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tx.resident?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pembukuan Keuangan</h1>
                    <p className="text-slate-500 font-medium">Pantau arus kas, pemasukan sewa, dan pengeluaran operasional.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" /> Export Laporan
                    </Button>
                    <Button variant="premium" className="gap-2" onClick={() => setIsAddOpen(true)}>
                        <Plus className="w-5 h-5" /> Catat Transaksi
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-emerald-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Pemasukan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Pengeluaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Laba Bersih</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{formatCurrency(labaBersih)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-900 rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="flex gap-2 p-1 bg-slate-100 dark:bg-emerald-900/10 rounded-xl w-full md:w-auto">
                    <button className="px-4 py-2 rounded-lg text-xs font-bold transition-all bg-white dark:bg-emerald-800 text-emerald-600 shadow-sm">
                        Semua
                    </button>
                </div>
                <div className="relative flex-grow w-full md:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari transaksi..."
                        className="w-full h-10 pl-11 pr-4 bg-slate-50 dark:bg-emerald-900/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-900 rounded-[2rem] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-emerald-900/20 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-5">Tanggal / Deskripsi</th>
                                <th className="px-6 py-5">Penghuni / Kategori</th>
                                <th className="px-6 py-5">Jenis</th>
                                <th className="px-8 py-5 text-right">Nominal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-emerald-900/10">
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500" /></td></tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-8 text-slate-400">Belum ada transaksi.</td></tr>
                            ) : filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-slate-800">{new Date(tx.date).toLocaleDateString("id-ID")}</div>
                                        <div className="text-xs text-slate-400 font-medium">{tx.description || "-"}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        {tx.resident && <div className="text-sm font-bold text-slate-800 mb-1">{tx.resident.fullName}</div>}
                                        <div className="text-xs font-semibold text-slate-500 px-2 py-1 bg-slate-100 rounded inline-block">
                                            {tx.category}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "flex items-center gap-2 text-sm font-bold",
                                            tx.type === "Masuk" ? "text-emerald-600" : "text-red-500"
                                        )}>
                                            {tx.type === "Masuk" ? <ArrowUpCircle className="w-4 h-4" /> : <ArrowDownCircle className="w-4 h-4" />}
                                            {tx.type}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right font-bold text-slate-900">{formatCurrency(tx.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddTransactionDialog
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                onSuccess={() => {
                    setIsAddOpen(false);
                    loadData();
                }}
            />
        </div>
    );
};

export default FinancialPage;
