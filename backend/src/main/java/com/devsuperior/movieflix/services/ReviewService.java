package com.devsuperior.movieflix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.ReviewRepository;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository repo;
	
	@Autowired
	private AuthService authService;
	
	@Transactional
	public ReviewDTO insert(ReviewDTO dto) {
		Review obj = new Review();
		obj.setUser(authService.authenticated());
		obj.setText(dto.getText());
		Movie movie = new Movie();
		movie.setId(dto.getMovieId());
		obj.setMovie(movie);
		obj = repo.save(obj);
		return new ReviewDTO(obj);
	}
}
