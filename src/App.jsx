import { useState, useEffect } from "react";
import { OMDB_API_KEY } from "./config";

import BoxMovies from "./boxMovies";
import Loader from "./loader";
import Logo from "./logo";
import MovieDetails from "./movieDetails";
import MovieList from "./movieList";
import NavBar from "./navbar";
import NumResults from "./numResults";
import Search from "./search";



function Main({children}){
  return (
    <main className="main">{children}</main>
  )
}



function App() {
  const [query, setQuery] = useState("oppenheimer");
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [watched, setWatched] = useState([]);

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleSelectMovieId(id) {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`
        );

        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      } 
  }

  if (query.length < 3) {
    setMovies([]);
    return;
  }

  fetchMovie();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <BoxMovies>
          {isLoading ? 
              <Loader /> : 
              <MovieList movies={movies} onSelectMovieId={handleSelectMovieId} />}
        </BoxMovies>
        <BoxMovies>
          {selectedMovieId && (
              <MovieDetails
                selectedId={selectedMovieId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            )
          }
        </BoxMovies>
      </Main>
    </>
  )
}

export default App