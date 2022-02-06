import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Nav from '../components/dashboard-navbar/Nav'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).name : null
    const userEmail = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).email : null

    console.log(user, userEmail);
    return (
        <>
            {!user && <Navigate to='/' />}
            <Nav />
            <div>
                This is dashboard
            </div>
        </>
    )
}

export default Dashboard
