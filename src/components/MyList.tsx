import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Movie } from '../entities';

const MyList: React.FC = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setBookmarkedMovies(userData.bookmarks || []);
          }
        } catch (error) {
          console.error('Error fetching bookmarked movies:', error);
        }
      }
    };

    fetchBookmarkedMovies();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your list.</p>;
  }

  return (
    <div className="bg-black text-white p-10">
      <h2 className="text-3xl font-bold mb-6">My List</h2>
      {bookmarkedMovies.length === 0 ? (
        <p>You haven't added any movies to your list yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bookmarkedMovies.map((movie, index) => (
            <div key={index} className="p-4 border border-gray-700 rounded-lg">
              <img src={movie.thumbnail} alt={movie.title} className="mb-2 rounded" />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm">{movie.genre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
