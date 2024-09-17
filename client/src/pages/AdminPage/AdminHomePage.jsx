import React from 'react'
import UserChart from '../../components/Admin/Dashboard/UserChart.jsx'
import OwnerChart from '../../components/Admin/Dashboard/OwnerChart.jsx'


function AdminHomePage() {
  return (
    <div className='p-3 mb-5'>

      <h1 className='text-center text-4xl mt-20 font-semibold mb-20'>Dashboard</h1>

      <UserChart/>
      <OwnerChart/>
    </div>

  )
}

export default AdminHomePage