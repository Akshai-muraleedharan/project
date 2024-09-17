import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import {  useNavigate, useParams } from "react-router-dom";
import { AddSheduleButton } from '../../components/ui/buttons/Buttons';
import { X } from 'lucide-react';
import { FaArrowLeft } from 'react-icons/fa6';



function MovieShedulePage() {
    const [errorMessage, setErrorMessage] = useState("")
    const [movies, setMovies] = useState([])
    const {theaterId} = useParams()

  const navigate =useNavigate()

    const fetchMovies =async () => {
        try {
            const response = await axiosInstance({
                url:`/theater/movie/${theaterId}`,
                method:"GET"
            })
            
            
            setMovies(response.data.data)
        } catch (error) {
            console.log(error)
            setErrorMessage(error.response.data)
        }
    }

  

    const sheduleMovie = async (data) => {
        try {
           
            const response  = await axiosInstance({
                url:`/theater/movie-shedule/${theaterId}`,
                method:"POST",
                data:{movieId:data},
            })
            if(response.data.success === true){
              navigate("/clients/theater-detail")
            }

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

   const  sheduleDelete = async (id) => {
    try {
     await axiosInstance({
        url:`movie/movie-delete/${id}`,
            method:"DELETE"
          })
          fetchMovies()
       
    } catch (error) {
      console.log(error)
    }
   }

   useEffect(()=> {
    fetchMovies()
},[])

    
  const moviList = movies.map((item) => {
    return(
      <div className="card[unset] rounded-lg p-5  card-compact bg-base-100 w-64 md:w-60 shadow-xl cursor-pointer" key={item._id} >
       <div className='flex justify-end mb-2 cursor-pointer' onClick={()=> sheduleDelete(item._id)}> <X /></div>
      <figure>
        <img
          className="rounded-t-lg w-full max-h-[170px] "
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
       
       <span onClick={() => sheduleMovie(item._id)}>
       <AddSheduleButton/>
       </span>
      </div>
    </div>
    )
  })
  return (
   <>
    <span className="mt-8 ml-8 text-[20px] " onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </span>
    <div className='w-full flex justify-center flex-col items-center'>
      
  
    <div className='container  rounded-md shadow-xl  p-5 mt-5 mb-5'>
    <div className="container mx-auto mb-10">
        <div className="flex flex-wrap justify-center gap-5">
            {moviList}
            <div className='text-red-500'>
            {errorMessage.success === false ? errorMessage.message : null}
            </div>
       
        </div>
      </div> 
    </div>
    </div>
   </>
  )
}

export default MovieShedulePage