import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import '../axios'
import google from '../assets/icons/google.png'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const login = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('/auth/login', {
            ...input
        }).then(res => {
            localStorage.setItem(
                'user',
                JSON.stringify({ name: res.data.user.name, email: res.data.user.email, token: res.data.token })
            )
            setIsLoading(false)
            toast.success('Login success')
            navigate('/dashboard')
        }).catch(err => {
            setIsLoading(false)
            toast.error(err.response.data.msg)
        })
        setInput({
            name: "",
            password: ""
        })
    }

    const responseSuccessGoogle = response => {
        const { id_token } = response.tokenObj
        axios.post('/auth/googleLogin', {
            id_token
        })
            .then(res => {
                toast.success('Login Success')
                localStorage.setItem(
                    'user',
                    JSON.stringify({ name: res.data.user.name, email: res.data.user.email, token: res.data.token })
                )
                navigate('/dashboard')
            })
            .catch(err => {
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }
    const responseErrorGoogle = res => {
        console.log(res)
    }

    const getResetPasswordLink = () => {
        if (!input.email) toast.error('Please enter your email')
        axios.post('/auth/forget-password', {
            email: input.email
        })
            .then(() => {
                toast.success('Reset password link has been sent to your email')
            })
            .catch(err => {
                toast.error(err.response.data.msg)
            })
    }

    return (
        <div className=''>
            <Toaster />
            <Navbar path='/register' text='Register' isLoading={isLoading} />
            <div className='w-full h-full flex justify-center items-center font-semibold bg-image'>
                <form className='p-8 my-16 form-style bg-white' onSubmit={login}>
                    <div>
                        <h1 className="text-xl ">Log in</h1>
                        <TextField
                            required
                            fullWidth
                            type={'email'}
                            helperText="Ex: johndoe@gmail.com"
                            id="standard-basic2"
                            label="Email"
                            variant="standard"
                            margin="normal"
                            value={input.email}
                            onChange={e => setInput({ ...input, email: e.target.value })}
                        />
                        <TextField
                            required
                            fullWidth
                            type={'password'}
                            helperText="min 8 char"
                            id="standard-basic3"
                            label="Password"
                            variant="standard"
                            margin="normal"
                            value={input.password}
                            onChange={e => setInput({ ...input, password: e.target.value })}
                        />
                    </div>
                    <p className='text-blue-300 cursor-pointer text-xs flex flex-row-reverse'
                        onClick={getResetPasswordLink}>
                        Forget Password?
                    </p>
                    <Button type='submit' variant="contained"
                        style={{ maxWidth: '110px', maxHeight: '35px' }}>
                        Login
                    </Button>
                    <p className="text-xs font-normal mt-3">dont have an account?
                        <span className='text-blue-300 cursor-pointer' onClick={() => navigate('/register')}> signup here</span>
                    </p>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google-btn'>
                                <span><img src={google} alt="G" /></span>
                                Login with Google
                            </button>
                        )}
                        buttonText="Login with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </form>
            </div>
        </div>
    )
}

export default Login
