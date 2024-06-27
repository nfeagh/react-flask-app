import { useEffect, useState } from "react";
import NavBar, { Tabs } from "../components/NavBar";
import MovieService from "../services/MovieService";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import useMoviesContext from "../context/MoviesContext";
import { mockedMovies } from "../mocks/movies";
import { Actions } from "../reducers/moviesReducer";


export default function MainPage() {
  const moviesData = mockedMovies.Search.filter(movie => movie.Year < 1984); // T6
  const [search, setSearch] = useState("");
  const { favouriteMovies, recommendedMovies, currentTab, setTab, dispatch } = useMoviesContext();
  const [movies, setMovies] = useState(moviesData);

  useEffect(() => {
    if (currentTab !== Tabs.Movies) {
      setTab(Tabs.Movies);
    }

    if (search.length < 0) {
      return;
    }

    // MovieService.getMoviesByName(search)
    //   .then((movies) => setMovies(movies.Search))
    //   .catch((err) => console.log(err));

    setMovies(moviesData.filter(movie => movie.Title.toLowerCase().startsWith(search.toLowerCase()))) // T10, lowercase is stretch
  }, [search]);

  return (
    <div>
      <div className="flex"> { /* T9 */}
        <SearchBar setSearch={setSearch}/>
      </div>
      <div className="flex w-full flex-col">
        <h1 className="text-bold mb-6 ml-12 mt-8 text-center text-7xl text-secondary animate-bounce">{currentTab}</h1> {/* T7 */}
        <div className="grid grid-cols-1">
          {currentTab === Tabs.Movies && movies?.length
            ? movies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} />)
            : null}
          {currentTab === Tabs.Favourites && favouriteMovies?.length
            ? recommendedMovies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} />)
            : null}
          {currentTab === Tabs.Recommended && recommendedMovies?.length
            ? recommendedMovies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} />)
            : null}
        </div>
      </div>
      <NavBar /> { /* T8 */}
    </div>
  );
}
