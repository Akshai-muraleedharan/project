import React from "react";
import { Outlet } from "react-router-dom";
import AdminSecureHeader from "../../components/client and adminComponents/AdminSecureHeader";
import SideBar from "../../components/Admin/Dashboard/SideBar.jsx";


function AdminSecureLayout() {
  return (
    <>
  
  
      <div className="flex">
      
        <SideBar />

        <div className="w-full ml-16 md:ml-56 overflow-auto">
          
          <AdminSecureHeader />
          <Outlet />
          <div></div>
        </div>
        
      </div>
     
    </>
  );
}

export default AdminSecureLayout;
