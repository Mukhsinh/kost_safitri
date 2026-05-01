import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Info, Clock } from "lucide-react";

const rooms = [
    {
        id: "standard",
        name: "Tipe Standard",
        price: "Rp 1.000.000",
        period: "/ bulan",
        size: "3 x 4,5 m",
        available: true,
        comingSoon: false,
        features: ["Single Bed", "Kamar Mandi Dalam", "Lemari", "Meja & Kursi", "AC"],
        image: "/images/standard.png",
    },
    {
        id: "deluxe",
        name: "Tipe Deluxe",
        price: "Rp 1.100.000",
        period: "/ bulan",
        size: "3 x 4,5 m",
        available: true,
        comingSoon: false,
        features: ["Queen Bed", "AC", "Kamar Mandi Dalam", "Lemari Besar"],
        image: "/images/deluxe.png",
    },
    {
        id: "suite",
        name: "Tipe Suite",
        price: "Coming Soon",
        period: "",
        size: "5 x 5 m",
        available: false,
        comingSoon: true,
        features: ["King Bed", "AC", "Kamar Mandi Dalam", "Mini Fridge"],
        image: "/images/kamar suite.png",
    },
];

const Rooms = () => {
    return (
        <section id="kamar" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">
                            Pilihan Kamar
                        </h2>
                        <h3 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
                            Pilih Ruang yang Sesuai Kebutuhan Anda
                        </h3>
                        <p className="text-emerald-900/60 dark:text-emerald-100/60">
                            Setiap tipe kamar dirancang dengan interior modern dan fungsional untuk kenyamanan tinggal maksimal.
                        </p>
                    </div>
                    <Button variant="outline" className="hidden md:flex" asChild>
                        <Link href="#daftar">Booking Sekarang</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className={`group flex flex-col bg-white dark:bg-emerald-900/10 rounded-[2rem] border overflow-hidden hover:shadow-2xl transition-all duration-500 ${room.comingSoon
                                ? "border-emerald-200 dark:border-emerald-700 opacity-80"
                                : "border-emerald-100 dark:border-emerald-800"
                                }`}
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={room.image}
                                    alt={room.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-110 contrast-105 saturate-110"
                                    priority={room.id === 'standard' || room.id === 'deluxe'}
                                />
                                {/* Cinematic gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                {/* Badges */}
                                <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
                                    {room.comingSoon ? (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/90 text-white backdrop-blur-md">
                                            <Clock className="w-3 h-3" />
                                            Coming Soon
                                        </div>
                                    ) : (
                                        <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-md">
                                            Tersedia
                                        </div>
                                    )}
                                    <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-emerald-950 backdrop-blur-md">
                                        {room.size}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-7 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-xl font-bold text-emerald-950 dark:text-emerald-50">
                                        {room.name}
                                    </h4>
                                    <div className="text-right">
                                        {room.comingSoon ? (
                                            <span className="text-base font-bold text-amber-500">Coming Soon</span>
                                        ) : (
                                            <>
                                                <div className="text-xl font-bold text-emerald-600">{room.price}</div>
                                                <div className="text-xs text-emerald-900/40">{room.period}</div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2.5 mb-7">
                                    {room.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2 text-sm text-emerald-800/70 dark:text-emerald-100/70">
                                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-5 border-t border-emerald-50 dark:border-emerald-800 flex gap-3">
                                    {room.comingSoon ? (
                                        <Button variant="secondary" className="flex-grow rounded-xl" disabled>
                                            Segera Hadir
                                        </Button>
                                    ) : (
                                        <Button variant="default" className="flex-grow rounded-xl" asChild>
                                            <Link href="#daftar">Booking Sekarang</Link>
                                        </Button>
                                    )}
                                    <Button variant="outline" size="icon" className="rounded-xl shrink-0">
                                        <Info className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rooms;
