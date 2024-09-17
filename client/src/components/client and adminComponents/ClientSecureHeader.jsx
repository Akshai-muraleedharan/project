import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import logo from "../../assets/image/movie-logo new.png";
import { CircleUserRound } from 'lucide-react';
import { DarkMode } from "../ui/Header/DarkMode";

function ClientSecureHeader() {
  const [toggles, setToggles] = useState(false);

  const navRef = useRef();
  function toggle() {
    setToggles(navRef.current.classList.toggle("nav_responsive"));
  }
  function  toggleRemove(){
    setToggles(navRef.current.classList.remove("nav_responsive"))
  }
  return (
    <>
      <div className="w-full flex justify-between items-center p-3 bg-primary-content px-10 h-20 shadow-lg sticky top-0">
        <div>
          <img className="w-10" src={logo} alt="logo" />
        </div>

        <nav
          className="flex items-center capitalize gap-4 font-semibold header-responsive"
          ref={navRef}
        >
          <Link to={""} onClick={toggleRemove}>Home</Link>
  
          <Link to={"theater-list"} onClick={toggleRemove}>Theater-list</Link>
          <Link to={"theater-payment"} onClick={toggleRemove}>Movie payment</Link>
          <Link to={"theater-detail"} onClick={toggleRemove}>My-theater</Link>

          <div>
            <Link to={"profile"} onClick={toggleRemove}>   <CircleUserRound />  </Link>
          </div>
        </nav>
       
        <span className="header_ham" onClick={toggle}>
          {!toggles ? <Menu /> : <X />}
        </span>
        
      </div >
      <div className="sticky top-24 w-16 ml-auto md:p-3">
      <DarkMode/>
      </div>
      
    </>
  );
}

export default ClientSecureHeader;
