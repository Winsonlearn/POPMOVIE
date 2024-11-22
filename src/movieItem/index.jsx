import spinnerImage from '../assets/Spinner@1x-1.0s-200px-200px.png';

export default function MovieItem({ movie, onSelectMovieId }) {
    const isPosterValid = movie.Poster && movie.Poster !== "N/A";


    return (
      <li className="sigmali" key={movie.imdbID} onClick={() => onSelectMovieId(movie.imdbID)}>
        {isPosterValid ? 
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            :
            <div class="lds-facebook mengukur"><div></div><div></div><div></div></div>
        }
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>📅</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    );
  }
  