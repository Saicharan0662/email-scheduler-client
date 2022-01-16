import { LinearProgress } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ path = "/login", text = "Login", isLoading = false }) => {
    return (
        <div className='sticky top-0 left-0' style={{ zIndex: '2' }}>
            <div className=' w-full flex justify-between align-center' style={{ minHeight: '50px', backgroundColor: "#5f57ff" }}>
                <div className='text-white font-normal p-2 my-1 mx-3'>
                    E-Scheduler
                </div>
                <div className='flex p-2 text-white my-1 mx-3 justify-between font-normal'>
                    <Link to={path}> {text}</Link>
                </div>
            </div>
            {isLoading && <LinearProgress color='inherit' />}
        </div>
    )
}

export default Navbar
