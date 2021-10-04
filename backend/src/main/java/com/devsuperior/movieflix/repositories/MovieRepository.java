package com.devsuperior.movieflix.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
	
	@Query("SELECT obj "
			+ "FROM Movie obj "
			+ "JOIN obj.genre genre "
			+ "WHERE ((COALESCE(:genres) IS NULL) OR genre IN :genres) ")
	Page<Movie> findPaged(Pageable pageable, List<Genre> genres);
}
