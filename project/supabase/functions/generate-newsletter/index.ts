import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import OpenAI from 'https://esm.sh/openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Verify the user token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid token');
    }

    const { articles } = await req.json();
    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      throw new Error('Invalid or empty articles array');
    }

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    const prompt = `Generate a professional newsletter with the following sections:

Introduction:
- Write a brief, engaging introduction that sets the context for the newsletter
- Keep it concise and professional

Featured Story:
"${articles[0]?.title}"
${articles[0]?.description ? `Description: ${articles[0].description}` : ''}

Additional News Stories:
${articles.slice(1).map(a => `- ${a.title}${a.description ? `\n  ${a.description}` : ''}`).join('\n')}

Conclusion:
- Write a brief conclusion that ties the stories together
- Include a call to action or forward-looking statement

Requirements:
- Keep each article summary to 2-3 concise sentences
- Use a professional, engaging tone
- Focus on key points and relevance to readers
- Format the response with clear section breaks`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional newsletter writer who creates engaging and informative content. Your writing is clear, concise, and maintains reader interest.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = completion.choices[0].message?.content;
    if (!content) {
      throw new Error('No content generated');
    }

    // Extract sections
    const sections = content.split('\n\n');
    const intro = sections.find(s => s.toLowerCase().includes('introduction'))?.split('\n').slice(1).join('\n') || '';
    const outro = sections.find(s => s.toLowerCase().includes('conclusion'))?.split('\n').slice(1).join('\n') || '';

    // Format HTML content
    const htmlContent = `
      <div class="newsletter-content">
        <div class="introduction">
          ${intro}
        </div>
        
        <div class="featured-story">
          <h2>Featured Story</h2>
          ${sections.find(s => s.toLowerCase().includes('featured story'))?.split('\n').slice(1).join('\n') || ''}
        </div>
        
        <div class="additional-news">
          <h2>Additional News</h2>
          ${sections.find(s => s.toLowerCase().includes('additional news'))?.split('\n').slice(1).join('\n') || ''}
        </div>
        
        <div class="conclusion">
          ${outro}
        </div>
      </div>
    `;

    return new Response(
      JSON.stringify({
        intro,
        outro,
        htmlContent,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'An error occurred during newsletter generation',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});