import MovieItem from "../movieItem";
export default function MovieList({ movies, onSelectMovieId }) {
    return (
      <ul className="list list-movies" >
        {movies?.map((movie, index) => (
          <MovieItem
            key={index}
            movie={movie}
            onSelectMovieId={onSelectMovieId}
          />
        ))}
      </ul>
    );
  }
  