package com.klef.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.klef.entity.Movie;
import com.klef.service.MovieService;

@RestController
@RequestMapping("/movieapi")
@CrossOrigin(origins = "*")
public class MovieController {
    
    @Autowired
    private MovieService movieService;

    @GetMapping("/")
    public String home() {
        return "Movie Watchlist API is Running!";
    }

    @PostMapping("/add")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        return new ResponseEntity<>(movieService.addMovie(movie), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<>(movieService.getAllMovies(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable int id) {
        Movie movie = movieService.getMovieById(id);
        return movie != null ?
                new ResponseEntity<>(movie, HttpStatus.OK) :
                new ResponseEntity<>("Movie not found!", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateMovie(@RequestBody Movie movie) {
        Movie existing = movieService.getMovieById(movie.getId());
        return existing != null ?
                new ResponseEntity<>(movieService.updateMovie(movie), HttpStatus.OK) :
                new ResponseEntity<>("Cannot update. Movie not found!", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable int id) {
        Movie existing = movieService.getMovieById(id);
        if (existing != null) {
            movieService.deleteMovieById(id);
            return new ResponseEntity<>("Movie deleted successfully!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Movie not found!", HttpStatus.NOT_FOUND);
    }
}
