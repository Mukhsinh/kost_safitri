"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- Dashboard Stats ---
export async function getDashboardStats() {
    const { count: totalResidents } = await supabase
        .from('Resident')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Active');

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const { data: transactions } = await supabase
        .from('Transaction')
        .select('type, amount')
        .gte('date', firstDay);

    const income = (transactions || []).filter(t => t.type === "Masuk").reduce((acc, t) => acc + t.amount, 0);
    const expense = (transactions || []).filter(t => t.type === "Keluar").reduce((acc, t) => acc + t.amount, 0);

    const { data: recentResidents } = await supabase
        .from('Resident')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(3);

    return {
        totalResidents: totalResidents || 0,
        income,
        expense,
        recentResidents: recentResidents || []
    };
}

// --- Residents Management ---
export async function getResidents() {
    const { data } = await supabase
        .from('Resident')
        .select('*')
        .order('createdAt', { ascending: false });
    return data || [];
}

export async function addResident(data: {
    nik: string;
    fullName: string;
    whatsapp: string;
    roomType: string;
    checkInDate: string;
}) {
    const { data: res, error } = await supabase.from('Resident').insert({
        nik: data.nik,
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        roomType: data.roomType,
        checkInDate: new Date(data.checkInDate).toISOString(),
        status: "Active",
    }).select().single();

    if (error) throw error;
    revalidatePath("/admin/residents");
    revalidatePath("/admin");
    return res;
}

export async function updateResidentStatus(id: string, status: string) {
    const { data: res, error } = await supabase.from('Resident').update({ status }).eq('id', id);
    if (error) throw error;
    revalidatePath("/admin/residents");
    return res;
}

// --- Transactions Management ---
export async function getTransactions() {
    const { data } = await supabase
        .from('Transaction')
        .select('*, resident:Resident(*)')
        .order('date', { ascending: false });
    return data || [];
}

export async function addTransaction(data: {
    type: string;
    category: string;
    amount: number;
    description?: string;
    residentId?: string;
    date?: string;
}) {
    const { data: res, error } = await supabase.from('Transaction').insert({
        type: data.type,
        category: data.category,
        amount: data.amount,
        description: data.description || "",
        residentId: data.residentId || null,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString()
    }).select().single();

    if (error) throw error;
    revalidatePath("/admin/finance");
    revalidatePath("/admin");
    return res;
}

// --- Reviews Management ---
export async function getReviews() {
    const { data } = await supabase
        .from('Review')
        .select('*, resident:Resident(*)')
        .order('createdAt', { ascending: false });
    return data || [];
}

export async function updateReviewStatus(id: string, isApproved: boolean) {
    const { data: res, error } = await supabase.from('Review').update({ isApproved }).eq('id', id);
    if (error) throw error;
    revalidatePath("/admin/reviews");
    return res;
}
