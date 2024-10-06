export interface User {
    uid: string; 
    email: string; 
    username: string; 
    bookmarkedMovies?: string[]; 
    photoURL?: string; 
    createdAt?: Date; 
  }

export interface Movie {
    id: string;
    title: string;
    year: number;
    rating: string;
    actors: string[];
    genre: string;
    synopsis: string;
    thumbnail: string;
    trending: boolean;
    recommended: boolean;
  }
  