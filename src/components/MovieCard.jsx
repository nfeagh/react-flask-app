import { useEffect, useState } from "react";
import useMoviesContext from "../context/MoviesContext";
import FavouriteIcon from "./FavouriteIcon";
import { Actions } from "../reducers/moviesReducer";
import MovieService from "../services/MovieService";
import MovieDetails from "./MovieDetails";

export default function MovieCard(props) {
  const { Title, Year, Poster, imdbID } = props.movie;
  const [isFavourite, setIsFavourite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { favouriteMovies, recommendedMovies, dispatch } = useMoviesContext();

  const handleMovieDetailsClose = () => {
    setShowDetails(false);
  };

  const handleMovieDetailsOpen = () => {
    setShowDetails(true);
  };

  const preventActionOnClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const movieIsInFavourites = !!favouriteMovies.find((movie) => movie.Title === Title);
    setIsFavourite(movieIsInFavourites);
  }, [isFavourite, Title]);

  const handleClick = () => {
    dispatch({
      type: Actions.UpdateFavourites,
      payload: props.movie,
    });

    setIsFavourite(!isFavourite);
  };

  return (
    <div className="mx-4 my-4 flex flex-col align-middle">
      <div className="items-center self-center"> {/* T12 */}
        <div className="flex flex-col items-center">
          <img src={Poster} className="h-[15rem] w-48 shadow-2xl hover:scale-105" onClick={handleMovieDetailsOpen} />
          <button type="button" onClick={handleClick} className="relative top-[-35px]">
            <FavouriteIcon onClick={preventActionOnClick} isFavourite={isFavourite} />
          </button>
        </div>
        <div className="relative top-[-20px] text-center">
          <h1 className="text-lg text-secondary">{Title}</h1> {/* T13 */}
          <p className="text-md text-accent">{Year}</p> {/* T13 */}
        </div>
      </div>
      {showDetails && <MovieDetails imdbID={imdbID} onClose={handleMovieDetailsClose}/>} {/* T16 */}
    </div>
  );
}
