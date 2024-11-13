import { NewsArticle, NewsResponse, NewsFilters, NewsSource, NewsSourcesResponse } from '../types/news';

const API_KEY = 'pub_590840da3b38cd9d5d1984d5ce6440f9a1306';
const BASE_URL = 'https://newsdata.io/api/1';

export async function fetchNews(filters: NewsFilters): Promise<NewsArticle[]> {
  try {
    // Fetch latest news with category filters
    const latestParams = new URLSearchParams({
      apikey: API_KEY,
      ...filters,
    });

    const latestResponse = await fetch(`${BASE_URL}/latest?${latestParams}`);
    const latestData: NewsResponse = await latestResponse.json();

    if (latestData.status !== 'success') {
      throw new Error(latestData.message || 'Failed to fetch latest news');
    }

    // Add source_name if not present for latest articles
    const latestArticles = latestData.results.map(article => ({
      ...article,
      source_name: article.source_name || article.source_id,
    }));

    // If country filter is applied, fetch country-specific sources and their news
    let countryArticles: NewsArticle[] = [];
    if (filters.country) {
      const sourcesParams = new URLSearchParams({
        apikey: API_KEY,
        country: filters.country,
      });

      const sourcesResponse = await fetch(`${BASE_URL}/sources?${sourcesParams}`);
      const sourcesData: NewsSourcesResponse = await sourcesResponse.json();

      if (sourcesData.status === 'success' && sourcesData.results.length > 0) {
        // Get news from the first 5 sources to avoid rate limiting
        const sourceIds = sourcesData.results.slice(0, 5).map(source => source.id);
        
        // Fetch news for each source
        const sourceArticlesPromises = sourceIds.map(async (sourceId) => {
          const sourceParams = new URLSearchParams({
            apikey: API_KEY,
            source: sourceId,
            ...filters,
          });

          try {
            const response = await fetch(`${BASE_URL}/latest?${sourceParams}`);
            const data: NewsResponse = await response.json();
            return data.status === 'success' ? data.results : [];
          } catch (error) {
            console.error(`Error fetching news for source ${sourceId}:`, error);
            return [];
          }
        });

        const sourceArticlesArrays = await Promise.all(sourceArticlesPromises);
        countryArticles = sourceArticlesArrays.flat().map(article => ({
          ...article,
          source_name: article.source_name || article.source_id,
        }));
      }
    }

    // Combine and deduplicate articles
    const allArticles = [...latestArticles, ...countryArticles];
    const uniqueArticles = Array.from(
      new Map(allArticles.map(article => [article.article_id, article])).values()
    );

    // Sort by date, most recent first
    return uniqueArticles.sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export async function fetchNewsSources(country?: string): Promise<NewsSource[]> {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      ...(country && { country }),
    });

    const response = await fetch(`${BASE_URL}/sources?${params}`);
    const data: NewsSourcesResponse = await response.json();

    if (data.status !== 'success') {
      throw new Error(data.message || 'Failed to fetch news sources');
    }

    return data.results;
  } catch (error) {
    console.error('Error fetching news sources:', error);
    throw error;
  }
}