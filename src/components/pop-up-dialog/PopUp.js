import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

const PopUp = ({ email, togglePopUp, setTogglePopUp, submit }) => {
    const [password, setPassword] = useState('')
    const handleClose = () => {
        setTogglePopUp(false)
    };

    const handleCloseAndSchedule = (e) => {
        if (!password) {
            toast.error('Please enter your password')
            return
        }
        submit(e, password)
        setTogglePopUp(false)
    }

    return (
        <div>
            <Dialog open={togglePopUp} onClose={handleClose}>
                <DialogTitle>Almost there...</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your password for <strong>{email}</strong> to continue.
                        <div className="text-red-400 text-sm">Note: We dont share or store your password.</div>
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