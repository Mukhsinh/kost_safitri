const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
    envFile.split('\n')
        .filter(l => l.includes('='))
        .map(l => {
            const parts = l.split('=');
            return [parts[0].trim(), parts.slice(1).join('=').trim()];
        })
);

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

console.log('--- Supabase Connection Test ---');
console.log('Project URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    // Test 1: Simple Select
    const { data: resData, error: resError } = await supabase.from('Resident').select('*').limit(1);

    if (resError) {
        if (resError.message.includes('not found')) {
            console.log('❌ Error: Table "Resident" NOT FOUND.');
            console.log('Ini kemungkinan karena database masih kosong (belum ada tabel).');
        } else {
            console.log('❌ Error Connection:', resError.message);
        }
    } else {
        console.log('✅ Success: Successfully connected to "Resident" table.');
    }

    // Test 2: List Tables (Generic approach via internal query if possible)
    // Note: Standard JS client doesn't have listTables, but we can check if it returns anything for public.
    console.log('\n--- Recommendation ---');
    console.log('Please run the following SQL in your Supabase SQL Editor to initialize the database:');
    console.log(`
CREATE TABLE "Resident" (
    id TEXT PRIMARY KEY,
    nik TEXT UNIQUE NOT NULL,
    "fullName" TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "checkInDate" TIMESTAMP WITH TIME ZONE NOT NULL,
    "ktpUrl" TEXT,
    status TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_resident_nik ON "Resident"(nik);
CREATE INDEX idx_resident_fullname ON "Resident"("fullName");

CREATE TABLE "Room" (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    specifications TEXT[],
    images TEXT[],
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Transaction" (
    id TEXT PRIMARY KEY,
    "residentId" TEXT REFERENCES "Resident"(id),
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description TEXT
);

CREATE TABLE "Review" (
    id TEXT PRIMARY KEY,
    "residentId" TEXT NOT NULL REFERENCES "Resident"(id),
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    "isApproved" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
  `);
}

verify();
