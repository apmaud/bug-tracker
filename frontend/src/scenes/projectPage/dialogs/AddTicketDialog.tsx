import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { setViewProject } from '@/state';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Chip, Dialog, DialogTitle, FormControl, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from '@mui/material';

export default function AddTicketDialog(params) {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.viewProject)
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [open, setOpen] = React.useState(false);
    const projectId = params.projectId
    const refreshTickets = params.refreshTickets
    
    const [projectContributors, setProjectContributors] = React.useState([])
    const authorName = `${user.fullName}`
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [status, setStatus] = React.useState("")
    const [priority, setPriority] = React.useState("")
    const [type, setType] = React.useState("")
    const [timeEst, setTimeEst] = React.useState(0)
    const [contributors, setContributors] = React.useState([]);
    
    const { palette } = useTheme();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
         },
        },
    };

    const handleClickOpen = () => {
        setProjectContributors(project.contributorNames)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFn = () => {
        setOpen(false);
    };

    async function newTicket(ev){
        ev.preventDefault();
        const response = await fetch(`http://localhost:4000/tickets/${projectId}/post`, {
          method: "POST",
          body: JSON.stringify({title, description, contributors, status, priority, type, timeEst, token, authorName}),
          headers: {'Content-Type': 'application/json'},
        });
        if (response.status === 200) {
            setTitle("")
            setDescription("")
            setStatus("")
            setPriority("")
            setType("")
            setTimeEst(0)
            setContributors([]);
            refreshTickets();
        } else {
            alert('failed');
            setTitle("")
            setDescription("")
            setStatus("")
            setPriority("")
            setType("")
            setTimeEst("")
            setContributors([]);
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
            Add
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="lg"
        >
            <DialogTitle id="alert-dialog-title">
            Add new ticket
            </DialogTitle>
            <form onSubmit={newTicket}>
            <DialogContent
            >
                <DialogContentText>
                    Fill out all the information:
                </DialogContentText>
                <Box
                height="100%"
                width="100%"
                display="flex"
                alignItems="flex-start"
                justifyContent="stretch"
                >
                    <Stack spacing={1} direction="column" marginLeft="1rem"> 
                        <Stack spacing={1} direction="row" sx={{marginBottom: 4}}> 
                            <FormControl variant="standard" required sx={{ width: "14rem" }}>
                            <Typography color="secondary">Title</Typography>
                            <TextField
                                id="title" 
                                onChange={ev => setTitle(ev.target.value)}
                                value={title}
                                style={{background: palette.grey[100], height: "3rem"}}
                            />
                            </FormControl>
                            <FormControl variant="standard" required sx={{ width: "14rem" }}>
                                <Typography color="secondary">Description</Typography>
                                <TextField
                                    id="description"
                                    onChange={ev => setDescription(ev.target.value)}
                                    value={description}
                                    multiline
                                    rows={2}
                                    style={{background: palette.grey[100]}}
                                />
                            </FormControl>
                            <FormControl variant="standard" required sx={{ width: "7rem" }}>
                                <Typography color="secondary">Time Estimated</Typography>
                                <TextField
                                    id="time" 
                                    onChange={ev => setTimeEst(ev.target.value)}
                                    value={timeEst}
                                    style={{background: palette.grey[100], height: "3rem"}}
                                    type="number"
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>                                 
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                            <FormControl variant="standard" required sx={{ width: "15rem" }}>
                                <Typography color="secondary">Assigned to</Typography>
                                <Select
                                    multiple
                                    value={contributors}
                                    onChange={ev => setContributors(ev.target.value)}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5,}}>
                                        {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                    )}
                                    MenuProps={MenuProps}
                                    color="secondary"
                                    sx={{ backgroundColor: palette.grey[100], height: "3rem", }}
                                    >
                                    {projectContributors.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={{
                                        backgroundColor: palette.grey[100]
                                        }}
                                    >
                                        {name}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" required sx={{ width: "14rem" }}>
                                <Typography color="secondary">Status</Typography>
                                <Select
                                value={status}
                                onChange={ev => setStatus(ev.target.value)}
                                color="secondary"
                                sx={{ backgroundColor: palette.grey[100], height: "3rem", }}
                                >
                                    <MenuItem value="New">New</MenuItem>
                                    <MenuItem value="Assigned">Assigned</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="Resolved">Resolved</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                            <FormControl variant="standard" required sx={{ width: "15rem" }}>
                                <Typography color="secondary">Priority</Typography>
                                <Select
                                value={priority}
                                onChange={ev => setPriority(ev.target.value)}
                                color="secondary"
                                sx={{ backgroundColor: palette.grey[100], height: "3rem", }}
                                >
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" required sx={{ width: "14rem" }}>
                                <Typography color="secondary">Type</Typography>
                                <Select
                                value={type}
                                onChange={ev => setType(ev.target.value)}
                                color="secondary"
                                sx={{ backgroundColor: palette.grey[100], height: "3rem", }}
                                >
                                    <MenuItem value="Service">Service</MenuItem>
                                    <MenuItem value="Problem">Problem</MenuItem>
                                    <MenuItem value="Incident">Incident</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
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
