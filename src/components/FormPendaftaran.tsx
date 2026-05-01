"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { jsPDF } from "jspdf";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    fullName: z.string().min(3, "Nama lengkap minimal 3 karakter"),
    nik: z.string().length(16, "NIK harus 16 digit"),
    whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid"),
    checkInDate: z.string().min(1, "Tanggal masuk harus diisi"),
    roomType: z.enum(["standard", "deluxe", "suite"]),
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [pendaftaranId, setPendaftaranId] = useState("");
    const [selectedKtp, setSelectedKtp] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roomType: "standard",
        },
    });

    const generatePDF = (data: FormValues) => {
        const doc = new jsPDF();
        const id = `REG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setPendaftaranId(id);

        // Kop Surat
        doc.setFontSize(22);
        doc.setTextColor(5, 150, 105);
        doc.text("KOST SAFITRI", 105, 20, { align: "center" });
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Kenyamanan Rumah, Fleksibilitas Modern", 105, 27, { align: "center" });
        doc.line(20, 32, 190, 32);

        // Detail Pendaftaran
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("BUKTI PENDAFTARAN PENGHUNI BARU", 105, 45, { align: "center" });

        doc.setFontSize(12);
        doc.text(`ID Pendaftaran: ${id}`, 20, 60);
        doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`, 20, 67);

        doc.text("IDENTITAS PENDAFTAR:", 20, 80);
        doc.line(20, 82, 70, 82);
        doc.text(`Nama Lengkap: ${data.fullName}`, 20, 92);
        doc.text(`Nomor NIK: ${data.nik}`, 20, 102);
        doc.text(`Nomor WhatsApp: ${data.whatsapp}`, 20, 112);
        doc.text(`Tipe Kamar: ${data.roomType.toUpperCase()}`, 20, 122);
        doc.text(`Rencana Masuk: ${data.checkInDate}`, 20, 132);

        // Pernyataan
        doc.setFontSize(10);
        doc.text("SURAT PERNYATAAN:", 20, 150);
        doc.rect(20, 154, 170, 30);
        const pernyataan = "Dengan ini saya menyatakan bahwa data yang saya berikan adalah benar dan saya bersedia mematuhi segala peraturan yang berlaku di Kost SAFITRI. Saya juga bersedia melakukan pembayaran uang muka (DP) sesuai ketentuan untuk mengamankan pesanan kamar saya.";
        doc.text(doc.splitTextToSize(pernyataan, 160), 25, 162);

        // Pembayaran
        doc.setFontSize(12);
        doc.text("INFORMASI PEMBAYARAN:", 20, 195);
        doc.text("Bank BCA: 123-456-7890", 20, 205);
        doc.text("Atas Nama: SAFITRI", 20, 212);

        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("*Silakan simpan bukti pendaftaran ini dan tunjukkan kepada admin saat konfirmasi.", 20, 230);

        doc.save(`Bukti_Pendaftaran_Kost_Safitri_${data.fullName}.pdf`);
    };

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        // Simulating API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            generatePDF(data);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-3xl font-bold text-emerald-950 mb-2">Pendaftaran Berhasil!</h3>
                <p className="text-emerald-900/60 mb-8">Data Anda telah kami terima. Bukti pendaftaran PDF telah diunduh secara otomatis.</p>
                <div className="flex gap-4">
                    <Button variant="premium" onClick={() => setIsSuccess(false)}>Selesai</Button>
                    <Button variant="outline" onClick={() => reset()}>Daftar Lagi</Button>
                </div>
            </div>
        );
    }

    return (
        <section id="daftar" className="py-24 max-w-4xl mx-auto px-6">
            <div className="bg-white dark:bg-emerald-900/20 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-emerald-100 dark:text-emerald-800 -z-0">
                    <Upload className="w-32 h-32 rotate-12" />
                </div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">Pendaftaran Penghuni</h2>
                    <p className="text-emerald-900/60 dark:text-emerald-100/60 mb-10">Lengkapi formulir di bawah ini untuk memulai proses pendaftaran hunian Anda.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-emerald-900">Nama Lengkap</label>
                                <input
                                    {...register("fullName")}
                                    className={cn("w-full h-12 px-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-950", errors.fullName && "border-red-500 bg-red-50")}
                                    placeholder="Contoh: Safitri Indah"
                                />
                                {errors.fullName && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-emerald-900">NIK (Sesuai KTP)</label>
                                <input
                                    {...register("nik")}
                                    maxLength={16}
                                    className={cn("w-full h-12 px-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-950", errors.nik && "border-red-500 bg-red-50")}
                                    placeholder="16 Digit Nomor Induk Kependudukan"
                                />
                                {errors.nik && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.nik.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-emerald-900">WhatsApp Aktif</label>
                                <input
                                    {...register("whatsapp")}
                                    className={cn("w-full h-12 px-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-950", errors.whatsapp && "border-red-500 bg-red-50")}
                                    placeholder="Contoh: 0857..."
                                />
                                {errors.whatsapp && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.whatsapp.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-emerald-900">Tipe Kamar</label>
                                <select
                                    {...register("roomType")}
                                    className="w-full h-12 px-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-950 bg-white"
                                >
                                    <option value="standard">Standard - Rp 1.5jt</option>
                                    <option value="deluxe">Deluxe - Rp 2.0jt</option>
                                    <option value="suite">Suite - Rp 2.5jt</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-emerald-900">Tanggal Rencana Masuk</label>
                                <input
                                    type="date"
                                    {...register("checkInDate")}
                                    className={cn("w-full h-12 px-4 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-950", errors.checkInDate && "border-red-500 bg-red-50")}
                                />
                                {errors.checkInDate && <p className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.checkInDate.message}</p>}
                            </div>

                            <div className="space-y-2 flex flex-col justify-end">
                                <label className="text-sm font-bold text-emerald-900 mb-2">Unggah Foto KTP</label>
                                <div
                                    className={cn(
                                        "relative border-2 border-dashed rounded-xl p-4 transition-all flex items-center justify-center gap-2 cursor-pointer",
                                        selectedKtp ? "border-emerald-500 bg-emerald-50" : "border-emerald-200 hover:bg-emerald-50"
                                    )}
                                    onClick={() => document.getElementById("ktp-upload")?.click()}
                                >
                                    <Upload className={cn("w-5 h-5", selectedKtp ? "text-emerald-600" : "text-emerald-300")} />
                                    <span className="text-sm font-medium text-emerald-700">
                                        {selectedKtp ? selectedKtp.name : "Pilih File JPG/PNG (Maks 2MB)"}
                                    </span>
                                    <input
                                        id="ktp-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setSelectedKtp(e.target.files?.[0] || null)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Button type="submit" variant="premium" className="w-full text-lg h-14 rounded-2xl gap-2" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>Memproses...</>
                                ) : (
                                    <>Submit & Download Bukti PDF <FileText className="w-5 h-5" /></>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;
