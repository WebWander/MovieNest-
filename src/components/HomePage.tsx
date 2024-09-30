import React from "react";
/* import Header from "../components/Header"; */
import MoviesList from "../components/MoviesList";
/* import Search from "../components/Search"; */
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      {/* <Header /> */}
     {/*  <Search /> */}
      <MoviesList />
      <div>
        {/* Links to navigate to other pages */}
        <Link to="/category/action">View Action Movies</Link>
        <Link to="/bookmarked">Go to Bookmarked Movies</Link>
      </div>
    </div>
  );
};

export default HomePage;
