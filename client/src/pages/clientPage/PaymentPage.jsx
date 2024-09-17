import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function PaymentPage() {
const [theater,setTheater] = useState([])

console.log(theater)
const navigate = useNavigate()


  const theaterFetch = async () => {
    try {
      const response =await axiosInstance({
        url:"/theater/single-theater",
        method:"GET"
      })

      setTheater(response?.data?.data?.userPayment)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=> {
    theaterFetch()

    


  },[])



  return (
    <>
     <button className="mt-8 ml-8 text-[20px] "  onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
     <div className='w-full flex flex-col items-center justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Payment List</h1>
  <div className='w-full p-2 md:w-5/6  max-auto'>
  
 <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr className="text-center">
        <th></th>
        <th>Booked id</th>
        <th className='text-center'>Movie Name</th>
        <th>Movie Time</th>
        <th>Seat Numbers</th>
        <th>Date</th>
        <th>Payment price</th>
        
      </tr>
    </thead>
    <tbody>
      
        { theater.map((item,index)=> (
         <>
         <tr key={index}className="text-center font-semibold">
          <th>{index + 1}</th>
          <td>{item.userbookedId}</td>
          <td>{item.movieId.title}</td>
          <td>{item.movieTime}</td>
          <td>{item.movieSeat.join(" , ")}</td>
          <td >{item.date}</td>
          <td >{item.moviePayment}</td>
          
          
          </tr>
         </>
        ))}
    
  
    </tbody>
   
  </table>
</div>
  
  </div>

   </div>
  
    </>
  );
}

export default PaymentPage;
