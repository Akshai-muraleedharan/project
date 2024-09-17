import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import logo from "../../assets/image/movie-logo new.png";
import { CircleUserRound } from 'lucide-react';
import { axiosInstance } from "../../config/axiosInstance";
import { RiMovie2Line } from "react-icons/ri";
import { DarkMode } from "../ui/Header/DarkMode";
function UserHeader() {
  const [toggles, setToggles] = useState(false);
  const [name,setName] = useState([])
 const[display,setDisplay] = useState(false)


  const navRef = useRef();
  function toggle() {
    setToggles(navRef.current.classList.toggle("nav_responsive"));
  }

function  toggleRemove(){
  setToggles(navRef.current.classList.remove("nav_responsive"))
}
    

  const profileName = async () => {
    try {
      const response = await axiosInstance({
        url:"/user/profile",
        method:"GET"
      })

      setName(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {

      profileName ()
    
  },[])

  setTimeout(()=>{
    setDisplay(true)
  },9000)

  return (
    <>
      <div className="w-full flex justify-between items-center p-3 bg-primary-content px-10 h-20 shadow-lg sticky top-0">
        <div>
          <img className="w-10" src={logo} alt="logo" />
        </div>
       <p className="font-semibold cursor-default"> { display ?   `Hello ${name.username}` : ''}</p>
        <nav
          className="flex items-center  capitalize gap-4 font-semibold header-responsive"
          ref={navRef}
        >


          <Link to={"movies"} onClick={toggleRemove}>Home</Link>
           <Link to={"booked-movies"} onClick={toggleRemove}>Booked Movies</Link>

          <div>
            <Link to={"profile"} onClick={toggleRemove}>   <CircleUserRound />  </Link>
          </div>
        </nav>

        <span className="header_ham" onClick={toggle}>
          {!toggles ? <Menu /> : <X />}
        </span>
       
      </div>
     

      <div className="sticky top-24 w-16 ml-auto md:p-3">
      <DarkMode/>
      </div>

     
    </>
  );
}

export default UserHeader;
