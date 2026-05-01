import React, { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddResidentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AddResidentDialog({ isOpen, onClose, onSuccess }: AddResidentDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nik: "",
        fullName: "",
        whatsapp: "",
        roomType: "Standard",
        checkInDate: new Date().toISOString().split("T")[0],
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/residents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Gagal menyimpan");
            }
            setFormData({ nik: "", fullName: "", whatsapp: "", roomType: "Standard", checkInDate: new Date().toISOString().split("T")[0] });
            onSuccess();
        } catch (error: any) {
            console.error(error);
            alert(`Gagal menambahkan penghuni: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-emerald-950 w-full max-w-lg rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-emerald-900">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Tambah Penghuni Baru</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Nama Lengkap</label>
                        <input required type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">NIK</label>
                        <input required type="text" value={formData.nik} onChange={e => setFormData({ ...formData, nik: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Nomor WhatsApp</label>
                        <input required type="text" value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Tipe Kamar</label>
                            <select value={formData.roomType} onChange={e => setFormData({ ...formData, roomType: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none font-medium">
                                <option value="Standard">Standard</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Suite">Suite</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-emerald-100">Tanggal Masuk</label>
                            <input required type="date" value={formData.checkInDate} onChange={e => setFormData({ ...formData, checkInDate: e.target.value })} className="w-full h-11 px-4 bg-slate-50 dark:bg-emerald-900/20 rounded-xl border border-slate-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
                        <Button type="submit" variant="premium" disabled={loading} className="gap-2">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Simpan Penghuni
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
