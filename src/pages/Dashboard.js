import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DateTime from '../components/custom-date/DateTime'
import Nav from '../components/dashboard-navbar/Nav'
import PopUp from '../components/pop-up-dialog/PopUp'

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

    // welcoming text, notification for navbar, pop-up for email password 
    // "schedule": "Sat Jan 15 2022 18:07:00 GMT+0530"
    const schedule = (e) => {
        e.preventDefault()
        console.log(input)
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
                <div className="font-bold text-lg">Welcome {user}!!</div>
                <div className='w-full flex ml-8 items-center font-semibold'>
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
                            rows={4}
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
                            value={input.schedule}
                            onChange={e => setInput({ ...input, schedule: e.target.value })}
                            style={{
                                marginBottom: '1.25rem',
                            }}
                        />
                        {/* <Button type='submit' variant="contained">Next</Button> */}
                        <Button
                            variant="contained"
                            onClick={() => {
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
