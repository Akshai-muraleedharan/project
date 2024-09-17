import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import {toast,Toaster} from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import { useForm } from "react-hook-form";
import { UserPen } from 'lucide-react';
import { CircleArrowRight } from 'lucide-react';
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";



function ProfilePageClient() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [disable,setDisable] = useState(false)
  const [disableEmail,setDisableEmail] = useState(false)
  const [disableMobile,setDisableMobile] = useState(false)
  const [images,setImages] = useState(false)
  const [imagesEmail,setImagesEmail] = useState(false)
  const [imagesMobile,setImagesMobile] = useState(false)
  const {register,handleSubmit,formState:{errors}} = useForm()
  const navigate = useNavigate();
  const theaterId = useSelector((state) => state.owner.theaterIds)

// handle click

      const handleClick = () => {
        setDisable(true)
        setDisableEmail(false)
        setDisableMobile(false)
        setImages(true)
        setImagesEmail(false)
        setImagesMobile(false)
      }

      const emailClick = () => {
        setDisableEmail(true)
        setDisable(false) 
        setDisableMobile(false)
        setImages(false)
        setImagesEmail(true)
        setImagesMobile(false)
      }

      const mobileClick = () => {
        setDisableMobile(true)
        setDisableEmail(false)
        setDisable(false) 
        setImages(false)
        setImagesMobile(true)
        setImagesEmail(false)
      }

// handle click end






  const fetchProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/owner/profile",
        method: "GET",
      });

      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutHandle = async () => {
    try {
      const response = await axiosInstance({
        url: "/owner/logout",
        method: "GET",
      });

      if (response.data.success === true) {
        navigate("/client/login")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hardDelete =async () => {
    try {
    const response =  await axiosInstance({
          url:`/owner/account-delete/${theaterId}`,
          method:"DELETE"
      })
      
      toast.success("Deleted successfully")

      if (response.data.success === true) {
        navigate("/client/login")
      }
     
    } catch (error) {
      console.log(error)
      toast.error("something error")
    }
  }

  const softDelete = async () => {
    try {

   const response =   await axiosInstance({
        url:"owner/soft-delete",
        method:"PUT"
      })  

      toast.success("Deleted successfully")

      if (response.data.success === true) {
        navigate("/login")
      }

      
    } catch (error) {
      console.log(error)
      toast.error("Something error")
    }
  }




  const submit =async (data) => {
  try {

    const response = await axiosInstance({
      url:"/owner/update",
      method:"PUT",
      data
    })
    
    fetchProfile()
    
  } catch (error) {
    console.log(error)
  }
  }


  useEffect(() => {
    fetchProfile();
  }, []);

  

  return (
    <><div>
       <button className="mt-8 ml-8 text-[20px] "  onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
   
      <div className=" px-3 md:px-14 md:container md:mx-auto mb-10 mt-6 ">
        <div className="grid p-0 grid-cols-1 rounded-md md:grid-cols-2  md:p-3 shadow-xl">
          <div className="flex justify-between flex-col items-center  ">
            <img
              className="w-6/12 rounded-[50%]"
              src={profile.profilePic || ""}
              alt={profile.username || ""}
            />
            <h2 className="font-semibold mt-5">{profile.email}</h2>

            

            
          </div>
          <div className="px-2 flex flex-col justify-between">
            <div className="flex justify-between items-center">
           <h1 className="font-semibold">Profile </h1>

            <button className=" p-1 bg-blue-500 rounded-md text-white" onClick={logOutHandle}>
              Log-out
            </button>
            </div>

            
              <div className="flex flex-col gap-5 mt-5 font-semibold" onClick={handleSubmit(submit)}>
           
             <div>
              <label className="text-xs text-slate-400">username</label>
             <div className="flex justify-between w-full">
             {disable ?   <input type="text"className="border-b-2 outline-none bg-slate-300 p-1 rounded w-full mr-1" {...register("username")} defaultValue={profile.username}  /> :  <input type="text"className="border-b-2 outline-none p-1 w-full" {...register("username")} defaultValue={profile.username} disabled  />}
             <button onClick={handleClick}> {images ? <CircleArrowRight /> : <UserPen />  } </button>
             </div> 
             </div>

             {/* user email */}

             <div>
              <label className="text-xs text-slate-400">Email</label>
             <div className="flex justify-between w-full">
             {disableEmail ?   <input type="text"className="border-b-2 outline-none bg-slate-300 p-1 bg-red-2 rounded w-full mr-1" {...register("email")} defaultValue={profile.email}  /> :  <input type="text"className="border-b-2 outline-none  p-1 w-full" {...register("email")} defaultValue={profile.email} disabled  />}
             <button onClick={emailClick}> {imagesEmail ? <CircleArrowRight /> : <UserPen />  } </button>
             </div> 
             </div>

             {/* mobile */}

             <div>
              <label className="text-xs text-slate-400">Mobile</label>
             <div className="flex justify-between w-full">
             {disableMobile ?   <input type="text"className="border-b-2 outline-none bg-slate-300 p-1 rounded w-full mr-1" {...register("mobile")} defaultValue={profile.mobile}  /> :  <input type="text"className="border-b-2 outline-none p-1 w-full" {...register("mobile")} defaultValue={profile.mobile} disabled  />}
             <button onClick={mobileClick}>  {imagesMobile ? <CircleArrowRight /> : <UserPen />  } </button>
             </div> 
             </div>

              </div>
              
              <div className="flex justify-between w-full text-xs mt-5 mb-2 font-semibold text-red-500">
                  {/* <button onClick={softDelete}>Soft Delete</button>
                  <button className="mr-2" onClick={hardDelete}> permanent Delete</button> */}

                      
                    <button onClick={softDelete}>Soft Delete</button>
                    <button className="mr-2" onClick={hardDelete}> permanent Delete</button>

                  <Toaster/>
              </div>
           
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default ProfilePageClient;
