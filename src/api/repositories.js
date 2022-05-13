import axios from 'axios';
import moment from 'moment';

const API_URL = `https://api.github.com/search/repositories`;

export const fetch = async (limit) => {
  const now = moment().add(-1, 'week').format('yyyy-MM-DD');
  // Probable optimization:
  // Keep per_page sze the same and investigate
  // option of adding an offset
  try {
    const result = await axios.get(API_URL, {
      params: {
        q: `created:>${now}`,
        sort: 'stars',
        order: 'desc',
        per_page: limit,
      }
    });
    // Even with sorting given in query parameters,
    // it doesnt seem to be correct, so manual sorting is done as well.
    return result
      .data
      .items
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch (err) {
    throw new Error('Failed to fetch repositories');
  }
}