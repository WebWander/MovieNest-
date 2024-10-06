/* import React from "react"; */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* import { AuthProvider, useAuth } from "../context/AuthContext";  */
import HomePage from "./components/HomePage";
import GenrePage from "./components/GenrePage";
import Navbar from "./components/Header";
import FilmView from "./components/FilmView";
/* import Category from "./components/Category"; */
/* import Bookmarked from "./pages/Bookmarked"; */
/* import LoginPage from "./pages/LoginPage"; */


const AppRouter: React.FC = () => {
 /*  const { isAuthenticated } = useAuth(); */

  return (
    <>
    <Navbar/>
    <Routes>
      
     {/*  {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
      <Route path="/login" element={<LoginPage />} />
      
      {isAuthenticated && ( */}
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:id" element={<FilmView />} />
          <Route path="/category/:genre" element={<GenrePage />} />
          {/* <Route path="/bookmarked" element={<Bookmarked />} />  */}
        </>
      {/* )} */}
    </Routes>
    </>
    
  );
};

const RootRouter: React.FC = () => {
  return (
    
      <Router>
        <AppRouter />
      </Router>
  
  );
};

export default RootRouter;
