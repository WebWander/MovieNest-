import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Movie } from '../entities';

const FilmView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (id) {
          const movieDoc = doc(db, 'movies', id);
          const movieSnapshot = await getDoc(movieDoc);

          if (movieSnapshot.exists()) {
            setMovie(movieSnapshot.data() as Movie);
          } else {
            setError('Movie not found');
          }
        }
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="text-white p-4">
      {movie ? (
        <div className="max-w-4xl mx-auto">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-2">
            <span className="font-semibold">Year:</span> {movie.year}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Rating:</span> {movie.rating}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Genre:</span> {movie.genre}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Actors:</span> {movie.actors.join(', ')}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Synopsis:</span> {movie.synopsis}
          </p>
        </div>
      ) : (
        <div>Movie not found</div>
      )}
    </div>
  );
};

export default FilmView;
