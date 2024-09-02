import React from 'react'
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Home = () => {
  const [user, setUser] = useState([]);
  async function show() {
    try {
      const res = await axios.get('http://localhost:4000/api/movie');
      setUser(res.data.user);
      console.log(res.data.user);
      
    } catch (error) {
      alert("error")
      console.error('Error fetching data:', error);
    }
  }

  function trash(id) {
    if (confirm("are you sure want to delete this items")) {
      axios.delete(`http://localhost:4000/api/movie/${id}`)
        .then(() => {
          show();

        })

    }
  }


  useEffect(() => {
    show();
  },[])
  return (
    <>
      <Link className="btn btn-warning mt-5" to="/insert">Add More Movie</Link>
      <div className="container">

        {
          user.length > 0 ?
            (
              <table className='table table-striped table-hover table-bordered text-center mt-5  w-100 '>
                <thead >
                  <th>id</th>
                  <th>Moviename</th>
                  <th>MovieDirector</th>
                  <th>MovieRelese</th>
                  <th>MoviePoster</th>
                  <th>Moviepic</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {
                    user?.length > 0 ? (
                      user?.map((items, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{items.Moviename}</td>
                          <td>{items.MovieDirector}</td>
                          <td>{items.MovieRelese}</td>
                          <td><img src={`http://localhost:4000/profile/${items.MoviePoster}`} alt="" width="100" height="100" /></td>
                          <td style={{display:"flex"}}>
                          {
                            items.Moviepic.map((yes) => (
                            
                          
                              <img
                                src={`http://localhost:4000/profile/${yes}`}
                                style={{ width: '100px', height: '70px', marginRight: '5px',display:"flex" ,border:"2px solid black",marginTop:"9px"}}
                              />
                            ))
                          }
                          </td>
                          {/* <td><img src={`http://localhost:4000/${items.Moviepic}`} alt="" width="100" height="100" /></td> */}
                          <td>
                            <button className="btn btn-danger" onClick={() => trash(items._id)}>delete</button>
                            {/* <Link to={`/showuser/${items.id}`} className='btn btn-success ms-2'>ShowUser</Link> */}
                            <Link to={`/update/${items._id}`} className='btn btn-success ms-2'>UpdateUser</Link>
                          </td>
                        </tr>
                      ))
                    ) :
                      (
                        <th colSpan={5} className='text-center bg-primary'>hello</th>
                      )
                  }
                </tbody>

              </table>

            )
            :
            (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </div>
            )
        }
      </div>
      <Toaster />
    </>
  )
}

export default Home
