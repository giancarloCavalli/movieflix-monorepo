import { AxiosRequestConfig } from "axios";
import MovieCard from "components/MovieCard";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "types/movie";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "utils/requests";
import MovieFilter from "components/MovieFilter";
import Pagination from "components/Pagination";
import { Genre } from "types/genre";

import "./styles.css";

type ComponentsControl = {
  activePage: number,
  genreFilter: Genre | null
};

const MovieList = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [componentsControl, setComponentsControl] = useState<ComponentsControl>({ activePage: 0, genreFilter: null});

  const handlePageChange = (pageNumber: number) => {
    setComponentsControl({activePage: pageNumber, genreFilter: componentsControl.genreFilter});
  }

  const handleGenreChange = (genre: Genre) => {
    setComponentsControl({activePage: 0, genreFilter: genre});
  }

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/movies",
      withCredentials: true,
      params: {
        page: componentsControl.activePage,
        size: 8,
        genreId: componentsControl.genreFilter?.id
      },
    };
  
    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [componentsControl]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="movie-list-container">
      <MovieFilter onChange={handleGenreChange} />
      <div className="movie-list-list movie-list-grid">
        {page?.content.map((movie) => (
          <div className="movie-list-item base-card" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={2}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default MovieList;
