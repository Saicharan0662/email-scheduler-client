import React from 'react';
import { LinearProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Nav = ({ isLoading = false }) => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <>
            <div className='sticky top-0 left-0' style={{ zIndex: '2' }}>
                <div className=' w-full flex justify-between align-center bg-deepBlue' style={{ minHeight: '55px' }}>
                    <div className='text-white font-normal my-4 mx-4'>
                        E-Scheduler
                    </div>
                    <div className='flex text-white justify-between font-normal nav-btn'>
                        <span className='hover:cursor-pointer text-effect' onClick={() => logout()}>Logout</span>
                    </div>
                </div>
                {isLoading && <LinearProgress color='inherit' />}
            </div>
        </>
    );
};

export default Nav;
