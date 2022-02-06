import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).name : null
    const userEmail = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).email : null

    console.log(user, userEmail);
    return (
        <>
            <Navbar path='/' text='Logout' />
            <div>
                This is dashboard
            </div>
        </>
    )
}

export default Dashboard
