import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../services/movieService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import ReactPaginate from 'react-paginate';

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ['movie', query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query !== '',
    placeholderData: keepPreviousData,
    staleTime: 6 * 1000,
  });

  useEffect(() => {
    if (data?.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data?.results]);

  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (searchQuery: string) => {
    // if (searchQuery !== query) {
    setQuery(searchQuery);
    setPage(1);
    // }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {isSuccess && data.results.length > 0 && (
        <MovieGrid onSelect={handleSelect} movies={data.results} />
      )}
      {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
      <Toaster />
    </>
  );
}

export default App;
