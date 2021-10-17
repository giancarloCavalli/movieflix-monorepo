import { AxiosRequestConfig } from "axios";
import MovieCard from "components/MovieCard";
import RatingCard from "components/RatingCard";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Movie } from "types/movie";
import { NewReview } from "types/newReview";
import { hasAnyRoles } from "utils/auth";
import { requestBackend } from "utils/requests";
import { getAuthData } from "utils/storage";
import "./styles.css";

type UrlParams = {
  movieId: string;
};

type FormData = {
  text: string;
};

const MovieDetails = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    if (formData.text === "")
      toast.info("Preencha uma avaliação para salvá-la.");
    else {
      const newReview: NewReview = {
        ...formData,
        user: {
          id: getAuthData().userId,
          name: "",
          email: "",
        },
        movieId: parseInt(movieId),
      };

      const params: AxiosRequestConfig = {
        method: "POST",
        url: "/reviews",
        withCredentials: true,
        data: newReview,
      };

      requestBackend(params)
        .then((response) => {
          toast.success("Avaliação registrada com sucesso!");
          getMovie();
          setValue("text", "");
        })
        .catch((error) => {
          toast.error("Erro ao registrar comentário");
          console.log(error);
        });
    }
  };

  const { movieId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movie>();

  const getMovie = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return (
    <div className="movie-det-container">
      <div className="base-card">
        {movie ? <MovieCard movie={movie} showSynopsis={true} /> : ""}
      </div>

      {hasAnyRoles(["ROLE_MEMBER"]) ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="base-card movie-rating-includer">
            <div>
              <input
                {...register("text")}
                className="base-input"
                name="text"
                type="text"
                placeholder="Deixe sua avaliação aqui"
              />
            </div>
            <div>
              <button className="button" type="submit">
                SALVAR AVALIAÇÃO
              </button>
            </div>
          </div>
        </form>
      ) : (
        <></>
      )}

      {movie?.reviews.length ? (
        <div className="base-card movie-reviews-container">
          {movie?.reviews.map((review) => (
            <div className="movie-det-comment" key={review.id}>
              <RatingCard review={review} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieDetails;
