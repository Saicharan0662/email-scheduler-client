import axios from 'axios'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '../components/button-large/LargeButton';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const ActivateAccount = () => {
    const navigate = useNavigate()
    const { token } = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const confirmEmail = () => {
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
        <div className='relative'>
            <div className="vid-parent">
                <video autoPlay loop muted className='video-home'>
                    <source
                        src={require('../assets/background/clouds.webm')}
                        type="video/webm"
                    />
                </video>
            </div>
            <div className='flex flex-col justify-center items-center space-x-2 absolute top-0 left-0' style={{ height: '100vh', width: '100vw' }}>
                <div className="font-poppins md-text text-white">Just 1 Step Away!!</div>
                <Button
                    style={{ background: '#3fd3ff94', font: 'bold', padding: '0 7px', width: 'auto' }}
                    text="Activate Account"
                    onClick={() => confirmEmail()}
                />
                <div className='mt-3'></div>
                {isLoading && <CircularProgress />}
            </div>
        </div>
    )
}

export default ActivateAccount
