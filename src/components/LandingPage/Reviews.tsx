import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Dewi Rahayu",
        role: "Mahasiswi",
        rating: 5,
        comment: "Kostnya bersih dan nyaman banget! AC-nya dingin, WiFi kenceng, dan lingkungannya di perumahan jadi terasa aman dan tenang. Sangat puas tinggal di sini.",
        initials: "DR",
        color: "bg-emerald-500",
    },
    {
        id: 2,
        name: "Siti Nurhaliza",
        role: "Karyawati Swasta",
        rating: 5,
        comment: "Lokasinya di Saphire Townhouse strategis dan eksklusif. Pemilik kost juga sangat baik dan responsif via WhatsApp. Kamar mandinya bersih dengan shower yang oke.",
        initials: "SN",
        color: "bg-blue-500",
    },
    {
        id: 3,
        name: "Rina Agustin",
        role: "Guru SD",
        rating: 5,
        comment: "Lingkungan perumahannya bikin betah, asri dan tidak berisik. Cocok sekali untuk yang kerja atau butuh suasana belajar yang kondusif. Recommended!",
        initials: "RA",
        color: "bg-violet-500",
    },
];

const Reviews = () => {
    return (
        <section id="testimoni" className="py-24 bg-emerald-50/30 dark:bg-emerald-950/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">
                        Kata Mereka
                    </h2>
                    <h3 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
                        Penghuni Puas adalah Prioritas Kami
                    </h3>
                    <p className="text-emerald-900/60 dark:text-emerald-100/60">
                        Pengalaman nyata dari penghuni Kost SAFITRI yang telah merasakan kenyamanan hunian paviliun modern kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="relative p-8 rounded-[2rem] bg-white dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 isometric-card hover:shadow-xl transition-all duration-300"
                        >
                            <Quote className="absolute top-6 right-8 w-10 h-10 text-emerald-50 dark:text-emerald-800" />

                            <div className="flex items-center gap-1 mb-5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                                    />
                                ))}
                            </div>

                            <p className="text-emerald-900/70 dark:text-emerald-100/70 italic mb-8 relative z-10 leading-relaxed font-medium">
                                &ldquo;{review.comment}&rdquo;
                            </p>

                            <div className="flex items-center gap-4">
                                {/* Initials Avatar */}
                                <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                    {review.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-emerald-950 dark:text-emerald-50">
                                        {review.name}
                                    </h4>
                                    <p className="text-xs text-emerald-600 font-medium">
                                        {review.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
