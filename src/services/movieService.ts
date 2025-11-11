import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMovieProps {
    query: string,
    page:number
}

interface MovieHttpResponse {
    results: Movie[],
    total_pages: number,
    total_results:number

}

const myToken = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = 'https://api.themoviedb.org/3/search';


export async function fetchMovies({ query, page }: FetchMovieProps): Promise<Movie[]> {
    const options = {
    params: {
        query,
        include_adult: false,
        page,
  },
  headers: {
    Authorization: `Bearer ${myToken}`,
  }
}
    const response = await axios.get<MovieHttpResponse>('/movie', options).then(response=> response.data)
    return response.results
}
