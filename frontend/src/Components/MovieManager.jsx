import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
//import config from './config.js';

const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({
    id: '',
    title: '',
    genre: '',
    director: '',
    releaseYear: '',
    rating: '',
    review: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedMovie, setFetchedMovie] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${import.meta.env.VITE_API_URL}/movieapi`;

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setMovies(res.data);
    } catch {
      setMessage('Failed to fetch movies.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    for (let key in movie) {
      if (!movie[key] || movie[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addMovie = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, {
        id: parseInt(movie.id),
        title: movie.title,
        genre: movie.genre,
        director: movie.director,
        releaseYear: parseInt(movie.releaseYear),
        rating: parseFloat(movie.rating),
        review: movie.review
      });
      setMessage('Movie added successfully.');
      fetchAllMovies();
      resetForm();
    } catch {
      setMessage('Error adding movie.');
    }
  };

  const updateMovie = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, {
        id: parseInt(movie.id),
        title: movie.title,
        genre: movie.genre,
        director: movie.director,
        releaseYear: parseInt(movie.releaseYear),
        rating: parseFloat(movie.rating),
        review: movie.review
      });
      setMessage('Movie updated successfully.');
      fetchAllMovies();
      resetForm();
    } catch {
      setMessage('Error updating movie.');
    }
  };

  const deleteMovie = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllMovies();
    } catch {
      setMessage('Error deleting movie.');
    }
  };

  const getMovieById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedMovie(res.data);
      setMessage('');
    } catch {
      setFetchedMovie(null);
      setMessage('Movie not found.');
    }
  };

  const handleEdit = (mov) => {
    setMovie({
      id: mov.id,
      title: mov.title,
      genre: mov.genre,
      director: mov.director,
      releaseYear: mov.releaseYear,
      rating: mov.rating,
      review: mov.review
    });
    setEditMode(true);
    setMessage(`Editing movie with ID ${mov.id}`);
  };

  const resetForm = () => {
    setMovie({
      id: '',
      title: '',
      genre: '',
      director: '',
      releaseYear: '',
      rating: '',
      review: ''
    });
    setEditMode(false);
  };

  return (
    <div className="movie-container">
      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Movie Watchlist</h2>
      <h3>Hello movie</h3>

      {/* Add/Edit Movie */}
      <div>
        <h3>{editMode ? 'Edit Movie' : 'Add Movie'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={movie.id} onChange={handleChange} />
          <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
          <input type="text" name="genre" placeholder="Genre" value={movie.genre} onChange={handleChange} />
          <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
          <input type="number" name="releaseYear" placeholder="Release Year" value={movie.releaseYear} onChange={handleChange} />
          <input type="number" step="0.1" name="rating" placeholder="Rating (0-10)" value={movie.rating} onChange={handleChange} />
          <input type="text" name="review" placeholder="Review" value={movie.review} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addMovie}>Add Movie</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateMovie}>Update Movie</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* Get Movie By ID */}
      <div>
        <h3>Get Movie By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Movie ID"
        />
        <button className="btn-blue" onClick={getMovieById}>Fetch</button>

        {fetchedMovie && (
          <div className="movie-card">
            <h4>{fetchedMovie.title} ({fetchedMovie.releaseYear})</h4>
            <p><strong>Genre:</strong> {fetchedMovie.genre}</p>
            <p><strong>Director:</strong> {fetchedMovie.director}</p>
            <p><strong>Rating:</strong> {fetchedMovie.rating}/10</p>
            <p><strong>Review:</strong> {fetchedMovie.review}</p>
          </div>
        )}
      </div>

      {/* All Movies */}
      <div>
        <h3>All Movies</h3>
        {movies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(movie).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((mov) => (
                  <tr key={mov.id}>
                    {Object.keys(movie).map((key) => (
                      <td key={key}>{mov[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(mov)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteMovie(mov.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieManager;
