const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Simple parser for .env.local
function loadEnv() {
    const content = fs.readFileSync('.env.local', 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            env[key.trim()] = valueParts.join('=').trim();
        }
    });
    return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function checkAndFixUser() {
    const email = 'sarahsafitri33@gmail.com';
    const password = 'Pekalongan33';

    console.log(`Checking user: ${email}...`);

    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error('Error listing users:', listError);
        return;
    }

    let user = users.find(u => u.email === email);

    if (!user) {
        console.log('User not found. Creating user...');
        const { data: { user: newUser }, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (createError) {
            console.error('Error creating user:', createError);
            return;
        }
        user = newUser;
        console.log('User created and confirmed.');
    } else {
        console.log('User found:', user.id);

        // Always reset password and confirm to be safe
        console.log('Updating password and confirming user...');
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            user.id,
            {
                password,
                email_confirm: true
            }
        );

        if (updateError) {
            console.error('Error updating user:', updateError);
        } else {
            console.log('User password updated and email confirmed.');
        }
    }

    // Verify if it works by signing in (not admin)
    console.log('Verifying login with signInWithPassword...');
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (loginError) {
        console.error('Login verification FAILED:', loginError.message);
    } else {
        console.log('Login verification SUCCESSFUL!');
        console.log('Session user ID:', data.user.id);
    }
}

checkAndFixUser();
