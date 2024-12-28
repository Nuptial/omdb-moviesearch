import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.scss";
import ListingPage from "./pages/ListingPage/ListingPage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListingPage />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="*" element={<ListingPage />} />
    </Routes>
  );
};

export default App;
