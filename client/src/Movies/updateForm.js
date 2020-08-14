import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  actors: [],
};

const UpdateForm = (props) => {
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error("err", err.message, err.res));
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.name === "title") {
      value = e.target.value.split(",");
    }
    setItem({
      ...item,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then((res) => {
        props.setItem(res.data);
        props.getMovieList();
        push(`/`);
      })
      .catch((err) => {
        console.error(err.message, err.res);
      });
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={item.value}
        />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          value={item.director}
        />
        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={item.metascore}
        />
        <input
          type="text"
          name="actors"
          onChange={handleChange}
          placeholder="Actors"
          value={item.stars}
        />
        <button className="form-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
