import React from "react";
import { MessageCircle } from "lucide-react";

const FloatingWA = () => {
    const waNumber = "6285848370037";
    const message = "Selamat datang di Kost Safitri, mohon informasi lebih lanjut tentang Kost Safitri";
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    return (
        <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 md:bottom-10 right-6 z-50 group"
            aria-label="Chat WhatsApp Admin"
        >
            <div className="relative">
                {/* Radar Effect */}
                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25"></div>

                <div className="relative bg-emerald-500 text-white p-4 rounded-full shadow-2xl isometric-card group-hover:bg-emerald-600 transition-colors">
                    <MessageCircle className="w-8 h-8" />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-emerald-900 px-4 py-2 rounded-xl shadow-xl text-sm font-bold text-emerald-950 dark:text-emerald-50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-emerald-100 dark:border-emerald-800">
                    Tanya Admin (WA)
                </div>
            </div>
        </a>
    );
};

export default FloatingWA;
