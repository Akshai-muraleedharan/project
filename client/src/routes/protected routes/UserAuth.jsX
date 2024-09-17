import  { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



export const UserAuth = ({ children }) => {
   const[user,setuser] = useState()
   const navigate =useNavigate()
   const location =useLocation()
    const checkUser = async () => {
        try {
            await axiosInstance({
                url:"user/check-user",
                method:"GET",
                withCredentials:true
            })
            setuser(true)
           
        } catch (error) {
            navigate("/login")
            console.log(error)
        }
    }

    useEffect(()=>{
        checkUser()
    },[location.pathname])

    return user ? children : null
  
}





