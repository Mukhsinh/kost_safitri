import React from "react";
import Link from "next/link";
import { Home, Mail, Phone, Camera, Globe, MapPin, Navigation } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-emerald-950 text-emerald-50 py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                            <Home className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            Kost <span className="text-emerald-500">SAFITRI</span>
                        </span>
                    </Link>
                    <p className="text-emerald-100/60 leading-relaxed max-w-xs text-sm">
                        Kost paviliun modern di kawasan perumahan premium Pekalongan. Nyaman, aman, dan terjangkau.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                            aria-label="Instagram"
                        >
                            <Camera className="w-5 h-5 text-emerald-100" />
                        </a>
                        <a
                            href="https://maps.app.goo.gl/DTRv8uyUk6pWfRYY6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-emerald-900 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                            aria-label="Google Maps"
                        >
                            <Globe className="w-5 h-5 text-emerald-100" />
                        </a>
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h4 className="text-lg font-bold mb-6">Navigasi</h4>
                    <ul className="flex flex-col gap-4 text-emerald-100/60 text-sm">
                        {["Beranda", "Fasilitas", "Kamar", "Testimoni", "Daftar"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={`#${item.toLowerCase()}`}
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact — no email */}
                <div>
                    <h4 className="text-lg font-bold mb-6">Hubungi Kami</h4>
                    <ul className="flex flex-col gap-5 text-emerald-100/60 text-sm">
                        <li>
                            <a
                                href="https://wa.me/6285848370037"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 hover:text-emerald-400 transition-colors"
                            >
                                <Phone className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>0858-4837-0037</span>
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>Perumahan Saphire Townhouse Blok P8, Pekalongan</span>
                        </li>
                        <li>
                            <a
                                href="https://maps.app.goo.gl/DTRv8uyUk6pWfRYY6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors"
                            >
                                <Navigation className="w-3.5 h-3.5" />
                                Buka di Google Maps
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Map Embed */}
                <div id="lokasi">
                    <h4 className="text-lg font-bold mb-6">Lokasi Kami</h4>
                    <div className="w-full h-48 rounded-2xl overflow-hidden bg-emerald-900 border border-emerald-800">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.0!2d109.6757!3d-6.8880!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTMnMTYuOCJTIDEwOcKwNDAnMzIuNSJF!5e0!3m2!1sid!2sid!4v1746000000000!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Kost SAFITRI Pekalongan"
                        />
                    </div>
                    <a
                        href="https://maps.app.goo.gl/DTRv8uyUk6pWfRYY6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                        <Navigation className="w-3 h-3" />
                        Lihat di Google Maps →
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-emerald-100/30">
                <p>© 2026 Kost SAFITRI. All rights reserved.</p>
                <p>Saphire Townhouse, Pekalongan</p>
            </div>
        </footer>
    );
};

export default Footer;
