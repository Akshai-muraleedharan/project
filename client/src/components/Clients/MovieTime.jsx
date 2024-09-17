import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import { axiosInstance } from '../../config/axiosInstance';
import {toast,Toaster} from 'react-hot-toast'

function MovieTime() {
    const [inputValue, setInputValue] = useState('');
    const [myArray, setMyArray] = useState([]);
    const [errors,setError] = useState([])
    const [success,setSucess] = useState([])
    const navigate = useNavigate()
    const {movieId} =useParams()

console.log(myArray)
   

    const handleAddValue = () => {
        if (inputValue) {
          setMyArray((prevArray) => [...prevArray, inputValue]);
          setInputValue(''); 
        }
      };

      const AddMovie = async () => {
        try {
            const response = await axiosInstance({
                url:`/movie/movie-timeShedules/${movieId}`,
                method:"PUT",
                data:{timeShedule:myArray}
            })

            setSucess(response?.data?.message)
            toast.success("successfully Added")
        } catch (error) {
          setError(error?.response?.data?.message)
          setTimeout(()=>{
            toast.error(errors)
          },2000)
         
            console.log(error)
        }
      }
   
  return (
    <>
      <div  className='mt-5 p-2 rounded-md shadow-md flex flex-col flex-wrap w-full  '>
        <div className='flex justify-end mb-4'>
            <span onClick={() => navigate(-1)}>
            <X  /> 
            </span>
           
        </div>

        <div className='flex relative'>
        {/* <input type="text" placeholder="Type here" onChange={(e) => setInputValue(e.target.value)} className="input input-bordered w-full " />
        <button onClick={handleAddValue} className='cursor-pointer absolute top-0 right-0 bottom-0 mr-2'> <ArrowRight /></button> */}

<select className="select select-bordered w-full " defaultValue="" onChange={(e) => setInputValue(e.target.value)}>
  <option disabled selected>Time</option>
  <option>11:45 AM</option>
  <option>03:00 PM</option>
  <option>6:30 PM</option>
  <option>6:15 PM</option>
  <option>9:45 PM</option>
  <option>9:30 PM</option>
  <option>12:00 PM</option>
  

 </select>
 <button onClick={handleAddValue} className='cursor-pointer absolute top-0 right-0 bottom-0 mr-2'> <ArrowRight /></button> 
        </div>
     

      {myArray.length < 1 ? "" :    <div className='flex gap-3 flex-wrap mt-5'>
        { myArray.map((item,index) => (
           <>
            <div key={index} className='text-xs md:w-[13%] text-center shadow-lg font-semibold p-2 rounded-md bg-[#fdcccc] flex items-center justify-center'>{item}</div>
            
           </>
        ))}
         <button className='text-xs p-2 rounded bg-green-500 font-semibold text-white' onClick={AddMovie}>Add to movie</button>
         <Toaster/>
      </div>}

      </div>
    </>
  )
}

export default MovieTime