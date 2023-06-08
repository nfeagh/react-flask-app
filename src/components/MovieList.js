import React, { useState } from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	const MovieDetails = props.movieDetailsComponent;
	const [showMovieDetails, setShowMovieDetails] = useState(false)

	const showMovieDetails = () => {
		
	}

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} onClick={showMovieDetails} alt='movie'></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
