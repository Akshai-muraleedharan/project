import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function TheaterList() {
const [theater,setTheater] = useState([])

  
const navigate = useNavigate()


  const theaterFetch = async () => {
    try {
      const response =await axiosInstance({
        url:"/theater/list",
        method:"GET"
      })

      setTheater(response.data.allTheaterList)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=> {
    theaterFetch()

    


  },[])



  return (
    <>
    <div>
    <button className="mt-8 ml-8 text-[20px] "  onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
   
     <h2 className="text-center mt-3 text-2xl font-semibold">Theater List</h2>
      <div className="w-full flex justify-center flex-col items-center">
     
        <div className="container  rounded-md shadow-xl  p-5 mt-5 mb-5">
         
          <div className="overflow-x-auto">
            <table className="table static">
              {/* head */}
              <thead>
                <tr>
            
                  <th>Theater Name</th>
                  <th>Screen type</th>
                  <th>City</th>
                </tr>
              </thead>

              <tbody>
              {theater.map((item,index)=> (
              
              <>
               
                <tr key={index}>
                  
                  <td>{item.screenName}</td>
                  <td> {item.screenType} </td>
                  <td> {item.city} </td>
                </tr>
                </>
               ))}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default TheaterList;
