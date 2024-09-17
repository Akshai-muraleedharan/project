import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa6";
import {Link} from 'react-router-dom'
import { LoginPageButton } from '../../components/ui/buttons/Buttons';
import {useForm} from "react-hook-form"
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'react-hot-toast';

function AdminLoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm()

  const onSubmit =async (data) => {
    try {
      const response = await axiosInstance({
       url:"admin/login",
       method:"POST",
       data,
      })

      toast.success("login Successfully")
      if(response.data.success == true){
         navigate("/admins")
       }
      
    } catch (error) {
      toast.error("something error")
      setErrorMessage(error.response.data)
      console.log(error)
    }
  }

  return (
    <>
     <div className='backGround_img_admin h-[70vh]'>
    <div className="w-full flex  justify-center  md:mt-8 mb-4  items-center ">
        

          {/* validform */}
          <div className="border-0 p-5 w-full h-[70vh] md:h-[320px] md:w-[50%] rounded-md shadow-lg background_gradient_admin">
            <h2 className="text-center mb-2 font-bold text-2xl text-white">Welcome Admin</h2>
            <form className=" gap-3 flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" {...register("email")} className="grow" placeholder="Email" />
                  
                </label>
                <div className="h-4 text-xs text-end text-red-500 font-semibold">
                {errorMessage.values === "email" ? errorMessage.message : null}
                  
                </div>
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input  type="password" {...register("password")} className="grow" placeholder="password"
                  />
                   <FaRegEyeSlash />
                </label>
                <div className="h-4 text-xs text-end text-red-500 font-semibold">
                  {errorMessage.values === "password" ? errorMessage.message : null}
                </div>
              </div>
              <p className="text-xs  mb-1 text-white">
                Don't have an account ?
                <Link to={"/admin/signup"}>
                  <span className="text-blue-400">Signup</span>
                </Link>
              </p>
              
              <LoginPageButton type="submit"  />
              <Toaster/>
            </form>
          </div>
        {/* </div> */}
      </div>

     </div>
    </>
  )
}

export default AdminLoginPage