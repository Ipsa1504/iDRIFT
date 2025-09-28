import React from 'react'
import { Link } from 'react-router-dom'

const CaptainDisabled = () => {
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Driver Access Disabled</h2>
      <p className='mb-4'>This app only supports rider bookings. Drivers cannot register through this application. If you are a driver, please contact the operator to join.</p>
      <Link to='/' className='text-blue-600 underline'>Go to Home</Link>
    </div>
  )
}

export default CaptainDisabled
