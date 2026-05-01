import React, { useState, useEffect } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddTransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddTransactionDialog({ isOpen, onClose, onSuccess }: AddTransactionDialogProps) {
    const [loading, setLoading] = useState(false);
    const [residents, setResidents] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        type: "Masuk",
        category: "Sewa Kamar",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        residentId: "",
    });

    useEffect(() => {
        if (isOpen) {
            fetch("/api/admin/residents")
                .then(res => res.json())
                .then(setResidents)
                .catch(console.error);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: formData.type,
                    category: formData.category,
                    amount: parseFloat(formData.amount),
                    description: formData.description,
                    date: formData.date,
                    residentId: formData.residentId || undefined,
                }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Gagal menyimpan");
            }
            setFormData({ type: "Masuk", category: "Sewa Kamar", amount: "", description: "", date: new Date().toISOString().split("T")[0], residentId: "" });
            onSuccess();
        } catch (error: any) {
            console.error(error);
            alert(`Gagal mencatat transaksi: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-emerald-950 w-full max-w-lg rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-emerald-900">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Catat Transaksi</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Jenis</label>
                            <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value, category: e.target.value === "Masuk" ? "Sewa Kamar" : "Listrik" })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-slate-800">
                                <option value="Masuk">Pemasukan (Masuk)</option>
                                <option value="Keluar">Pengeluaran (Keluar)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Tanggal</label>
                            <input required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Kategori</label>
                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-slate-800">
                            {formData.type === "Masuk" ? (
                                <>
                                    <option value="Sewa Kamar">Sewa Kamar</option>
                                    <option value="Deposit">Deposit</option>
                                    <option value="Lainnya">Lainnya</option>
                                </>
                            ) : (
                                <>
                                    <option value="Listrik">Listrik</option>
                                    <option value="Air">Air</option>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Operasional">Operasional</option>
                                    <option value="Lainnya">Lainnya</option>
                                </>
                            )}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Pilih Penghuni (Opsional)</label>
                        <select value={formData.residentId} onChange={e => setFormData({ ...formData, residentId: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800">
                            <option value="">- Tidak ada / Umum -</option>
                            {residents.map((r: any) => (
                                <option key={r.id} value={r.id}>{r.fullName} (NIK: {r.nik})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Nominal (Rp)</label>
                        <input required type="number" min="0" step="1000" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: 1500000" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Keterangan Tambahan</label>
                        <input type="text" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: Pembayaran transfer BCA" />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
                        <Button type="submit" variant="premium" disabled={loading} className="gap-2">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Simpan Transaksi
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
