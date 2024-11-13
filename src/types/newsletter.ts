export interface NewsletterContent {
  intro: string | null;
  featured_story: NewsletterArticle | null;
  news: NewsletterArticle[];
  outro: string | null;
  htmlContent?: string;
}

export interface NewsletterArticle {
  article_id: string;
  title: string;
  description: string | null;
  link: string;
  image_url: string | null;
  source_name: string;
  pubDate: string;
}

export interface Newsletter {
  id: string;
  user_id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'published';
  content: NewsletterContent;
  created_at: string;
  updated_at: string;
}