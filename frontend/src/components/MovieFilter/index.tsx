import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Genre } from "types/genre";
import { requestBackend } from "utils/requests";

import './styles.css';

type Props = {
  onChange?: () => void;
}

const MovieFilter = ({ onChange }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: "/genres",
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      const data = response.data as Genre[];
      console.log('ATRIBUIU',data)
      setGenres(data);
    });
  }, []);

  return (
    <div className="movie-filter-select-container base-card">
      <Select
        options={genres}
        classNamePrefix="movie-filter-select"
        isClearable
        placeholder="Categoria"
        getOptionLabel={(genre: Genre) => genre.name}
        getOptionValue={(genre: Genre) => String(genre.id)}
      />
    </div>
  );
};

export default MovieFilter;
