import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, decreaseMovieCount }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();
  const match = useRouteMatch();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const editMovie = () => {
    history.push(`/update-movie/${match.params.id}`);
  };

  const deleteMovie = () => {
    const id = match.params.id;
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(() => {
        decreaseMovieCount();
        history.push("/");
      })
      .catch((err) => {
        console.err(err);
      });
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
      <div className="edit-button" onClick={editMovie}>
        Edit
      </div>
    </div>
  );
}

export default Movie;
