"use client";

import React, { useState, useEffect } from "react";
import {
    Star,
    CheckCircle,
    XCircle,
    Loader2
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getReviews, updateReviewStatus } from "../actions";

const ReviewsManagementPage = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getReviews();
            setReviews(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const toggleStatus = async (id: string, isApproved: boolean) => {
        await updateReviewStatus(id, isApproved);
        loadData();
    };

    const pendingCount = reviews.filter(r => !r.isApproved).length;
    const avgRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0.0";

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Moderasi Testimoni</h1>
                    <p className="text-slate-500 font-medium">Kelola ulasan dari penghuni untuk ditampilkan di Landing Page.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-emerald-600 text-white border-0">
                    <CardContent className="p-6">
                        <div className="text-sm font-medium opacity-80 mb-1">Total Ulasan</div>
                        <div className="text-3xl font-bold">{reviews.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm font-medium text-slate-500 mb-1">Rating Rata-rata</div>
                        <div className="flex items-center gap-2">
                            <div className="text-3xl font-bold text-slate-900">{avgRating}</div>
                            <div className="flex text-amber-400">
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 text-amber-600 bg-amber-50 rounded-3xl">
                        <div className="text-sm font-medium opacity-80 mb-1">Menunggu Review</div>
                        <div className="text-3xl font-bold">{pendingCount}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white dark:bg-emerald-950 border border-slate-200 dark:border-emerald-900 rounded-[2rem] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-emerald-900/20 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                                <th className="px-8 py-5">Penulis / Tanggal</th>
                                <th className="px-6 py-5">Rating & Ulasan</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Moderasi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-emerald-900/10">
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-500" /></td></tr>
                            ) : reviews.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-8 text-slate-400">Belum ada ulasan.</td></tr>
                            ) : reviews.map((res) => (
                                <tr key={res.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-slate-800">{res.resident ? res.resident.fullName : "Anonim"}</div>
                                        <div className="text-xs text-slate-400">{new Date(res.createdAt).toLocaleDateString("id-ID")}</div>
                                    </td>
                                    <td className="px-6 py-5 max-w-md">
                                        <div className="flex gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star
                                                    key={s}
                                                    className={cn("w-3 h-3", s <= res.rating ? "text-amber-400 fill-current" : "text-slate-200")}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-slate-600 italic leading-relaxed">"{res.comment}"</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={cn(
                                            "inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter",
                                            res.isApproved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                        )}>
                                            {res.isApproved ? "Ditampilkan" : "Menunggu"}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right flex justify-end gap-2">
                                        {!res.isApproved ? (
                                            <button
                                                onClick={() => toggleStatus(res.id, true)}
                                                className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                                title="Setujui"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => toggleStatus(res.id, false)}
                                                className="p-2 bg-amber-50 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                                                title="Sembunyikan"
                                            >
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReviewsManagementPage;
