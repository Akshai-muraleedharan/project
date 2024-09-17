import React from 'react'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
import ClientAndAdminHeader from '../../components/client and adminComponents/ClientAndAdminHeader'

function AdminLayout() {
  return (
    <>
    <div className='root_container'>
    <ClientAndAdminHeader/>
        <Outlet />
        <Footer />
    </div>
    </>
  )
}

export default AdminLayout