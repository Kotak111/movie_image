import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import "C:/Users/HP/OneDrive/Desktop/red and white activity/Node_10/Bookstore_mvc/client/src/App.css";

const Insert = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const submitData = async (data) => {
    const formData = new FormData();

    // Append all form data fields to FormData object
    formData.append('Moviename', data.Moviename);
    formData.append('MovieDirector', data.MovieDirector);
    formData.append('MovieRelese', data.MovieRelese);
    formData.append('MoviePoster', data.MoviePoster[0]); // Single file upload
    for (let i = 0; i < data.Moviepic.length; i++) {
      formData.append('Moviepic', data.Moviepic[i]); // Multiple file uploads
    }

    try {
      console.log(data.MoviePoster)
      console.log(data.Moviepic)

      const res = await axios.post(`http://localhost:4000/api/movie`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('There was an error!', error);
      toast.error('An error occurred while submitting data.');
    }
  };

  return (
    <>
      <div>
        <div className="container bg-light p-5 mt-5 shadow">
          <h1 className="text-center add-movie">Add Movie</h1>
          <form
            method="post"
            onSubmit={handleSubmit(submitData)}
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
                type="date"
                className="form-control"
                {...register('MovieRelese', { required: 'Movie Release Year is required' })}
                placeholder="Enter Movie Release Year"
              />
              {errors.MovieRelese && <p className="text-danger">{errors.MovieRelese.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="MoviePoster" className="form-label">Movie Poster:</label>
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
  );
};

export default Insert;
