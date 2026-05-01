"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { LayoutDashboard, Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("sarahsafitri33@gmail.com");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push("/admin");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Gagal masuk. Periksa kembali email dan password Anda.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-emerald-950/10 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-xl shadow-emerald-500/20">
                        <LayoutDashboard className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">
                        Admin <span className="text-emerald-600">SAFITRI</span>
                    </h1>
                    <p className="text-slate-500 mt-2">Masuk ke panel administrasi</p>
                </div>

                <Card className="border-slate-200 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <CardHeader>
                        <CardTitle>Log In</CardTitle>
                        <CardDescription>
                            Gunakan kredensial admin Anda untuk melanjutkan.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-600 text-sm animate-shake">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Input
                                        type="email"
                                        placeholder="admin@example.com"
                                        className="pl-10 h-11 rounded-xl"
                                        value={email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 h-11 rounded-xl"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-600/20"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Memproses...
                                    </span>
                                ) : (
                                    "Masuk Sekarang"
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <p className="text-center text-xs text-slate-400 mt-8">
                    &copy; 2024 KOST SAFITRI Pekalongan. All rights reserved.
                </p>
            </div>
        </div>
    );
}
