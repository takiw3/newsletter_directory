export interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  content: string | null;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_url: string;
  source_name?: string;
  creator: string[] | null;
  category: string[];
  country: string[];
  language: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage: string | null;
  message?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  category: string[];
  language: string;
  country: string[];
}

export interface NewsSourcesResponse {
  status: string;
  totalResults: number;
  results: NewsSource[];
  message?: string;
}

export interface NewsFilters {
  country?: string;
  category?: string;
  q?: string;
  language?: string;
  page?: string;
  source?: string;
}

export const NEWS_CATEGORIES = [
  'business',
  'entertainment',
  'environment',
  'food',
  'health',
  'politics',
  'science',
  'sports',
  'technology',
  'top',
  'world',
] as const;

export const COUNTRIES = [
  { code: 'us', name: 'United States' },
  { code: 'gb', name: 'United Kingdom' },
  { code: 'ca', name: 'Canada' },
  { code: 'au', name: 'Australia' },
  { code: 'in', name: 'India' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'ru', name: 'Russia' },
  { code: 'ua', name: 'Ukraine' },
] as const;