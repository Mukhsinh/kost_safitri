import React from "react";
import {
    Wifi,
    Wind,
    Bath,
    Bed,
    Car,
    Trees,
    ShieldCheck,
    Cctv
} from "lucide-react";

const facilities = [
    {
        name: "Premium AC",
        description: "Pendingin ruangan hemat energi di setiap kamar.",
        icon: Wind,
        color: "bg-blue-100 text-blue-600",
    },
    {
        name: "WiFi Cepat",
        description: "Koneksi internet berkecepatan tinggi tanpa batas.",
        icon: Wifi,
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        name: "Kamar Mandi Dalam",
        description: "Privasi terjaga dengan kamar mandi shower modern.",
        icon: Bath,
        color: "bg-cyan-100 text-cyan-600",
    },
    {
        name: "Kasur Springbed",
        description: "Kualitas tidur terbaik dengan kasur premium.",
        icon: Bed,
        color: "bg-indigo-100 text-indigo-600",
    },
    {
        name: "Area Parkir",
        description: "Tempat parkir aman dan luas untuk motor dan mobil.",
        icon: Car,
        color: "bg-amber-100 text-amber-600",
    },
    {
        name: "Lingkungan Nyaman",
        description: "Kawasan perumahan asri, tenang, dan bersih.",
        icon: Trees,
        color: "bg-green-100 text-green-600",
    },
    {
        name: "Keamanan 24/7",
        description: "Penjagaan lingkungan perumahan setiap saat.",
        icon: ShieldCheck,
        color: "bg-red-100 text-red-600",
    },
    {
        name: "CCTV",
        description: "Sistem pemantauan kamera di seluruh area.",
        icon: Cctv,
        color: "bg-slate-100 text-slate-600",
    },
];

const Facilities = () => {
    return (
        <section id="fasilitas" className="py-24 bg-emerald-50/30 dark:bg-emerald-950/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">
                        Fasilitas Unggulan
                    </h2>
                    <h3 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
                        Kenyamanan Tanpa Kompromi
                    </h3>
                    <p className="text-emerald-900/60 dark:text-emerald-100/60">
                        Kami menyediakan fasilitas modern di kawasan perumahan premium untuk mendukung kenyamanan tinggal Anda setiap hari.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {facilities.map((fac) => (
                        <div
                            key={fac.name}
                            className="group p-7 rounded-3xl bg-white dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 isometric-card hover:border-emerald-400 hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${fac.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                <fac.icon className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-bold text-emerald-950 dark:text-emerald-50 mb-1.5">
                                {fac.name}
                            </h4>
                            <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60 leading-relaxed">
                                {fac.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Facilities;
