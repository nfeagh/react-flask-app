import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import { Button } from 'bootstrap';
import MovieDetails from './components/MovieDetails';
import Modal from "react-modal";

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [sort, setSort] = useState('false');
	const [showMovieDetails, setShowMovieDetails] = useState('false');
	const [isOpen, setIsOpen] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState();

	const getMovieRequest = async (searchValue) => {

	const url = `/movies/${searchValue}`

    fetch(url).then(res => res.json()).then(data => {
      if (data.Search) {
        setMovies(data.Search);
      }
    });
};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const toggleModal = () => {
		setIsOpen(!isOpen)
	}

	const handleImageClick = (movie) => {
		setShowMovieDetails(true)
		toggleModal()
		console.log(movie)
		console.log(isOpen)
		setSelectedMovie(movie)
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

	const getSortedResults = () => {
		setSort(true)

		const ids = movies.map((movie) => movie.imdbID);
		console.log(ids)
	}

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				<button onClick={getSortedResults}>Sort Results</button>
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
					movieDetailsComponent={MovieDetails}
					handleImageClick={handleImageClick}
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
					handleImageClick={handleImageClick}
				/>
			</div>
			{showMovieDetails===true && console.log("Movie Click")}
			<Modal
				isOpen={isOpen}
				onRequestClose={toggleModal}
				contentLabel="My dialog"
			>
				<div>My modal dialog.</div>
				{selectedMovie!==undefined && 
				<div>{selectedMovie.Title}</div>}
				<button onClick={toggleModal}>Close modal</button>
			</Modal>
		</div>
	);
};

export default App;
