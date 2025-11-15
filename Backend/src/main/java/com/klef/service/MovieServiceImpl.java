package com.klef.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.entity.Movie;
import com.klef.repository.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService {
    @Autowired
    private MovieRepository repo;

    @Override
    public Movie addMovie(Movie movie) {
        return repo.save(movie);
    }

    @Override
    public List<Movie> getAllMovies() {
        return repo.findAll();
    }

    @Override
    public Movie getMovieById(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Movie updateMovie(Movie movie) {
        return repo.save(movie);
    }

    @Override
    public void deleteMovieById(int id) {
        repo.deleteById(id);
    }
}
