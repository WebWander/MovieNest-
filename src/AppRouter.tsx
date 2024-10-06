import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './components/HomePage';
import GenrePage from './components/GenrePage';
import Navbar from './components/Header';
import FilmView from './components/FilmView';
import SignUp from './components/SignUp';
import LoginPage from './components/Login';
import MyList from './components/MyList';


const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
   
      {isAuthenticated && <Navbar />}

      <Routes>
       
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:id" element={<FilmView />} />
          <Route path="/category/:genre" element={<GenrePage />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </>
        )}  
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
