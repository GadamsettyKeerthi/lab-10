package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
}
