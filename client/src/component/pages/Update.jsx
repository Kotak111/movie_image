import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "C:/Users/HP/OneDrive/Desktop/red and white activity/Node_10/Bookstore_mvc/client/src/App.css"

const Update = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function show() {
    try {
      const res = await axios.get(`http://localhost:4000/api/movie/${id}`);
      setData(res.data.user); // Make sure this is correct
      reset(res.data.user);
      console.log(res.data.user)

      // Set values for images manually
      setValue('MoviePoster', res.data.user.MoviePoster);
      setValue('Moviepic', res.data.user.Moviepic);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    show();
  }, []);

  async function updatedata(changedata) {
    const formData = new FormData();


    for (const key in changedata) {
      if (key === 'MoviePoster' && changedata.MoviePoster instanceof File) {
        formData.append(key, changedata[key][0]); // If new file uploaded
      } else if (key === 'Moviepic' && changedata.Moviepic instanceof FileList) {
        for (let i = 0; i < changedata.Moviepic.length; i++) {
          formData.append(key, changedata.Moviepic[i]); // Handle multiple files
        }
      } else {
        formData.append(key, changedata[key]);
      }
    }
    if (!(changedata.MoviePoster instanceof File)) {

      formData.append('MoviePoster', data.MoviePoster);
    }
    if (!(changedata.Moviepic instanceof FileList)) {

      formData.append('Moviepic', data.Moviepic);
    }

    try {

      console.log(data.MoviePoster)
      console.log(data.Moviepic)
      const res = await axios.put(`http://localhost:4000/api/movie/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Data updated successfully");
      navigate("/");
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error("Failed to update data");
    }
  }

  return (
    <>
      <h1>Update Movie</h1>
      <div>
        <div className="container bg-light p-5 mt-5 shadow">
          <h1 className="text-center add-movie">Update Movie</h1>
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
                type="date"
                className="form-control"
                {...register('MovieRelese', { required: 'Movie Release Year is required' })}
                placeholder="Enter Movie Release Year"
              />
              {errors.MovieRelese && <p className="text-danger">{errors.MovieRelese.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="MoviePoster" className="form-label">Movie Poster:</label>
              {data.MoviePoster && <img src={`http://localhost:4000/profile/${data.MoviePoster}`} alt="Movie Poster" className="mb-3" style={{ width: '200px', height: 'auto' }} />}
              <input
                type="file"
                {...register('MoviePoster')}
                className="form-control"
              />
              {errors.MoviePoster && <p className="text-danger">{errors.MoviePoster.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="Moviepic" className="form-label">Movie Pictures:</label>
              {data.Moviepic && data.Moviepic.map((pic, index) => (
                <img key={index} src={`http://localhost:4000/profile/${pic}`} alt={`Movie Pic ${index}`} className="mb-3 me-2" style={{ width: '100px', height: 'auto' }} />
              ))}
              <input
                type="file"
                {...register('Moviepic')}
                className="form-control"
                multiple
              />
              {errors.Moviepic && <p className="text-danger">{errors.Moviepic.message}</p>}
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
            <Link className="btn btn-danger ms-2" to="/">View Movies</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Update
