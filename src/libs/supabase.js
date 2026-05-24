import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ghrxemhiohdosmzebgaj.supabase.co';
const supabaseAnonKey = 'sb_publishable_Kv2h9z8eUpAv9rMfzA6xOg_PMpxI-TV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
