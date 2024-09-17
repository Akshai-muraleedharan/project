import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { SignUpPageButton } from "../../components/ui/buttons/Buttons";
import { useForm } from "react-hook-form";
import { Toaster,toast } from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { LuEye } from "react-icons/lu";

function SignupPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(FaRegEyeSlash);

  const [confirmtype, setconfirmType] = useState('password');
  const [confirmicon, setconfirmIcon] = useState(FaRegEyeSlash);

  const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors}} = useForm()


   const onSubmit = async (data) => {

    try {
   const response  =   await axiosInstance({
        url:"user/signup",
        method:"POST",
        data
      })
       if(response.data.success == true){
        navigate("/user/movies")
       }
      toast.success("signup successfully")
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data)
      toast.error("somethig error")
    }
   }

   const handleToggle  = () =>  {
    if (type==='password'){
      setIcon(<LuEye />);
      setType('text')
   } else {
    setIcon(<FaRegEyeSlash />)
    setType('password')
   }
   }


   const confirmhandleToggle = () => {
    if (type==='password'){
      setconfirmIcon(<LuEye />);
      setconfirmType('text')
   } else {
    setconfirmIcon(<FaRegEyeSlash />)
    setconfirmType('password')
   }
   }

  return (
   <>

  <div className='p-3 w-full mx-auto backGround_img_user flex justify-center flex-col items-center'>
      <h1 className='text-3xl text-center font-semibold my-2 text-white'>Sign Up</h1>
      <form  className='flex flex-col md:p-5 gap-2 w-full md:w-[600px] md:shadow-xl md:rounded-md md:bg-gradient-to-b from-black ' onSubmit={handleSubmit(onSubmit)}>
    
      <div>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" {...register("username")} className="grow" placeholder="Username" />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
            {errorMessage.values === "username" ? errorMessage.message : null}
            </div>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text"  {...register("email")} className="grow" placeholder="Email" />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
            {errorMessage.values === "email" ? errorMessage.message : null}
            </div>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type={type} {...register("password")} className="grow" placeholder="password" />
             <span onClick={handleToggle}>
              {icon}
             </span>
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
            {errorMessage.values === "password" ? errorMessage.message : null}
            </div>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input type={confirmtype}  {...register("confirmPassword")} className="grow"  placeholder=" Confirm password" />
              <span onClick={confirmhandleToggle}>
              {confirmicon}
             </span>
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
            {errorMessage.values === "confirm-password" ? errorMessage.message : null}
            </div>
          </div>

          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text"  {...register("mobile")} className="grow" placeholder="mobile" />
            </label>
            <div className="h-4 text-xs text-end text-red-500 font-semibold">
            {errorMessage.values === "mobile" ? errorMessage.message : null}
            </div>
          </div>


<div className='flex gap-2 justify-between align-item text-xs text-white'>
        <p>Have an account ?  <Link to={"/login"} className="text-blue-300"> Login</Link> </p>
       

        <div className="text-blue-300"><Link to={"/account-restore"}>Account restore</Link></div>
      </div>
       <SignUpPageButton type="submit"/>
        <Toaster />
        <div className="h-4 text-xs text-end text-red-500 font-semibold">
            {errorMessage.success === false ? errorMessage.message : null}
            </div>
      </form>
      
   
    </div>
   </>
  );
}

export default SignupPage;
