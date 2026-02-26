import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://zzamwulthzpjzsmlzilp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YW13dWx0aHpwanpzbWx6aWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTcxMTQsImV4cCI6MjA4NzU3MzExNH0.VnXOG39NcEWH2svJA1G_gDly2SO9KRHQ2cd9a4FJ8UQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
