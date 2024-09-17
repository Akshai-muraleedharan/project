import  { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'



export const AdminAuth = ({ children }) => {
   const[admin,setAdmin] = useState()
   const navigate =useNavigate()
   const location =useLocation()

    const checkOwner = async () => {
        try {
            await axiosInstance({
                url:"admin/check-admin",
                method:"GET",
                withCredentials:true
            })
            setAdmin(true)
           
        } catch (error) {
            navigate("/admin/login")
            console.log(error)
        }
    }

    useEffect(()=>{
        checkOwner()
    },[location.pathname])

    return admin ? children : null
  
}





