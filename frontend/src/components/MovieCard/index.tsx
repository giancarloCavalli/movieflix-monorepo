import { Movie } from "types/movie";
import "./styles.css";

type Props = {
  movie: Movie;
  showSynopsis?: boolean;
};

const MovieCard = ({ movie, showSynopsis }: Props) => {
  return (
    <div className="movie-card-container">
      <div className="movie-card-img-container">
        <img src={movie.imgUrl} alt="Movie" />
      </div>

      <div className="movie-card-info-container">
        <h3>{movie.title}</h3>
        <h4 className="movie-card-year-container">{movie.year}</h4>
        <div className="movie-card-subtitle-container">{movie.subTitle}</div>
        {showSynopsis ? <div className="movie-card-synopsis-container">{movie.synopsis}</div> : ''}
      </div>
    </div>
  );
};

export default MovieCard;
