import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import logo from "../assets/image/movie-logo new.png";
import { LoginButton } from "./ui/buttons/Buttons";

function Header() {
  const [toggles, setToggles] = useState(false);

  const navRef = useRef();
  function toggle() {
    setToggles(navRef.current.classList.toggle("nav_responsive"));
  }

  function toggleRemove() {
    setToggles(navRef.current.classList.remove("nav_responsive"));
  }
  return (
    <>
      <div className="w-full flex justify-between items-center p-3 bg-white px-10 h-20 shadow-lg sticky top-0">
        <div>
          <img className="w-10" src={logo} alt="logo" />
        </div>

        <nav
          className="flex items-center capitalize gap-4 font-semibold header-responsive"
          ref={navRef}
        >
          <Link to={"/"} onClick={toggleRemove}>
            Home
          </Link>

          <div>
            <Link to={"login"} onClick={toggleRemove}>
              {" "}
              <LoginButton />{" "}
            </Link>
          </div>
        </nav>
        <span className="header_ham" onClick={toggle}>
          {!toggles ? <Menu /> : <X />}
        </span>
      </div>
    </>
  );
}

export default Header;
