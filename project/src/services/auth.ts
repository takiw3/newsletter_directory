import { supabase } from '../lib/supabase';

export async function signUpWithEmail(email: string, password: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;

    // Create initial profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error during sign up:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'An error occurred during sign up'
    };
  }
}