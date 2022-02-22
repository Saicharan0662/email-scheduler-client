import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const PopUp = ({ email, togglePopUp, setTogglePopUp, input, setInput, submit }) => {
    const [password, setPassword] = useState('')
    const handleClose = () => {
        setTogglePopUp(false)
    };

    const handleCloseAndSchedule = (e) => {
        console.log(password);
        setInput({ ...input, userPassword: password })
        submit(e)
        setTogglePopUp(false)
    }

    return (
        <div>
            <Dialog open={togglePopUp} onClose={handleClose}>
                <DialogTitle>Almost there...</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your password for <strong>{email}</strong> to continue.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCloseAndSchedule}>Schedule</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PopUp