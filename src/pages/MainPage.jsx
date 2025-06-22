import { useEffect, useState } from "react";
import NavBar, { Tabs } from "../components/NavBar";
import MovieService from "../services/MovieService";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import useMoviesContext from "../context/MoviesContext";
import { mockedMovies } from "../mocks/movies";
import { Actions } from "../reducers/moviesReducer";


export default function MainPage() {
  const moviesData = mockedMovies.Search;
  const [search, setSearch] = useState("");
  const { favouriteMovies, recommendedMovies, currentTab, setTab } = useMoviesContext();
  const [movies, setMovies] = useState(moviesData);

  useEffect(() => {
    if (currentTab !== Tabs.Movies) {
      setTab(Tabs.Movies);
    }

    if (search.length < 3) { // T22
      return;
    }

    MovieService.getMoviesByName(search) // T23
      .then((movies) => setMovies(movies.Search))
      .catch((err) => console.log(err));

    // setMovies(moviesData.filter(movie => movie.Title.toLowerCase().startsWith(search.toLowerCase()))) // T21, this is commented out in email_23.md
  }, [search]);

  return (
    <div>
      {/* <NavBar /> T15 */}
      <NavBar>
        <SearchBar setSearch={setSearch}/> {/* T21 */}
      </NavBar>
      <div className="flex w-full flex-col">
        <h1 className="text-bold mb-6 ml-12 mt-8 text-3xl text-secondary">{currentTab}</h1> {/* T14 */}
        <div className="grid grid-cols-5"> { /* T11 */}
          {currentTab === Tabs.Movies && movies?.length
            ? movies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} />)
            : null}
          {currentTab === Tabs.Favourites && favouriteMovies?.length
            ? favouriteMovies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} />) // T27, can be done when ever they find it
            : null}
          {currentTab === Tabs.Recommended && recommendedMovies?.length
            ? recommendedMovies.map((movie) => <MovieCard movie={movie} key={movie.imdbID} />)
            : null}
        </div>
      </div>
    </div>
  );
}
