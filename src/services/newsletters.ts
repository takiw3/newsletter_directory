import { supabase } from '../lib/supabase';
import type { Newsletter, NewsletterContent } from '../types/newsletter';

export async function createNewsletter(userId: string, name: string): Promise<Newsletter> {
  try {
    const { data, error } = await supabase
      .from('newsletters')
      .insert([
        {
          user_id: userId,
          name,
          status: 'draft',
          content: {
            intro: null,
            featured_story: null,
            news: [],
            outro: null,
          },
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to create newsletter: ${error.message}`);
    }
    if (!data) throw new Error('No data returned from insert');
    
    return data;
  } catch (error) {
    console.error('Error creating newsletter:', error);
    throw error;
  }
}

export async function updateNewsletter(
  id: string,
  updates: Partial<Pick<Newsletter, 'name' | 'status' | 'content'>>
): Promise<Newsletter> {
  try {
    // Validate the newsletter exists first
    const { data: existing, error: checkError } = await supabase
      .from('newsletters')
      .select('id')
      .eq('id', id)
      .single();

    if (checkError) {
      console.error('Check error:', checkError);
      throw new Error(`Newsletter not found: ${checkError.message}`);
    }

    const { data, error } = await supabase
      .from('newsletters')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      throw new Error(`Failed to update newsletter: ${error.message}`);
    }
    if (!data) throw new Error('Newsletter not found');
    
    return data;
  } catch (error) {
    console.error('Error updating newsletter:', error);
    throw error;
  }
}

export async function updateNewsletterContent(
  id: string,
  content: NewsletterContent
): Promise<Newsletter> {
  try {
    // Validate content structure
    if (!content || typeof content !== 'object') {
      throw new Error('Invalid content structure');
    }

    const { data, error } = await supabase
      .from('newsletters')
      .update({
        content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Content update error:', error);
      throw new Error(`Failed to update newsletter content: ${error.message}`);
    }
    if (!data) throw new Error('Newsletter not found');

    return data;
  } catch (error) {
    console.error('Error updating newsletter content:', error);
    throw error;
  }
}

export async function deleteNewsletter(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('newsletters')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      throw new Error(`Failed to delete newsletter: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    throw error;
  }
}

export async function fetchNewsletters(userId: string): Promise<Newsletter[]> {
  try {
    const { data, error } = await supabase
      .from('newsletters')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
      throw new Error(`Failed to fetch newsletters: ${error.message}`);
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    throw error;
  }
}