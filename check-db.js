const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mjznvuqvyylxhglohpws.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qem52dXF2eXlseGhnbG9ocHdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzYxOTkyMCwiZXhwIjoyMDkzMTk1OTIwfQ.PznG-4WiyJbIBJOcpmkLhJ2rXyLoPRC2MMQtjEdGmKE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data, error } = await supabase.from('Resident').select('id').limit(1);
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Success, table Resident exists. Data:', data);
    }
}
check();
