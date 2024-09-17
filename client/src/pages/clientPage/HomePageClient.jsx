import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance.js";
import { Ellipsis } from 'lucide-react';

function HomePageClient() {
  const [movies,setmovies] =useState([])


  const fetchMovieList = async () => {
      
    try {
      const respone = await axiosInstance({
        url: "/movie/list",
        method: "GET",
      });

      setmovies(respone?.data?.movies)
    } catch (error) {}
  };
 

  useEffect(() => {
    fetchMovieList();

   
  }, []);

 

  const moviList = movies.map((item) => {
    return(
      <div className="card[unset] rounded-lg card-compact bg-base-100 w-64 md:w-60 shadow-xl " key={item._id} >
      
      <figure>
        <img
          className="rounded-t-lg w-full max-h-[250px] "
          src={item.image}
          alt={item.title}
        />
      </figure>
      <div className="card-body">
      <div className="flex items-center justify-between">
        <span className="text-xs border-2 border-blue-200 p-1 text-center rounded-lg text-slate-500" >{item.language}</span>
        <span className="text-slate-400 text-xs">{item.genres}</span>
        </div>
     
       <h4 className="card-title">{item.title}</h4> 
       <div className="flex justify-end text-xs">
       <Ellipsis onClick={()=>document.getElementById('my_modal_3').showModal()} className="cursor-pointer"/>
     

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
   
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Released Theater and place</h3>
    <p className="py-2">{`Theater : ${item.theaterId.screenName}`}</p>
    <p className="py-2">{`Place : ${item.theaterId.city}`}</p>
  </div>
</dialog>
       </div>
   
      </div>
    </div>
    )
  })

  return (
    <>
      <h1 className="text-center mt-24 font-bold text-4xl mb-14">
       Today Release
      </h1>
      <div className="container mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-5">
        {moviList}
        </div>
      </div>
    
    </>
  );
}

export default HomePageClient;
