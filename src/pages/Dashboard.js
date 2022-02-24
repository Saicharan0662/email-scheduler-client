import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DateTime from '../components/custom-date/DateTime'
import Nav from '../components/dashboard-navbar/Nav'
import PopUp from '../components/pop-up-dialog/PopUp'

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// toast.configure()

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).name : null
    const userEmail = JSON.parse(localStorage.getItem('user')) ?
        JSON.parse(localStorage.getItem('user')).email : null

    const [togglePopUp, setTogglePopUp] = useState(false)
    const [input, setInput] = useState({
        userEmail: userEmail,
        userPassword: '',
        email: {
            to: '',
            subject: '',
            body: '',
        },
        schedule: "",
    })

    const validate = input => {
        if (!input.userEmail || !input.email.to || !input.email.subject || !input.email.body || !input.schedule) {
            toast.error('Please fill all the fields')
            return false
        }
        return true
    }

    // welcoming text, notification for navbar
    const schedule = (e, password) => {
        e.preventDefault()
        console.log(password)
        console.log(input)
        axios.post('/email', {
            userEmail: input.userEmail,
            userPassword: password,
            email: {
                to: input.email.to,
                subject: input.email.subject,
                body: input.email.body,
            },
            schedule: input.schedule,
        })
            .then(res => {
                console.log('success ', res)
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            {!user && <Navigate to='/' />}
            {togglePopUp &&
                <PopUp
                    email={input.userEmail}
                    togglePopUp={togglePopUp}
                    setTogglePopUp={setTogglePopUp}
                    input={input}
                    setInput={setInput}
                    submit={schedule}
                />
            }
            <Nav />
            <div className='mx-8 my-4'>
                <div className="font-bold text-lg relative left-8">Welcome {user}!!</div>
                <div className='w-full flex items-center font-semibold'>
                    <form className='p-8 my-8 form-style-dashboard'>
                        <h1 className="text-xl ">Let schedule some emails !!!</h1>
                        <TextField
                            required
                            fullWidth
                            helperText="ex: johndoe@gmail.com"
                            id="standard-basic"
                            type={'email'}
                            label="Email"
                            variant="standard"
                            margin="normal"
                            value={input.userEmail}
                            onChange={e => setInput({ ...input, userEmail: e.target.value })}
                        />
                        <TextField
                            required
                            fullWidth
                            helperText="ex: peter@gmail.com"
                            id="standard-basic"
                            type={'email'}
                            label="Receivers Email"
                            variant="standard"
                            margin="normal"
                            value={input.email.to}
                            onChange={e => setInput({ ...input, email: { ...input.email, to: e.target.value } })}
                        />
                        <TextField
                            required
                            fullWidth
                            helperText="subject of email"
                            id="standard-basic"
                            label="Email Subject"
                            variant="standard"
                            margin="normal"
                            value={input.email.subject}
                            onChange={e => setInput({ ...input, email: { ...input.email, subject: e.target.value } })}
                        />
                        <TextField
                            required
                            fullWidth
                            multiline
                            rows={3}
                            helperText="body of email"
                            id="outlined-multiline-static"
                            label="Email Body"
                            variant="standard"
                            margin="normal"
                            value={input.email.body}
                            onChange={e => setInput({ ...input, email: { ...input.email, body: e.target.value } })}
                        />
                        <DateTime
                            label='Schedule'
                            disablePast={true}
                            // 2022-02-19T17:54
                            value={moment(input.schedule).format('YYYY-MM-DDTHH:mm')}
                            onChange={e => {
                                // "Sat Jan 15 2022 18:07:00 GMT+0530"
                                let date = new Date(e.target.value)
                                moment(date).format('ddd MMM DD YYYY HH:mm:ss ZZ').toString()
                                setInput({ ...input, schedule: date })
                            }}
                            style={{
                                marginBottom: '1.25rem',
                            }}
                        />
                        <Button
                            variant="contained"
                            style={{ maxWidth: '140px', maxHeight: '40px' }}
                            onClick={() => {
                                if (validate(input))
                                    setTogglePopUp(true)
                            }}>
                            Next
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Dashboard
