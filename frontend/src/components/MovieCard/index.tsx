import { Movie } from "types/movie";
import "./styles.css";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="movie-card-container">
      <div className="movie-card-img-container">
        <img src={movie.imgUrl} alt="Movie" />
      </div>

      <div className="movie-card-info-container">
        <h3>{movie.title}</h3>
        <h4 className="movie-card-info-year">{movie.year}</h4>
        <div className='movie-card-info-subtitle'>{movie.subTitle}</div>
      </div>
    </div>
  );
};

export default MovieCard;
