const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function fixAdminUser() {
    console.log('Fixing admin user password...');

    const envPath = path.join(process.cwd(), '.env.local');
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

    const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    // 1. Get the user ID
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error('Error listing users:', listError.message);
        return;
    }

    const adminUser = users.find(u => u.email === 'sarahsafitri33@gmail.com');

    if (!adminUser) {
        console.log('User not found. Creating user...');
        const { data, error } = await supabase.auth.admin.createUser({
            email: 'sarahsafitri33@gmail.com',
            password: 'Pekalongan33.',
            email_confirm: true
        });
        if (error) console.error('Error creating user:', error.message);
        else console.log('User created successfully.');
    } else {
        console.log('User found. Updating password...');
        const { data, error } = await supabase.auth.admin.updateUserById(
            adminUser.id,
            { password: 'Pekalongan33.', email_confirm: true }
        );

        if (error) {
            console.error('Error updating user:', error.message);
        } else {
            console.log('Password updated successfully for user ID:', adminUser.id);
        }
    }
}

fixAdminUser();
