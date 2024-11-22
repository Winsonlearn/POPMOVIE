import { useState, useEffect } from "react";
import Loader from "../loader";
import { OMDB_API_KEY } from "../config";
import StarRating from "../StarRating";


export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    function handleAddWatched() {
      const newWatchedMovie = {
        imdbID: selectedId,
        title,
        year,
        poster,
        imdbRating: Number(imdbRating),
        runtime: Number(runtime.split(" ").at(0)),
        userRating: Number(userRating),
      };
      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }

    const isWatched = watched.some((movie) => movie.imdbID == selectedId);
    const userRatingWatched = watched.find((movie) => movie.imdbID === selectedId)?.userRating;
  
    const {
      Title: title,
      Year: year,
      Released: released,
      Poster: poster,
      imdbRating,
      Runtime: runtime,
      Plot: plot,
      Genre: genre,
      Actors: actors,
      Director: director,
    } = movie;

    const isPosterValid = poster && poster !== "N/A";

    const FallbackPoster = () => (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "5rem",
        backgroundColor: "var(--color-background-100)",
        borderRadius: "0.5rem",
        padding: "1rem",


      }}
      className="mengukurs-div">
        <div className="lds-facebook mengukurs"><div></div><div></div><div></div></div>

      </div>
    );
  
    useEffect(() => {
      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedId}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
  
      getMovieDetails();
    }, [selectedId]);
  
    return (
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &#x2715;
              </button>
              {isPosterValid ? (
                <img src={poster} alt={`${title} poster`} />
              ) : (
                <FallbackPoster />
              )}
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  <span>📅</span>
                  <span>{released}</span>
                </p>
                <p>
                  <span>⏳</span>
                  <span>{runtime}</span>
                </p>
                <p>
                  <span>🌟</span>
                  <span>{imdbRating}</span>
                </p>
              </div>
            </header>
            <section>
              <p>
                <em>{plot}</em>
              </p>
              <p>Year: {year}</p>
              <p>Genre: {genre}</p>
              <p>Starring: {actors}</p>
              <p>Directed by: {director}</p>

              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      max={10}
                      size={24}
                      color="fcc419"
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAddWatched}>
                        + Add to Watched
                      </button>
                    )}
                  </> 
                ) : (
                  <p>
                    you have watched this movie wirh a rating of {" "}{userRatingWatched} / 10
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    );
  }