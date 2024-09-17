import React, { useEffect, useState } from 'react'
import { axiosInstance } from "../../config/axiosInstance.js";
import { Link } from 'react-router-dom';

function MovieListPage() {
 
  const [movies,setMovies] = useState([])


 
  const fetchMovieList = async () => {
    try {
    
      const respone = await axiosInstance({
        url: "/movie/list",
        method: "GET",
      });
      setMovies(respone.data.movies)
     
    } catch (error) {}
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

 

  const moviList = movies.map((item) => {
    return(
    item.showTime.length < 1 ? " " :  <div className="card static rounded-lg cursor-default card-compact bg-base-100 w-64 md:w-60 shadow-xl " key={item._id} >
      <Link to={`/user/single-page/${item._id}`}>
      <figure>
          <img className="rounded-t-lg w-full max-h-[200px] md:max-h-[250px] cursor-pointer" src={item.image} alt="Shoes"/>
      </figure>
      </Link>
    
       <div className="card-body">
      <div className="flex items-center justify-between">
        <span className="text-xs border-2 border-blue-200 p-1 text-center rounded-lg text-slate-500" >{item.language}</span>
        <span className="text-slate-400 text-xs">{item.genres}</span>
        </div>
     
       <h6 className="card-title text-[17px] font-[700]">{item.title}</h6> 
     
      </div>
    </div>
    )
  }) 



  return (
    <>
     <h1 className="text-center mt-24 font-bold text-4xl mb-14">
        New Release
      </h1>
      <div className="container  md:max-w-[900px] mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-5">
        { moviList}    
        </div>
      </div>
     
    </>
  )
}

export default MovieListPage