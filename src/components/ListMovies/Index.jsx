import React from "react";
import "./Index.css";
import { StarFilled } from "@ant-design/icons";

const ListMovies = ({ listMovies }) => {
  return (
    <div className="container-main">
      <div className="header">
        <p>Peliculas:</p>
      </div>
      {listMovies &&
        listMovies.map((movie) => {
          let parsedDate = "";
          const releaseDate = movie.release_date || movie.first_air_date;

          if (releaseDate) {
            const releaseDateArray = releaseDate.split("-");
            const year = parseInt(releaseDateArray[0], 10);
            const month = parseInt(releaseDateArray[1], 10);
            const day = parseInt(releaseDateArray[2], 10);
            const event = new Date(Date.UTC(year, month, day));
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };

            parsedDate = event.toLocaleDateString("es-MX", options);
          }

          return (
            <div className="body-title" key={movie.poster_path}>
              <h1>{movie.original_title || movie.original_name || ("(no title)")}</h1>
              <div className="score">
                {movie.vote_average}/10
                <span>
                  <StarFilled style={{ color: "#fadb14", marginLeft: 5 }} />
                </span>
              </div>
              <div className="photo-movie">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Hugo"
                />
              </div>

              <p className="info-movie">{movie.overview}</p>
              {parsedDate !== "" && <p className="release-date">
                <strong>Fecha de estreno: {parsedDate}</strong>
              </p>}
            </div>
          );
        })}
    </div>
  );
};

export default ListMovies;
