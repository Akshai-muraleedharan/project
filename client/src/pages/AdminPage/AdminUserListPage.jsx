import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import { axiosInstance } from '../../config/axiosInstance';

function UserListPage() {


    const [user, setUser] = useState([]);

  
    const userGet = async () => {
      try {
        const response = await axiosInstance({
          url: "/admin/all-users",
          method: "GET",
        });
  
        setUser(response?.data?.allUser);
       
      } catch (error) {}
    };
 

   
const userDelete = async (id) => {
  try{
    const response = await axiosInstance({
        url:`admin/user/${id}`,
        method:'DELETE'
    }) 
    
    userGet()
  }catch(error){
    
  }
}
    useEffect(()=>{
        userGet()
    },[])

  return (
   <div className='w-full flex flex-col items-center justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Users List</h1>
  <div className='w-full p-2 md:w-5/6  max-auto'>
  
  <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr>
        <th></th>
        <th>Username</th>
        <th className='text-center'>Email</th>
        <th>Mobile Number</th>
        <th>Active</th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
      
        {user.map((item,index)=> (
         <>
         <tr key={index} >
          <th>{index + 1}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td className='flex justify-center'>{item.userDeleted  ? <div className='w-4 h-4 bg-red-400 rounded-full'></div> : <div className='w-4 h-4 bg-green-400 rounded-full'></div>}</td>
          <td className='text-center'> <Trash onClick={()=> userDelete(item._id)} className='mx-auto cursor-pointer'/></td>
          
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

export default UserListPage