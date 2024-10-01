import { db } from '../config/firebase';
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Movie } from '../entities';

// Add a new movie
export const addMovie = async (movie: Omit<Movie, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "movies"), movie);
    return docRef.id;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

// Get a single movie
export const getMovie = async (movieId: string): Promise<Movie | null> => {
  try {
    const movieDoc = await getDoc(doc(db, "movies", movieId));
    if (movieDoc.exists()) {
      return { id: movieDoc.id, ...movieDoc.data() } as Movie;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting movie:", error);
    throw error;
  }
};

// Get all movies
export const getAllMovies = async (): Promise<Movie[]> => {
  try {
    const moviesSnapshot = await getDocs(collection(db, "movies"));
    return moviesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Movie);
  } catch (error) {
    console.error("Error getting movies:", error);
    throw error;
  }
};


// Get all  genres
export const getAllGenres = async (): Promise<string[]> => {
  try {
    const moviesSnapshot = await getDocs(collection(db, "movies"));
    const moviesList = moviesSnapshot.docs.map((doc) => doc.data() as Movie);
    const genresSet = new Set<string>();

    moviesList.forEach((movie) => {
      const genres = movie.genre.split(',').map((g) => g.trim());
      genres.forEach((genre) => genresSet.add(genre));
    });

    return Array.from(genresSet);
  } catch (error) {
    console.error("Error getting genres:", error);
    throw error;
  }
};

// Update a movie
export const updateMovie = async (movieId: string, updates: Partial<Movie>): Promise<void> => {
  try {
    await updateDoc(doc(db, "movies", movieId), updates);
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

// Delete a movie
export const deleteMovie = async (movieId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "movies", movieId));
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
