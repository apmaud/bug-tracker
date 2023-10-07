import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { setViewProject } from '@/state';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Chip, Dialog, DialogTitle, FormControl, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from '@mui/material';

export default function SetUserRoleDialog(params) {
    const [open, setOpen] = React.useState(false);
    const userRole = params.userInfo.role
    const userId = params.userInfo._id
    const [role, setRole] = React.useState({userRole});
    const refreshUsers = params.refreshUsers
    
    const { palette } = useTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFn = () => {
        setOpen(false);
    };

    async function setUserRole() {
        const response = await fetch('http://localhost:4000/users/role/set', {
            method: "PATCH",
            body: JSON.stringify({role, userId}),
            headers: {'Content-Type': 'application/json'},
        })
        if (response.status === 200) {
            setRole({})
            // refreshUsers();
        } else {
            alert('failed');
            setRole({})
        }
    }

    return (
        <div>
        <Button
        onClick={handleClickOpen}
        variant="contained"
        color="secondary"
        size="small"
        >
            Edit Role
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="md"
        >
            <DialogTitle id="alert-dialog-title">
            For {params.userInfo.fullName}
            </DialogTitle>
            <form onSubmit={setUserRole}>
            <DialogContent
            >
                <DialogContentText>
                    Select a role:
                </DialogContentText>
                <Box
                height="100%"
                width="100%"
                >
                    <Stack spacing={2} direction="row" marginLeft="1rem"> 
                        <FormControl variant="standard" sx={{ width: 300 }}>
                                <Select
                                value={role}
                                onChange={ev => setRole(ev.target.value)}
                                color="secondary"
                                sx={{ backgroundColor: palette.grey[100], height: "3rem", }}
                                >
                                    <MenuItem value="User">User</MenuItem>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                    <MenuItem value="Administrator">Administrator</MenuItem>
                                </Select>
                        </FormControl>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="secondary">Close</Button>
            <Button type="submit" onClick={handleFn} autoFocus color="secondary">
                Create
            </Button>
            </DialogActions>
            </form>
        </Dialog>
        </div>
    );
    }
