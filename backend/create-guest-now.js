require('dotenv').config();
const { supabaseAdmin } = require('./src/config/supabase');

async function createGuest() {
  console.log('Creating guest user...');
  
  try {
    // Create user
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        phone: '0000000000',
        full_name: 'Guest User',
        email: 'guest@urbannn.app'
      }, {
        onConflict: 'id'
      })
      .select()
      .single();

    if (userError) {
      console.error('User error:', userError);
    } else {
      console.log('✅ User created:', user);
    }

    // Create address
    const { data: address, error: addressError } = await supabaseAdmin
      .from('user_addresses')
      .upsert({
        user_id: '00000000-0000-0000-0000-000000000001',
        address_type: 'home',
        address_line1: 'Guest Address',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        is_default: true
      })
      .select()
      .single();

    if (addressError) {
      console.error('Address error:', addressError);
    } else {
      console.log('✅ Address created:', address);
    }

    console.log('\n✅ Guest user setup complete!');
    console.log('You can now test bookings in the app.');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

createGuest();
