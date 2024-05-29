import React, { useEffect, useState } from "react";
import MovieService from "../services/MovieService";


// const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
//   // Fetch additional movie details if needed (optional)

export default function MovieDetails(props) {
    const [details, setDetails] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await MovieService.getMovieDetails(props.movie.imdbID);
            setDetails(response["Plot"]); // Update details with fetched data
            console.log(response["Plot"])
            // console.log(response.Plot)
            console.log("Details: " + details)
          } catch (err) {
            setError(err);
          } 
        };
      
        fetchData();
      }, [props.movie.imdbID]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center">
        <div className="p-4">
          <h2 className="text-xl font-bold">{props.movie.Title}</h2>
          <p className="text-sm text-gray-500">{props.movie.Year}</p>
          {/* Add more details like plot, cast, etc. if available */}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={props.onClose}>
            Close
          </button>
        </div>
    </div>
  );
};
