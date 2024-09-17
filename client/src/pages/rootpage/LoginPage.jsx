import React, { useState } from "react";;
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { LoginPageButton } from "../../components/ui/buttons/Buttons";
import { axiosInstance } from "../../config/axiosInstance";
import { LuEye } from "react-icons/lu";


function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(FaRegEyeSlash);
   

  const navigate = useNavigate()
  const { register, handleSubmit} = useForm()

  const onSubmit = async (data) => {

    
    try {
  
      const response = await axiosInstance({
        url:"user/login",
        method:"POST",
        data
      })

     if(response.data.success == true){
      navigate("/user/movies")
     }
     
    } catch (error) {    
      setErrorMessage(error.response.data)
      console.log(error)
      if(error.response.data.message === "user doesn't exist"){
        navigate("/sign-up")
       }
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


 

  return (
    <>
      <div className="w-full flex  justify-center mt-8 mb-4  items-center">
        <div className="grid grid-cols-1 mb-8  md:grid-cols-2  login_box ">
          <div className="hidden md:block backGround_img rounded-l-lg"></div>

          {/* validform */}
          <div className="border-0 p-5 md:border-2 rounded-r-lg ">
            <h2 className="text-center mb-2 font-bold text-2xl">Login</h2>
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
                  <input  type={type} {...register("password")} className="grow" placeholder="password"
                  />
                  <span onClick={handleToggle}>
                       {icon}
                     </span>
                </label>
                <div className="h-4 text-xs text-end text-red-500 font-semibold">
                  {errorMessage.values === "password" ? errorMessage.message : null}
                </div>
              </div>
              <p className="text-xs text-slate-500 mb-1">
                Don't have an account ?
                <Link to={"/sign-up"}>
                  <span className="text-blue-400">Signup</span>
                </Link>
              </p>
              <LoginPageButton type="submit" />
            </form>
           {/* <div className="h-4 text-xs mt-1 text-red-500 font-semibold">
            {errorMessage.success === false ? errorMessage.message : null}
            </div>  */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
