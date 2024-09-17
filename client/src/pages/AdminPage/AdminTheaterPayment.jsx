import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'

function AdminTheaterPayment() {


    const [theater,setTheater] = useState([])
  
const theaterFetch =async () => {
    try{
        const response = await axiosInstance({
            url:'/admin/theater-list',
            method:'GET'
        })
        setTheater(response?.data?.allTheaterList)
    }catch(error){
        console.log(error)
    }
}

useEffect(()=>{
    theaterFetch ()
},[])

  return (
    <div className='w-full flex flex-col items-center justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Payment List</h1>
  <div className='w-full p-2 md:w-5/6 text-center max-auto'>
  
  <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr>
        <th></th>
        <th>Thearter name</th>
        <th>Owner Email</th>
        <th>place</th>
        <th>Screen Type</th>
        <th> payments</th>
        
      </tr>
    </thead>
    <tbody>
      
        {theater.map((item,index)=> (
         <>
         <tr className='font-semiBold' key={item._id} >
          <th>{index + 1}</th>
          <td>{item.screenName}</td>
           <td>{item.Ownermail}</td>
          <td>{item.city}</td>
          <td>{item.screenType}</td>
          <td>{item.userPayment.map(item => parseInt(item.moviePayment)).reduce((acc,current)=> acc + current,0 )}</td>

          
          </tr>
         </>
        ))}
     
  
    </tbody>
   
  </table>
</div>
  
  </div>

   </div>
  )
}

export default AdminTheaterPayment