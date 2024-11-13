import { Anthropic } from '@anthropic-ai/sdk';
import type { NewsletterArticle } from '../types/newsletter';

const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

if (!CLAUDE_API_KEY) {
  throw new Error('Missing Claude API key');
}

const anthropic = new Anthropic({
  apiKey: CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateNewsletterContent(articles: NewsletterArticle[]) {
  try {
    if (!articles || articles.length === 0) {
      throw new Error('No articles provided for generation');
    }

    console.log('Generating newsletter content for articles:', articles);

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
- Focus on key points and relevance to readers`;

    console.log('Sending prompt to Claude:', prompt);

    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1500,
      temperature: 0.7,
      system: "You are a professional newsletter writer who creates engaging and informative content. Your writing is clear, concise, and maintains reader interest.",
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    console.log('Received response from Claude:', response);

    if (!response.content || response.content.length === 0 || !response.content[0].text) {
      throw new Error('No content generated from Claude API');
    }

    const content = response.content[0].text;

    // Split content into sections
    const sections = content.split('\n\n');
    const intro = sections.find(s => s.toLowerCase().includes('introduction'))?.split('\n').slice(1).join('\n') || '';
    const featured = sections.find(s => s.toLowerCase().includes('featured story'))?.split('\n').slice(1).join('\n') || '';
    const news = sections.find(s => s.toLowerCase().includes('additional news'))?.split('\n').slice(1).join('\n') || '';
    const outro = sections.find(s => s.toLowerCase().includes('conclusion'))?.split('\n').slice(1).join('\n') || '';

    // Format HTML content with proper styling
    const htmlContent = `
      <div class="newsletter-content space-y-8">
        <div class="introduction prose">
          <h2 class="text-2xl font-bold mb-4">Introduction</h2>
          <div class="text-gray-700">${intro}</div>
        </div>
        
        <div class="featured-story prose">
          <h2 class="text-2xl font-bold mb-4">Featured Story</h2>
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-2">${articles[0]?.title}</h3>
            <div class="text-gray-700">${featured}</div>
          </div>
        </div>
        
        <div class="additional-news prose">
          <h2 class="text-2xl font-bold mb-4">News You Can't Miss</h2>
          <div class="space-y-6">
            ${articles.slice(1).map((article, index) => `
              <div class="bg-gray-50 p-6 rounded-lg">
                <h3 class="text-xl font-semibold mb-2">${article.title}</h3>
                <div class="text-gray-700">${news.split('\n')[index] || ''}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="conclusion prose">
          <h2 class="text-2xl font-bold mb-4">Conclusion</h2>
          <div class="text-gray-700">${outro}</div>
        </div>
      </div>
    `;

    const result = {
      intro,
      featured_story: articles[0],
      news: articles.slice(1),
      outro,
      htmlContent,
    };

    console.log('Generated newsletter content:', result);
    return result;
  } catch (error) {
    console.error('Error generating newsletter content:', error);
    const errorMessage = error instanceof Error 
      ? `Failed to generate newsletter content: ${error.message}`
      : 'Failed to generate newsletter content';
    throw new Error(errorMessage);
  }
}