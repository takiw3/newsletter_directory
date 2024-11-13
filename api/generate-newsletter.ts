import OpenAI from 'openai';
import type { NewsletterArticle } from '../src/types/newsletter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.proxyapi.io/openai/v1',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { articles } = req.body as { articles: NewsletterArticle[] };

    const prompt = `Generate a newsletter with the following sections:
1. Introduction
2. Featured Story Summary: "${articles[0]?.title}"
3. News Summaries for the following articles:
${articles.slice(1).map(a => `- ${a.title}`).join('\n')}
4. Conclusion

Make the content engaging and professional. Each article summary should be 2-3 sentences.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional newsletter writer who creates engaging and informative content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    const sections = content.split('\n\n');

    return res.status(200).json({
      intro: sections[0],
      outro: sections[sections.length - 1],
    });
  } catch (error) {
    console.error('Error generating newsletter:', error);
    return res.status(500).json({ error: 'Failed to generate newsletter content' });
  }
}