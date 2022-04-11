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

const Register = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const register = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('/auth/register', {
            ...input
        }).then(res => {
            toast.success('Registeration Success')
            toast('Please confirm your email')
            setIsLoading(false)
        }).catch(err => {
            toast.error(err.response.data.msg)
            setIsLoading(false)
        })
        setInput({
            name: "",
            password: "",
            email: ""
        })
    }

    const responseSuccessGoogle = response => {
        const { id_token } = response.tokenObj
        axios.post('/auth/googleSignup', {
            id_token
        })
            .then(res => {
                toast.success('Registeration Success')
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


    return (
        <div>
            <Toaster />
            <Navbar path='/login' text='Login' isLoading={isLoading} />
            <div className='w-full h-full flex justify-center items-center font-semibold bg-image'>
                <form className='p-8 my-16 form-style bg-white' onSubmit={register}>
                    <div>
                        <h1 className="text-xl ">Register</h1>
                        <TextField
                            required
                            fullWidth
                            helperText="Ex: John Doe"
                            id="standard-basic"
                            label="Name"
                            variant="standard"
                            margin="normal"
                            value={input.name}
                            onChange={e => setInput({ ...input, name: e.target.value })}
                        />
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
                    <Button type='submit' variant="contained"
                        style={{ maxWidth: '110px', maxHeight: '35px' }}>
                        Sign-up
                    </Button>
                    <p className="text-xs font-normal mt-3">already have an account!
                        <span className='text-blue-300 cursor-pointer' onClick={() => navigate('/login')}> login here</span>
                    </p>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google-btn'>
                                <span><img src={google} alt="G" /></span>
                                Sign-up with Google
                            </button>
                        )}
                        buttonText="Signup with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </form>
            </div>
        </div>
    )
}

export default Register
