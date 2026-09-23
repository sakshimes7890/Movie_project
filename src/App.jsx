import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Movie } from "./Pages/Movie";
import { Favorite } from "./Pages/Favorite";
import { MovieDetails } from "./Pages/MovieDetails";
import { Footer } from "./Components/Footer";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Navbar setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/movies" element={<Movie search={search} />} />
        <Route path="/favorites" element={<Favorite search={search} />} />
        <Route path="/login" element={<Login search={search} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;