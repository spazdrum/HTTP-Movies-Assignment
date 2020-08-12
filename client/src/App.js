import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import updateForm from "./Movies/updateForm";
import Movie from "./Movies/Movie";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const [movieCount, setMovieCount] = useState(0);
  const [editCount, setEditCount] = useState(0);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data.length))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  const decreaseMovieCount = () => {
    setMovieCount(movieCount - 1);
  };

  const handleEditCount = () => {
    setEditCount(editCount + 1);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList}
          decreaseMovieCount={decreaseMovieCount}
        />
      </Route>

      <Route
        path="/update-movie/:id"
        render={(props) => (
          <updateForm
            {...props}
            setMovieList={setMovieList}
            component={updateForm}
          />
        )}
      />
    </>
  );
};

export default App;
