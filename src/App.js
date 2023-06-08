import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import SortButton from './components/SortButton';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [sortedMovies, setSortedMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {

		const url = `/movies/${searchValue}`

		fetch(url).then(res => res.json()).then(data => {
		if (data.Search) {
			setMovies(data.Search);
		}
    });
};

	// Movie search on search bar text input change 
	// useEffect(() => {
	// 	getMovieRequest(searchValue);
	// }, [searchValue]);

	// Called when you first navigate to the page. Searches for "Star Wars" by default
	useEffect(() => {
		getMovieRequest("Star Wars");
	}, []);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	useEffect(() => {
		setMovies(sortedMovies);
	}, [sortedMovies]);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const sortMovies = (movies) => {
		setSortedMovies(movies.sort((a, b) => a.Title > b.Title))
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SortButton movies={movies} handleSortClick={sortMovies}/>
				<SearchBox 
					searchValue={searchValue} 
					setSearchValue={setSearchValue}
					handleSearchClick={getMovieRequest}
				/>
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
