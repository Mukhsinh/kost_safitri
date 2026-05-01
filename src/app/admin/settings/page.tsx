"use client";

import React from "react";
import {
    Shield,
    Key,
    Bell,
    Globe,
    Database,
    Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SettingsPage = () => {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pengaturan Sistem</h1>
                <p className="text-slate-500 font-medium">Konfigurasi keamanan, notifikasi, dan integrasi database Kost SAFITRI.</p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-emerald-600" />
                            <CardTitle className="text-xl">Profil Admin</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                                <input type="text" defaultValue="Admin Safitri" className="w-full h-11 px-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email Utama</label>
                                <input type="email" defaultValue="admin@kostsafitri.com" className="w-full h-11 px-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                            </div>
                        </div>
                        <Button size="sm" className="gap-2">
                            <Save className="w-4 h-4" /> Simpan Perubahan
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Key className="w-6 h-6 text-amber-500" />
                            <CardTitle className="text-xl">Keamanan & Password</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-slate-500 mb-4">Ganti kata sandi Anda secara berkala untuk menjaga keamanan data penghuni.</p>
                        <div className="grid grid-cols-1 gap-4 max-w-sm">
                            <input type="password" placeholder="Password Lama" className="w-full h-11 px-4 bg-slate-50 rounded-xl border border-slate-200" />
                            <input type="password" placeholder="Password Baru" className="w-full h-11 px-4 bg-slate-50 rounded-xl border border-slate-200" />
                            <Button variant="outline" className="w-fit">Update Password</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <Bell className="w-6 h-6 text-blue-500" />
                            <CardTitle className="text-xl">Notifikasi WhatsApp</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                            <div>
                                <div className="font-bold">Pengingat Pembayaran Otomatis</div>
                                <div className="text-xs text-slate-500">Kirim pesan WA 3 hari sebelum jatuh tempo.</div>
                            </div>
                            <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SettingsPage;
