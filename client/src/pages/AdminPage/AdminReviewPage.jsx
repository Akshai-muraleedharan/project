import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import { Trash } from 'lucide-react';

function AdminReviewPage() {

    const [review, setReview] = useState([]);

       
    const ReviewGet = async () => {
        try {
          const response = await axiosInstance({
            url: "/admin/rating-All",
            method: "GET",
          });
    
         setReview(response?.data?.data);
         
        } catch (error) {
            console.log(error)
        }
      };

      const ownerDelete = async (id) => {
        try{
          const response =  await axiosInstance({
                url:`/admin/rating/${id}`,
                method:'DELETE'
            })
           
            ReviewGet()
        }catch(error){
            console.log(error)
        }
      }

      useEffect(()=>{
        ReviewGet()
      },[])

  return (
    <div className='w-full flex flex-col items-center justify-center mt-24'>
    <h1 className='text-center text-2xl font-semibold mb-10'>Review List</h1>
  <div className='w-full p-2 md:w-5/6  max-auto'>
  
  <div className="overflow-x-auto">
  <table className="table table-sm">
    <thead>
      <tr>
        <th></th>
        <th>Moviename</th>
        <th >Review</th>
        <th>user name</th>
        <th>user email</th>
        <th>posted date</th>
        <th>Delete</th>
        
      </tr>
    </thead>
    <tbody>
      
        {review.map((item,index)=> (
         <>
         <tr key={index} >
          <th>{index + 1}</th>
          <td>{item.movie.title}</td>
           <td>{item.comment}</td>
           <td>{item.username.username}</td>
           <td>{item.usermail}</td>
           <td>{item.createdAt.slice(0,10).split("-").reverse().join("-")}</td>
         
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

export default AdminReviewPage