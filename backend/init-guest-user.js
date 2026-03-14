require('dotenv').config();
const { supabaseAdmin } = require('./src/config/supabase');

async function initGuestUser() {
  try {
    console.log('Creating guest user with service role...');
    
    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert([{
        id: '00000000-0000-0000-0000-000000000001',
        phone: '0000000000',
        full_name: 'Guest User',
        email: 'guest@urbannn.app',
      }], { onConflict: 'id', ignoreDuplicates: true })
      .select();

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('✅ Guest user created!');

    const { data: address, error: addressError } = await supabaseAdmin
      .from('user_addresses')
      .upsert([{
        user_id: '00000000-0000-0000-0000-000000000001',
        address_type: 'home',
        address_line1: 'Guest Address',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        is_default: true,
      }])
      .select();

    if (addressError) {
      console.error('Address error:', addressError);
      return;
    }

    console.log('✅ Guest address created!');
    console.log('✅ Initialization complete!');
  } catch (error) {
    console.error('Init error:', error);
  }
}

initGuestUser();
