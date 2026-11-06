import { createClient } from '@supabase/supabase-js';

let cachedClient = null;
let cachedClientUrl = '';
let cachedClientKey = '';

export function isUnsafeSupabaseKey(key) {
  if (key.startsWith('sb_secret_')) return true;
  const parts = key.split('.');
  if (parts.length !== 3) return false;

  try {
    const encodedPayload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(encodedPayload.padEnd(Math.ceil(encodedPayload.length / 4) * 4, '=')));
    return payload.role === 'service_role';
  } catch {
    return false;
  }
}

// Get config from localStorage or Vite environment variables
export function getSupabaseConfig() {
  const storedUrl = localStorage.getItem('artisan_supabase_url');
  const savedKey = localStorage.getItem('artisan_supabase_key') || '';

  const url = storedUrl || import.meta.env.VITE_SUPABASE_URL || '';
  const candidateKey = savedKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const key = isUnsafeSupabaseKey(candidateKey) ? '' : candidateKey;

  return { url, key, isConfigured: Boolean(url && key) };
}

export function saveSupabaseConfig(url, key) {
  if (url) localStorage.setItem('artisan_supabase_url', url.trim());
  if (key) localStorage.setItem('artisan_supabase_key', key.trim());
}

export function clearSupabaseConfig() {
  localStorage.removeItem('artisan_supabase_url');
  localStorage.removeItem('artisan_supabase_key');
}

export function getSupabaseClient() {
  const { url, key, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;
  if (cachedClient && cachedClientUrl === url && cachedClientKey === key) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, key);
    cachedClientUrl = url;
    cachedClientKey = key;
    return cachedClient;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

export async function signInWithPassword(email, password) {
  const client = getSupabaseClient();
  if (!client) return { data: null, error: 'Connect Supabase before signing in.' };
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  return { data, error: error?.message || null };
}

export async function signUpWithPassword(email, password) {
  const client = getSupabaseClient();
  if (!client) return { data: null, error: 'Connect Supabase before creating an account.' };
  const { data, error } = await client.auth.signUp({ email, password });
  return { data, error: error?.message || null };
}

export async function signOut() {
  const client = getSupabaseClient();
  if (!client) return { error: 'Connect Supabase before signing out.' };
  const { error } = await client.auth.signOut();
  return { error: error?.message || null };
}

// Test connection to Supabase
export async function testConnection(url, key) {
  try {
    const response = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/artisans?select=id&limit=1`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: 'application/json'
      }
    });
    const responseText = await response.text();
    let responseBody = null;
    try {
      responseBody = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseBody = null;
    }

    if (!response.ok) {
      if (responseBody?.code === 'PGRST205' || responseBody?.code === '42P01') {
        return { success: true, message: 'Connected to Supabase! (Note: Create the "artisans" table if not created yet)' };
      }
      return {
        success: false,
        message: responseBody?.message || `Supabase returned HTTP ${response.status}.`
      };
    }
    return { success: true, message: 'Connection successful!' };
  } catch (err) {
    return { success: false, message: err instanceof Error ? err.message : 'Connection failed' };
  }
}

// Map database row to standard artisan object (handles 'loan amount' vs 'loan_amount')
function formatArtisanRow(row) {
  if (!row) return null;
  const loanVal = row.loan_amount ?? row['loan amount'];
  const parsedLoanAmount = Number(loanVal);
  const parsedRaisedAmount = Number(row.amount_raised);

  return {
    ...row,
    loan_amount: Number.isFinite(parsedLoanAmount) && parsedLoanAmount > 0 ? parsedLoanAmount : 0,
    amount_raised: Number.isFinite(parsedRaisedAmount) && parsedRaisedAmount > 0 ? parsedRaisedAmount : 0,
    photo_url: row.photo_url || '',
  };
}

// Fetch all artisans from Supabase
export async function fetchArtisans() {
  const client = getSupabaseClient();
  if (!client) return { data: null, error: 'Supabase client not configured' };

  try {
    const { data, error } = await client
      .from('artisans')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    const formatted = (data || []).map(formatArtisanRow);
    return { data: formatted, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

// Insert new artisan into Supabase
export async function insertArtisan(artisan) {
  const client = getSupabaseClient();
  if (!client) return { data: null, error: 'Supabase client not configured' };

  try {
    // Send both variants to handle either column schema
    const payload = {
      name: artisan.name,
      craft: artisan.craft,
      village: artisan.village,
      'loan amount': Number(artisan.loan_amount),
      loan_amount: Number(artisan.loan_amount),
      story: artisan.story,
      photo_url: artisan.photo_url
    };

    const { data, error } = await client
      .from('artisans')
      .insert([payload])
      .select();

    if (error) {
      const missingAmountColumn = error.code === '42703' || error.code === 'PGRST204';
      const missingCanonicalColumn = error.message?.includes('loan_amount');
      const missingLegacyColumn = error.message?.includes('loan amount');
      if (!missingAmountColumn || (!missingCanonicalColumn && !missingLegacyColumn)) throw error;

      const fallbackPayload = {
        name: artisan.name,
        craft: artisan.craft,
        village: artisan.village,
        [missingCanonicalColumn ? 'loan amount' : 'loan_amount']: Number(artisan.loan_amount),
        story: artisan.story,
        photo_url: artisan.photo_url
      };
      const fallback = await client.from('artisans').insert([fallbackPayload]).select();
      if (fallback.error) throw fallback.error;
      if (!fallback.data?.[0]) throw new Error('Profile saved, but the database did not return the new profile.');
      return { data: formatArtisanRow(fallback.data[0]), error: null };
    }
    if (!data?.[0]) return { data: null, error: 'Profile was not returned by the database. Check table permissions.' };
    return { data: formatArtisanRow(data?.[0] || artisan), error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err.message : String(err) };
  }
}

// Update the displayed funding total for an artisan.
export async function contributeToArtisan(artisanId, currentRaised, contributionAmount) {
  const client = getSupabaseClient();
  const newRaised = Number(currentRaised || 0) + Number(contributionAmount);

  if (!client) {
    return { success: true, newRaised };
  }

  try {
    const { data, error } = await client
      .from('artisans')
      .update({ amount_raised: newRaised })
      .eq('id', artisanId)
      .select('id')
      .maybeSingle();

    if (error) {
      return { success: false, error: error.message, newRaised };
    }
    if (!data) {
      return { success: false, error: 'No profile was updated. Check that the profile exists and your database permissions allow updates.', newRaised };
    }

    return { success: true, newRaised };
  } catch (err) {
    return { success: false, error: err.message, newRaised };
  }
}
