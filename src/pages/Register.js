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
            toast.success('Register Success')
            toast.info('Please confirm your email')
            setIsLoading(false)
        }).catch(err => {
            toast.error(err.response.data.msg)
            console.log(err.response.data.msg)
            setIsLoading(false)
        })
        setInput({
            name: "",
            password: "",
            email: ""
        })
    }
    return (
        <div>
            <Navbar path='/login' text='Login' isLoading={isLoading} />
            <div className='w-full h-full flex justify-center items-center font-semibold'>
                <form className='p-8 my-16 form-style' onSubmit={register}>
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
                    <Button type='submit' variant="contained">Submit</Button>
                    <p className="text-xs font-normal mt-3">already have an account!
                        <span className='text-blue-300 cursor-pointer' onClick={() => navigate('/login')}> login here</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
