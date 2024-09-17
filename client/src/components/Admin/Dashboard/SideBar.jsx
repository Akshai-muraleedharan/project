import React, { useState } from 'react'
import {LuUser,LuMessageSquare} from "react-icons/lu"
import { FaSuitcase } from "react-icons/fa";
import {TbUsers} from "react-icons/tb"
import { LuBox } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { FaIndianRupeeSign } from "react-icons/fa6";
import logo from "../../../assets/image/movie-logo new.png";


function SideBar() {

  const [activeLink,setActiveLink] =useState(0)

const handleClick = (index) => {
      setActiveLink(index)
}
    const sideBar_link =[
      {id:1, path:'',name:"Dashboard", icon:LuBox},
      {id:2, path:'users',name:"Users", icon:TbUsers},
      {id:3, path:'owners',name:"Owners", icon:TbUsers},
      {id:4, path:'review',name:"Reviews", icon:LuMessageSquare},
      {id:5, path:'payment',name:"Payment", icon:FaIndianRupeeSign},
      // {id:6, path:'/work',name:"Work plan", icon:SlCalender}
    ]

  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white'>

<div>
  <img src={logo} className='w-10' alt="logo" />
</div>
      <ul className='mt-6 space-y-6'>
        {sideBar_link.map((link,index)=> (
          <li key={link.id} className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${activeLink === index ? "bg-indigo-100 text-indigo-500" :""}`}>
            <Link to={link.path} className='flex justify-center md:justify-start items-center  md:space-x-5' onClick={()=> handleClick(index)}>
            <span>{link.icon()}</span>
            <span className='text-sm text-gray-500 hidden md:flex'>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar