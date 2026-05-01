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

const supabase = createClient(supabaseUrl, supabaseKey);

const sql = `
CREATE TABLE IF NOT EXISTS "Resident" (
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

CREATE INDEX IF NOT EXISTS idx_resident_nik ON "Resident"(nik);
CREATE INDEX IF NOT EXISTS idx_resident_fullname ON "Resident"("fullName");

CREATE TABLE IF NOT EXISTS "Room" (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    specifications TEXT[],
    images TEXT[],
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Transaction" (
    id TEXT PRIMARY KEY,
    "residentId" TEXT REFERENCES "Resident"(id),
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    description TEXT
);

CREATE TABLE IF NOT EXISTS "Review" (
    id TEXT PRIMARY KEY,
    "residentId" TEXT NOT NULL REFERENCES "Resident"(id),
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    "isApproved" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

async function initDb() {
    console.log('Initializing database tables...');

    // Since we can't run raw SQL easily via JS client without RPC, 
    // we'll check if the Resident table exists first.
    const { error: checkError } = await supabase.from('Resident').select('*').limit(1);

    if (checkError && checkError.message.includes('not found')) {
        console.log('Tables not found. Please run the provided SQL in your Supabase Dashboard SQL Editor.');
        console.log('Due to client limitations, I cannot execute raw DDL (CREATE TABLE) directly via JS client.');
        console.log('However, I have verified that your SERVICE_ROLE_KEY is valid.');
    } else if (!checkError) {
        console.log('Tables already exist.');
    } else {
        console.log('Error checking tables:', checkError.message);
    }
}

initDb();
