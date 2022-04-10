import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';

const ForgetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [input, setInput] = useState({ newPassword: "", confirmPassword: "" })
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (input.newPassword !== input.confirmPassword) {
            toast.error('Password does not match')
            setIsLoading(false)
            return;
        }
        axios.patch('/auth/reset-password', {
            clientToken: token,
            newPassword: input.newPassword
        })
            .then(res => {
                console.log(res)
                toast.success('Password reset success')
                setIsLoading(false)
                navigate('/login')
            })
            .catch(err => {
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }

    return (
        <div>
            <Toaster />
            <div className='circular-spinner'>
                {isLoading && <CircularProgress />}
            </div>
            <div className='w-full h-full flex flex-col justify-center items-center font-semibold bg-image'>
                <form className='p-8 my-16 form-style bg-white' onSubmit={resetPassword}>
                    <div>
                        <h1 className="text-xl ">Reset Password</h1>
                        <TextField
                            required
                            fullWidth
                            type={'password'}
                            helperText="min 8 char"
                            id="standard-basic3"
                            label="Password"
                            variant="standard"
                            margin="normal"
                            value={input.newPassword}
                            onChange={e => setInput({ ...input, newPassword: e.target.value })}
                        />
                        <TextField
                            required
                            fullWidth
                            type={'password'}
                            helperText="min 8 char"
                            id="standard-basic3"
                            label="Confirm Password"
                            variant="standard"
                            margin="normal"
                            value={input.confirmPassword}
                            onChange={e => setInput({ ...input, confirmPassword: e.target.value })}
                        />
                        <Button type='submit' variant="contained"
                            style={{ maxWidth: '110px', maxHeight: '35px' }}>
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword