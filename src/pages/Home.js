import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/button-large/LargeButton'

const Home = () => {
    const navigate = useNavigate()

    return (
        <div className='relative'>
            <div className="vid-parent">
                <video autoPlay loop muted className='video-home'>
                    <source
                        src={require('../assets/background/GradientWave.webm')}
                        type="video/webm"
                    />
                </video>
            </div>
            <div className='absolute top-0 left-0 flex flex-col justify-center items-center space-x-2' style={{ minHeight: '100vh', width: "100vw" }}>
                <div className="landing-text font-poppins">Email Scheduler</div>
                <div className="flex justify-center items-center space-x-2 font-baloo">

                    <Button text="Get Started"
                        onClick={() => navigate('/register')}
                    />
                    <Button text="Log in"
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>

        </div>
    )
}

export default Home
