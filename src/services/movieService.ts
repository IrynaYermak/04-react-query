import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMovieProps {
  query: string;
  page: number;
}

interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
}

const myToken = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = 'https://api.themoviedb.org/3/search';

export async function fetchMovies({
  query,
  page,
}: FetchMovieProps): Promise<MovieHttpResponse> {
  const options = {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en - US',
    },
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  };

  const response = await axios
    .get<MovieHttpResponse>('/movie', options)
    .then(response => response.data);

  //   console.log(query);
  //   console.log(response);

  return response;
}
