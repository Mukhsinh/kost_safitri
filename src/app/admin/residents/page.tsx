"use client";

import React, { useState, useEffect } from "react";
import {
    Search,
    Copy,
    Check,
    MoreHorizontal,
    MessageCircle,
    UserPlus,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AddResidentDialog } from "@/components/admin/AddResidentDialog";

const ResidentsPage = () => {
    const [copied, setCopied] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [residents, setResidents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/residents");
            const data = await res.json();
            setResidents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleStatusChange = async (id: string, currentStatus: string) => {
        let nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
        const isPending = currentStatus === "Pending";

        if (isPending) {
            if (!confirm(`Terima pendaftaran ini dan aktifkan penghuni?`)) return;
            nextStatus = "Active";
        } else {
            if (!confirm(`Ubah status penghuni menjadi ${nextStatus}?`)) return;
        }

        await fetch(`/api/admin/residents/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: nextStatus }),
        });
        loadData();
    };

    const filteredResidents = residents.filter(r =>
        r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.nik.includes(searchTerm)
    );

    const copyAllNumbers = () => {
        const numbers = residents.map(r => r.whatsapp).join(", ");
        if (!numbers) return;
        navigator.clipboard.writeText(numbers);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openWhatsApp = (number: string) => {
        window.open(`https://wa.me/${number}`, "_blank");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Data Penghuni</h1>
                    <p className="text-slate-500 font-medium">Manajemen data master dan status hunian Kost SAFITRI.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="gap-2" onClick={copyAllNumbers}>
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        Copy All WA
                    </Button>
                    <Button variant="premium" className="gap-2" onClick={() => setIsAddOpen(true)}>
                        <UserPlus className="w-5 h-5" /> Tambah Penghuni
                    </Button>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-900 rounded-[2rem] p-4 flex items-center gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan nama atau NIK..."
                        className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-emerald-900/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-900 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-emerald-900/20 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-5">Nama / NIK</th>
                                <th className="px-6 py-5">No. WhatsApp</th>
                                <th className="px-6 py-5">Tipe Kamar</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-emerald-900/10">
                            {loading ? (
                                <tr><td colSpan={5} className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500" /></td></tr>
                            ) : filteredResidents.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-8 text-slate-400">Belum ada penghuni.</td></tr>
                            ) : filteredResidents.map((res) => (
                                <tr key={res.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-slate-800">{res.fullName}</div>
                                        <div className="text-xs text-slate-400">NIK: {res.nik}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <button
                                            onClick={() => openWhatsApp(res.whatsapp)}
                                            className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-lg px-2 py-1 -ml-2"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            {res.whatsapp}
                                        </button>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-sm font-bold text-slate-800 uppercase">{res.roomType}</div>
                                        <div className="text-xs text-slate-400">Masuk: {new Date(res.checkInDate).toLocaleDateString("id-ID")}</div>
                                    </td>
                                    <td className="px-6 py-5 cursor-pointer" onClick={() => handleStatusChange(res.id, res.status)}>
                                        <div className={cn(
                                            "inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter hover:opacity-80 transition-opacity",
                                            res.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                                                res.status === "Pending" ? "bg-amber-100 text-amber-700" :
                                                    "bg-slate-100 text-slate-700"
                                        )}>
                                            {res.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            {res.status === "Pending" && (
                                                <button
                                                    onClick={() => handleStatusChange(res.id, res.status)}
                                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                    title="Setujui"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                                                <MoreHorizontal className="w-5 h-5 text-slate-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddResidentDialog
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

export default ResidentsPage;
