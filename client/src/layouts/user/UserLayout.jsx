import React from "react";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import UserHeader from "../../components/user/UserHeader";

function UserLayout() {
  return (
    <>
      <div className="root_container">
        <UserHeader />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default UserLayout;
