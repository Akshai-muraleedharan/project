import  { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



export const OwnerAuth = ({ children }) => {
   const[user,setuser] = useState()
   const navigate =useNavigate()
   const location =useLocation()

    const checkOwner = async () => {
        try {
            await axiosInstance({
                url:"owner/check-owner",
                method:"GET",
                withCredentials:true
            })
            setuser(true)
           
        } catch (error) {
            navigate("/client/login")
            console.log(error)
        }
    }

    useEffect(()=>{
        checkOwner()
    },[location.pathname])

    return user ? children : null
  
}





