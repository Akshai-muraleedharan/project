import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {toast,Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Otpgenerate } from '../../ui/buttons/Buttons'
import { axiosInstance } from '../../../config/axiosInstance'


function AdminOtp() {
    const [errorMessage, setErrorMessage] = useState("");
    const [restore, setRestore] = useState(true);


   const  navigate = useNavigate()
    
    const {register,handleSubmit,formState:{errors}} = useForm()
    
    const GenerateOtp = async(data) => {
        try {
         
           const response= await axiosInstance({
                url:"/admin/otp",
                method:"POST",
                data
            })

            setRestore(response.data)
            toast.success("Otp generated successfully")

            
        } catch (error) {
            toast.error("something error")
            setErrorMessage(error.response.data)
            console.log(error)
        }
    }

    const restoreAccount = async(data) => {
        try {
         
           const response= await axiosInstance({
                url:"/admin/account-restore",
                method:"PUT",
                data
            })

        
            toast.success("Account restore successfully")
            if(response.data.success == true){
                navigate("/admin/login")
               }
            
        } catch (error) {
            toast.error("something error")
            setErrorMessage(error.response.data)
            console.log(error)
        }
    }
  return (
   <>
   <div className='flex justify-center items-center h-[50vh]'>
  {
    restore === true ? <div className='p-7 h-40 shadow-xl rounded flex flex-col'>
    <input type="text" placeholder="Enter mobile number"  {...register("mobile")} className="input input-bordered w-full max-w-xs " />
    <div className="h-4 text-xs text-end text-red-500 font-semibold mb-2">
              {errorMessage.success == false ? errorMessage.message : null}
              </div>
          <div  onClick={handleSubmit(GenerateOtp)}>
          <Otpgenerate />
          <Toaster/>
          </div>
    </div>
  : <div className='p-7 h-72 shadow-xl rounded flex flex-col'>
  <input type="text" placeholder="Enter mobile number"  {...register("mobile")} className="input input-bordered w-full max-w-xs " />
  
  <div className="h-4 text-xs text-end text-red-500 font-semibold mb-2">
            {errorMessage.values === "mobile" ? errorMessage.message : null}
            </div>
            <input type="text" placeholder="enter otp"  {...register("otp")} className="input input-bordered w-full max-w-xs mb-3" />
            <div className="h-4 text-xs text-end text-red-500 font-semibold mb-2">
            {errorMessage.values === "otp" ? errorMessage.message : null}
            </div>
        <div onClick={handleSubmit(restoreAccount)}>
        <Otpgenerate />
        <Toaster/>
        </div>
        <div className="h-4 text-xs text-end text-red-500 font-semibold">
            {errorMessage.error === "restore" ? errorMessage.message : null}
            </div>
  </div>}
   </div>
   
   </>
  )
}

export default AdminOtp