require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createGuestUser() {
  try {
    console.log('Creating guest user in auth.users...');
    
    const guestEmail = 'guest@urbannn.app';
    const guestPhone = '0000000000';
    const guestPassword = 'guest123456'; // Temporary password
    
    // First, create auth user with email only
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: guestEmail,
      password: guestPassword,
      email_confirm: true,
      user_metadata: {
        full_name: 'Guest User',
        phone: guestPhone,
      },
    });

    if (authError && !authError.message.includes('already registered')) {
      console.error('Error creating auth user:', authError);
      throw authError;
    }

    const userId = authData?.user?.id;
    console.log('✅ Auth user created/exists:', userId);

    if (!userId) {
      // Try to get existing user
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
      const existingUser = users?.find(u => u.email === guestEmail);
      if (existingUser) {
        console.log('Using existing user:', existingUser.id);
        // Create profile for existing user
        const { error: profileError } = await supabase
          .from('users')
          .upsert([{
            id: existingUser.id,
            phone: guestPhone,
            full_name: 'Guest User',
            email: guestEmail,
          }], { onConflict: 'id' });
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
        } else {
          console.log('✅ Guest user profile created!');
        }
        process.exit(0);
        return;
      }
      throw new Error('Could not create or find user');
    }

    // Then create user profile
    const { data, error } = await supabase
      .from('users')
      .upsert([
        {
          id: userId,
          phone: guestPhone,
          full_name: 'Guest User',
          email: guestEmail,
        }
      ], { onConflict: 'id' })
      .select();

    if (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }

    console.log('✅ Guest user profile created successfully!');
    console.log('User ID:', userId);
    
    process.exit(0);
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

createGuestUser();
