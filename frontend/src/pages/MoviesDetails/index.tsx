import { AxiosRequestConfig } from "axios";
import RatingCard from "components/RatingCard";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
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
  text: string
}

const MoviesDetails = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    if (formData.text === "")
      window.alert("Preencha uma avaliação para salvá-la!")
    else {
      const newReview: NewReview = {
        ...formData,
        userId: getAuthData().userId,
        movieId: parseInt(movieId)
      }
  
      const params: AxiosRequestConfig = {
        method: 'POST',
        url: '/reviews',
        withCredentials: true,
        data: newReview
      };
  
      requestBackend(params)
        .then(response => {
          console.log("Review registrada com sucesso!")
          window.location.reload();
        })
        .catch(error => {
          console.log('Erro ao registrar comentário');
          console.log(error);
        })
    }

  };

  const { movieId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}`,
      withCredentials: true
    };

    requestBackend(params)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  return (
    <div className="movie-det-container">
      <h2>Detalhes do filme: {movie?.title}</h2>

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
              <button className="button" type="submit">SALVAR AVALIAÇÃO</button>
            </div>
          </div>
        </form>
      ) : (
        <></>
      )}

      <div className="base-card movie-reviews-container">
        {movie?.reviews.map((review) => (
          <div className="movie-det-comment" key={review.id}>
            <RatingCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesDetails;
