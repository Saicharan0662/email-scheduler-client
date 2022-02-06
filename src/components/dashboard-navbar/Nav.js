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
                <div className=' w-full flex justify-between align-center' style={{ minHeight: '50px', backgroundColor: "#5f57ff" }}>
                    <div className='text-white font-normal p-2 my-1 mx-3'>
                        E-Scheduler
                    </div>
                    <div className='flex p-2 text-white my-1 mx-3 justify-between font-normal'>
                        <span className='hover:cursor-pointer text-effect' onClick={() => logout()}>Logout</span>
                    </div>
                </div>
                {isLoading && <LinearProgress color='inherit' />}
            </div>
        </>
    );
};

export default Nav;
