import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/button-large/LargeButton'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-center items-center space-x-2' style={{ height: '100vh' }}>
            <Button text="Get Started"
                onClick={() => navigate('/register')}
            />
            <Button text="Log in"
                onClick={() => navigate('/login')}
            />
        </div>
    )
}

export default Home
