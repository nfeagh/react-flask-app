import React from 'react';

const MovieDetails = (props) => {

	return (
		<>
            <div className='image-container d-flex justify-content-start m-3'>
                <div>{props.movie.Title}
                </div>
            </div>
		</>
	);
};

export default MovieDetails;
