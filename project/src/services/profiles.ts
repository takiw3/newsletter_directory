import { supabase, type Profile } from '../lib/supabase';

export async function saveUserProfile(profileData: Omit<Profile, 'created_at'>): Promise<{ success: boolean; error?: string }> {
  try {
    if (!profileData.id || !profileData.email) {
      throw new Error('Missing required user data');
    }

    // First check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', profileData.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw fetchError;
    }

    const profileUpdate = {
      id: profileData.id,
      email: profileData.email,
      name: profileData.name || '',
      topics: Array.isArray(profileData.topics) ? profileData.topics : [],
      newsletter_name: profileData.newsletter_name || '',
      newsletter_pitch: profileData.newsletter_pitch || '',
      tone: profileData.tone || '',
      language: profileData.language || '',
      target_audience: profileData.target_audience || '',
      updated_at: new Date().toISOString(),
    };

    let result;
    
    if (existingProfile) {
      // Update existing profile
      result = await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', profileData.id)
        .select()
        .single();
    } else {
      // Insert new profile
      result = await supabase
        .from('profiles')
        .insert({
          ...profileUpdate,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
    }

    if (result.error) {
      console.error('Supabase operation error:', result.error);
      throw new Error(result.error.message);
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving profile:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}