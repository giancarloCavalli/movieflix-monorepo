import { AxiosRequestConfig } from "axios";
import MovieCard from "components/MovieCard";
import { useEffect, useState } from "react";
import { Movie } from "types/movie";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "utils/requests";
import "./styles.css";

const MovieList = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/movies",
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="movie-list-container">
      <h2>Listagem de filmes</h2>

      <div className="movie-list-list col-2-sm col-4-xl">
        {page?.content.map((movie) => (
          <div className="movie-list-item base-card">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
