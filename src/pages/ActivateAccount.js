import axios from 'axios'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbar/Navbar';
toast.configure()

const ActivateAccount = () => {
    const navigate = useNavigate()
    const { token } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const confirmEmail = () => {
        console.log("here")
        setIsLoading(true)
        axios.patch('/auth/activate/:token', {
            clientToken: token
        }).then(res => {
            localStorage.setItem(
                'user',
                JSON.stringify({ name: res.data.user.name, email: res.data.user.name, token: res.data.token })
            )
            setIsLoading(false)
            toast.success('Account activation success')
            navigate('/login')
        }).catch(err => {
            toast.error(err.response.data.msg)
            setIsLoading(false)
        })
    }

    return (
        <>
            <Navbar path='#' text='' isLoading={isLoading} />
            <div className='flex justify-center items-center space-x-2' style={{ height: '100vh' }}>
                {/* <Button text="Activate account"
                    onClick={() => confirmEmail()}
                /> */}
                <Button variant="contained" size="large"
                    onClick={() => confirmEmail()}>Activate Account</Button>
            </div>
        </>
    )
}

export default ActivateAccount
