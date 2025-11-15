package com.klef.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "movie_table")
public class Movie {
    @Id
    @Column(name = "id")   // ✅ must match DB column name
    private int id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 50)
    private String genre;

    @Column(length = 100)
    private String director;

    @Column(name = "release_year")
    private int releaseYear;

    private double rating;

    @Column(length = 500)
    private String review;

    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getDirector() { return director; }
    public void setDirector(String director) { this.director = director; }

    public int getReleaseYear() { return releaseYear; }
    public void setReleaseYear(int releaseYear) { this.releaseYear = releaseYear; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }
}
