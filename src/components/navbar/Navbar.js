import { LinearProgress } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ path = "/login", text = "Login", isLoading = false }) => {
    return (
        <div className='sticky top-0 left-0' style={{ zIndex: '2' }}>
            <div className=' w-full flex justify-between align-center bg-deepBlue' style={{ minHeight: '55px' }}>
                <div className='text-white font-normal my-4 mx-4'>
                    E-Scheduler
                </div>
                <div className='flex text-white justify-between font-normal nav-btn'>
                    <Link to={path} className="text-effect"> {text}</Link>
                </div>
            </div>
            {isLoading && <LinearProgress color='inherit' />}
        </div>
    )
}

export default Navbar
