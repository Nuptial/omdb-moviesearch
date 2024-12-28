import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles.scss";
import Movies from "./pages/Movies/Movies";
import MovieDetail from "./pages/MovieDetail/MovieDetail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Movies />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="*" element={<Movies />} />
    </Routes>
  );
};

export default App;
