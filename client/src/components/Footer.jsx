import React from "react";
import logo from "../assets/image/movie-logo new.png";
import { BsInstagram } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className="w-full bg-black  px-10 py-5 mt-auto" >
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="">
            <div>
              <img className="w-14 mb-5" src={logo} alt="logo" />
            </div>
          </div>
          {/* grid two */}
          <div className="flex items-center justify-center md:justify-center">
            <div className="flex gap-3 items-center  ">
              <BsInstagram className="text-4xl instagram allrounded" />
             
              <FaFacebookF className="facebook" />
              <FaTwitter className="twitter" />
              <FaWhatsapp className="whatsup" />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 ">
          <p className="text-xs text-white text-center">
            Copyright © {new Date().getFullYear()} - All right reserved movie booking company
            
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
