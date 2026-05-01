"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Beranda", href: "#" },
        { name: "Fasilitas", href: "#fasilitas" },
        { name: "Kamar", href: "#kamar" },
        { name: "Testimoni", href: "#testimoni" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled
                    ? "bg-white/80 dark:bg-emerald-950/80 backdrop-blur-md shadow-md py-3"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/30">
                        <Home className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-50">
                        Kost <span className="text-emerald-600">SAFITRI</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-emerald-900/70 hover:text-emerald-600 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="premium" size="sm" asChild>
                        <Link href="#daftar">Daftar Penghuni</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-emerald-900 dark:text-emerald-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-emerald-950 shadow-xl border-t border-emerald-100 dark:border-emerald-900 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-lg font-medium text-emerald-900/70 hover:text-emerald-600 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="premium" className="w-full mt-2" onClick={() => setIsMobileMenuOpen(false)} asChild>
                        <Link href="#daftar">Daftar Penghuni</Link>
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
