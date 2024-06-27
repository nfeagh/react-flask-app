import React, { useEffect, useState } from "react";
import { mockedMovieDetails } from "../mocks/movieDetails";
import { IoStar } from "react-icons/io5";
import MovieService from "../services/MovieService";

export default function MovieDetails({ onClose, imdbID }) {
  const [details, setDetails] = useState(null);

  const preventActionOnClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    MovieService.getMovieDetails(imdbID)
      .then(movieDetails => setDetails(movieDetails))
      .catch(err => console.log(err))
  }, [imdbID]);

  return details ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 align-middle text-secondary"
      onClick={onClose}
    >
      <div className="flex h-96" onClick={preventActionOnClick}>
        <img src={details?.Poster} className="w-60" />
        <div className="flex w-96 flex-col justify-between bg-background p-4">
          <div>
            <h1 className="mb-5 text-2xl">{details?.Title}</h1>
            <div className="mb-5 flex flex-row items-center justify-between text-center align-middle text-xs">
              <h3 className="text-primary">{details?.Genre}</h3>
              <div className="flex select-none flex-row items-center gap-2 text-accent">
                <span className="flex items-center rounded-lg bg-black/20 p-2">
                  <IoStar color="gold" />
                  {details?.imdbRating}/10
                </span>
                <p className="flex items-center rounded-lg bg-black/20 p-2">{details?.Rated}</p> {/* T17, you can use whatever attribute as tailwind strips all default styling on elements by default: p, h1, h2, h3 etc */}
                <p className="flex items-center rounded-lg bg-black/20 p-2">{details?.Runtime}</p> {/* T17 you can use whatever attribute as tailwind strips all default styling on elements by default: p, h1, h2, h3 etc */}
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="text-[13px] text-secondary">{details?.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
