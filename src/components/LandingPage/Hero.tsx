import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Cinematic background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 dark:from-emerald-950 dark:via-slate-900 dark:to-emerald-950" />
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Copy */}
                <div className="flex flex-col gap-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold w-fit border border-emerald-200">
                        <MapPin className="w-3 h-3" />
                        Pekalongan · Kost Paviliun Modern
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-emerald-950 dark:text-emerald-50 leading-[1.1]">
                        Kost Paviliun <span className="text-emerald-600">Modern</span> untuk Gaya Hidup Dinamis
                    </h1>

                    <p className="text-lg text-emerald-900/60 dark:text-emerald-100/60 max-w-lg leading-relaxed">
                        Hunian eksklusif di kawasan perumahan premium Pekalongan. Fasilitas lengkap, lingkungan asri, keamanan 24 jam.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button variant="premium" size="lg" className="gap-2" asChild>
                            <Link href="#daftar">
                                Sewa Sekarang <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <Link href="#kamar">Lihat Kamar</Link>
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 mt-2">
                        {["Premium AC", "Free WiFi", "CCTV 24/7"].map((item) => (
                            <div key={item} className="flex items-center gap-2 text-sm font-medium text-emerald-800/80 dark:text-emerald-100/80">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Cinematic Image */}
                <div className="relative group">
                    {/* Glow */}
                    <div className="absolute inset-0 -z-10 scale-95 blur-2xl opacity-30 bg-emerald-400 rounded-[2.5rem]" />

                    <div className="relative z-10 w-full aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-emerald-900/30 border border-white/30">
                        <Image
                            src="/images/gambar hero.png"
                            alt="Kost Paviliun SAFITRI Pekalongan"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 brightness-110 contrast-105 saturate-110"
                            priority
                        />
                        {/* Cinematic overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-6 -left-6 z-20 glass-morphism p-5 rounded-2xl shadow-xl border border-white/40 hidden sm:block">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                ★
                            </div>
                            <div>
                                <div className="text-sm font-bold text-emerald-950">5/5 Rating</div>
                                <div className="text-xs text-emerald-700/70">Dari 10+ Penghuni</div>
                            </div>
                        </div>
                    </div>

                    {/* Location badge */}
                    <div className="absolute -top-4 -right-4 z-20 glass-morphism px-4 py-2 rounded-xl shadow-lg border border-white/40 hidden sm:flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-950">Saphire Townhouse, PKL</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
