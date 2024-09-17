import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { X } from 'lucide-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import {theaterIdValue} from '../../Redux/Owner/OwnerSlice'

function TheaterDetailsPage() {
  const [fetchTheater,setFetch] = useState("");
  const [shedules,setShedules] = useState([]);
  const dispatch = useDispatch()


  const navigate = useNavigate()

  const theaterId =fetchTheater ? fetchTheater._id : null

const fetchSingleTheater = async () => {
  try {
    const response = await axiosInstance({
      url:"theater/single-theater",
      method:"GET"
    })
    
    setFetch(response.data.data)
    setShedules(response.data.data.movieSchedules)
    dispatch(theaterIdValue(response.data.data._id))
  } catch (error) {
    console.log(error)
  }
}

const sheduleDelete = async (shedules,movieId)=> {
 
  try {
  
    const response = await axiosInstance({
        url:`theater/delete-shedule/theaterId/${theaterId}/sheduledId/${shedules}/movieid/${movieId}`,
        method:"PUT"
      })
      fetchSingleTheater()

  } catch (error) {
    console.log(error)
  }
}

const theaterDelete =async (id) => {
  try {
    await axiosInstance({
      url:`theater/delete-theater/${id}`,
      method:"DELETE"
    })
    fetchSingleTheater()
    sheduleDelete()
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=> {
  fetchSingleTheater()

 

},[])



  return (
    <>
    <div>
    <button className="mt-8 ml-8 text-[20px] "  onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
   
    <div className='w-full flex justify-center flex-col items-center'>
    <div className='container  rounded-md shadow-xl  p-5  mt-5'> 
      <div>
        <h2 className='text-center text-2xl font-semibold'>My theater</h2>

       {fetchTheater ?  <div>
      <div className='flex justify-end cursor-pointer' onClick={()=> theaterDelete(fetchTheater._id)}>  <X /></div>
        <h4 className='mt-5 tracking-wide'>Theater Name : <span className='font-semibold capitalize'>{fetchTheater.screenName}</span></h4>
        <h4 className='mt-5 tracking-wide'>ScreenType : <span className='font-semibold capitalize'>{fetchTheater.screenType}</span></h4>
        <h4 className='mt-5 tracking-wide mb-4'>City : <span className='font-semibold capitalize'>{fetchTheater.city}</span></h4>
        <div className='flex justify-end gap-2 flex-wrap'>
        <Link to={`/clients/theater-seat/${fetchTheater._id}`}> <button className='py-1 px-3 text-[14px] bg-green-600 rounded-sm text-white font-semibold' >Create Seat</button></Link>
    <Link to={`/clients/create-movie/${fetchTheater._id}`} > <button className='py-1 px-3 text-[14px] bg-green-600 rounded-sm text-white font-semibold' >Create movies</button></Link>
    <Link to={`/clients/movie-shedule/${fetchTheater._id}`}> <button className='py-1 px-3 text-[14px] bg-green-600 rounded-sm text-white font-semibold' >Shedule Movie</button></Link>
   
        </div>
        </div> : <Link to={"/clients/create-theater"}><p className='text-center mx-auto w-[50%] md:w-[20%] mt-6 p-2 rounded-md bg-green-600 text-white'>Create theater</p> </Link> }
      </div>
      
    </div>


{/* movie shedules */}
    <div className='container rounded-md shadow-xl p-5 mt-5 mb-5'>
           <h2 className='text-center font-semibold text-2xl'>Scheduled movie</h2>

           <div className='w-full flex flex-wrap'>
                
              {shedules.length > 0 ? shedules.map((item) => (
                   <div key={item._id} className='mt-5 p-2 rounded-md shadow-md flex flex-col flex-wrap w-full md:w-4/12 lg:w-3/12'>
                    <div className='flex justify-end' onClick={()=> sheduleDelete(item._id,item.movieId._id)}> <X /></div>
                     <div className=' flex justify-center'>
                     <img className='h-44 w-36' src={item.movieId.image ? item.movieId.image  : ''} alt={item.movieId.title} />
                     </div>
                      <div className='mt-5'>
                        <h2>Titile : {item.movieId.title}</h2>
                        <h3 className='text-sm underline'>Show-time</h3>
                     <h2 className='text-xs text-red-400'>{item.movieId.showTime.map(item => item.timeShedule).join(' , ')}</h2>
                      </div>
                      <Link to={`theater-showTime/${item.movieId._id}`}>
                      <button className='w-full mt-4 bg-[#c214d7] py-2 text-white'>Add Time</button>
                      </Link>
                   </div>
               
              )) : <p className='text-red-500 w-full text-center mt-5'> No movies found</p>}  

           </div>
           <Outlet/>
    </div>
    </div>

    </div>
    </>
  )
}

export default TheaterDetailsPage