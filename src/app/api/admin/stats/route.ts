import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
    try {
        const { count: totalResidents } = await supabase
            .from("Resident")
            .select("*", { count: "exact", head: true })
            .eq("status", "Active");

        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        const { data: transactions } = await supabase
            .from("Transaction")
            .select("type, amount")
            .gte("date", firstDay);

        const income = (transactions || [])
            .filter((t) => t.type === "Masuk")
            .reduce((acc, t) => acc + t.amount, 0);
        const expense = (transactions || [])
            .filter((t) => t.type === "Keluar")
            .reduce((acc, t) => acc + t.amount, 0);

        const { data: recentResidents } = await supabase
            .from("Resident")
            .select("*")
            .order("createdAt", { ascending: false })
            .limit(3);

        return NextResponse.json({
            totalResidents: totalResidents || 0,
            income,
            expense,
            recentResidents: recentResidents || [],
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
