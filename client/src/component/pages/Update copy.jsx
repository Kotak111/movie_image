import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "C:/Users/HP/OneDrive/Desktop/red and white activity/Node_10/Bookstore_mvc/client/src/App.css"

const Update = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function show() {
    try {
        const res = await axios.get(`http://localhost:4000/api/movie/${id}`);
        setData(res.user);
        console.log("res.data.user.....................")
        console.log(res.data);  // Fixed this line
        reset(res.data.user);
        console.log(res.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


  useEffect(() => {
      show();
  }, []);

  async function updatedata(changedata) {
      // const newdata = { ...data, ...changedata };
      console.log(changedata);
      try {
          const res = await axios.put(`http://localhost:4000/api/movie/${id}`, changedata);
          console.log(res);
          toast.success("Data updated successfully");
          navigate("/");
      } catch (error) {
          console.error('Error updating data:', error);
          toast.error("Failed to update data");
      }
  }
  return (
  <>
  <h1>helo</h1>
   <div>
        <div className="container bg-light p-5 mt-5 shadow">
          <h1 className="text-center add-movie">Add Movie</h1>
          <form
            method="post"
            onSubmit={handleSubmit(updatedata)}
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="Moviename" className="form-label">Moviename:</label>
              <input
                type="text"
                className="form-control"
                {...register('Moviename', { required: 'Movie name is required' })}
                placeholder="Enter Movie Name"
              />
              {errors.Moviename && <p className="text-danger">{errors.Moviename.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="MovieDirector" className="form-label">Movie Director:</label>
              <input
                type="text"
                className="form-control"
                {...register('MovieDirector', { required: 'Movie Director is required' })}
                placeholder="Enter Movie Director"
              />
              {errors.MovieDirector && <p className="text-danger">{errors.MovieDirector.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="MovieRelese" className="form-label">Movie Release Year:</label>
              <input
                type="number"
                className="form-control"
                {...register('MovieRelese', { required: 'Movie Release Year is required' })}
                placeholder="Enter Movie Release Year"
              />
              {errors.MovieRelese && <p className="text-danger">{errors.MovieRelese.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="MoviePoster" className="form-label">Movie Poster:</label>
              <img src="" alt="" />
              <input
                type="file"
                {...register('MoviePoster', { required: 'Movie Poster is required' })}
                className="form-control"
              />
              {errors.MoviePoster && <p className="text-danger">{errors.MoviePoster.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="Moviepic" className="form-label">Movie Pictures:</label>
              <input
                type="file"
                {...register('Moviepic', { required: 'Movie pictures are required' })}
                className="form-control"
                multiple
              />
              {errors.Moviepic && <p className="text-danger">{errors.Moviepic.message}</p>}
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
            <Link className="btn btn-danger ms-2" to="/">View Blog</Link>
          </form>
        </div>
      </div>
  </>
  )
}

export default Update
