import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import { axiosInstance } from '../../config/axiosInstance';

function AdminOwnersList() {


    const [owner, setOwner] = useState([]);

  
    const ownerGet = async () => {
      try {
        const response = await axiosInstance({
          url: "/admin/owner-All",
          method: "GET",
        });
  
        setOwner(response?.data?.data);
       
      } catch (error) {
        console.log(error)
      }
    };
 

   
const ownerDelete = async (id) => {
  try{
     await axiosInstance({
        url:`admin/owner/${id}`,
        method:'DELETE'
    }) 
    
    ownerGet()
  }catch(error){
    
  }
}
    useEffect(()=>{
        ownerGet()
    },[])

  return (
   <div className='w-full flex flex-col items-center justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Ownres List</h1>
  <div className='w-full p-2 md:w-5/6  max-auto'>
  
  <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr>
        <th></th>
        <th>Ownername</th>
        <th className='text-center'>Email</th>
        <th>Mobile Number</th>
        <th>Active</th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
      
        {owner.map((item,index)=> (
         <>
         <tr key={index} >
          <th>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td className='flex justify-center'>{item.userDeleted  ? <div className='w-4 h-4 bg-red-400 rounded-full'></div> : <div className='w-4 h-4 bg-green-400 rounded-full'></div>}</td>
          <td className='text-center'> <Trash onClick={()=> ownerDelete(item._id)} className='mx-auto cursor-pointer'/></td>
          
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

export default AdminOwnersList



