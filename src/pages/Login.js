import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../axios'


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


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
    return (
        <div>
            <Navbar path='/register' text='Register' isLoading={isLoading} />
            <div className='w-full h-full flex justify-center items-center font-semibold'>
                <form className='p-8 my-16 form-style' onSubmit={login}>
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
                    <Button type='submit' variant="contained"
                        style={{ maxWidth: '110px', maxHeight: '35px' }}>
                        Submit
                    </Button>
                    <p className="text-xs font-normal mt-3">dont have an account?
                        <span className='text-blue-300 cursor-pointer' onClick={() => navigate('/register')}> signup here</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
