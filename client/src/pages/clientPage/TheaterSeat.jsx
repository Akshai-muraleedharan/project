import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateSeatButton } from '../../components/ui/buttons/Buttons';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import {toast,Toaster} from 'react-hot-toast'
import { FaArrowLeft } from 'react-icons/fa6';
function TheaterSeat() {
    
    const [seats, setSeat] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const navigate =useNavigate(-1)
    const { register, handleSubmit} = useForm()

    const {theaterId} = useParams()

    const onSubmit = async (data) => {
        try {
          setLoading(true)
            await axiosInstance({
                url:`theater/create-seat/${theaterId}`,
                method:"POST",
                data:data
            })
            seat()
            toast.success("Seat created Successfully")
            setLoading(false)
        } catch (error) {
            toast.error("Something Error")
            console.log(error)
        }
    }

    const seat = async () => {
        try {
            const response  = await axiosInstance({
                url:"/theater/single-theater",
                method:"GET"
            })

            setSeat(response?.data?.data?.seats)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        seat()
    },[])

  return (
  <>
  <div>
  <button className="mt-8 ml-8 text-[20px]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
       
 
    <div className="w-full flex  justify-center mt-8 mb-4  items-center ">
         
  
          <div className="border-0 p-5 w-full md:w-[80%] rounded-md shadow-lg ">
            <h2 className="text-center mb-2 font-bold text-2xl text-white">
             Add Theater
            </h2>
            <form
              className=" gap-3 flex flex-col "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    {...register("seatStart")}
                    className="grow"
                    placeholder="Seat Start number"
                  />
                </label>
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    {...register("seatEndnumber")}
                    className="grow"
                    placeholder="Seat End Number"
                  />
                </label>
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    {...register("seatPayment")}
                    className="grow"
                    placeholder="Payment"
                  />
                </label>
              </div>

              
              <div className="h-4 text-xs text-end text-red-500 font-semibold">
                
                  
                </div>

              <CreateSeatButton loadings={loading} type="submit" />
                <Toaster/>
            </form>
          </div>
        
        </div>


        {seats.length < 1 ? "" : <div className="w-full flex  justify-center mt-8 mb-4  items-center flex-col">
        <div className='flex flex-wrap justify-evenly gap-2 md:gap-2 w-4/5 md:max-w-[700px]'>
        { seats.map((seat, index) => (
              <div
                key={index} className={`seat ${seat.availableSeat ? (seat.selected ? 'selected' : 'available') : 'booked'}`}>
              </div>
            ))}
            </div>

            <div className='w-full md:w-[50%] h-7 flex justify-between items-center p-1 mt-4 mb-5'>
          
            <span className='flex text-xs items-center'><div className='w-6 h-6 bg-gray-500 rounded-sm'> </div>   Booked </span>
            <span className='flex text-xs items-center'><div className='w-6 h-6 bg-gray-300 rounded-sm border-[1px] border-green-500'> </div>  Available </span>
          </div>
        </div>}
        </div>

  </>
  )
}

export default TheaterSeat