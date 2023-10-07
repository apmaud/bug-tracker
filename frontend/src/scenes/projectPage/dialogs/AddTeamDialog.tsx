import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { setViewProject } from '@/state';
import { useDispatch } from 'react-redux';
import { Box, Button, Chip, Dialog, DialogTitle, FormControl, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from '@mui/material';

export default function AddTeamDialog(params) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const parameters = params.params
    const projectId = params.projectId
    const refreshTeam = params.refreshTeam
    const refreshNotTeam = params.refreshNotTeam
    const refreshFullNames = params.refreshFullNames
    const notTeam = params.notTeam
    
    const [contributors, setContributors] = React.useState([])
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
        refreshNotTeam()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFn = () => {
        setOpen(false);
    };

    async function newPerson(ev){
        ev.preventDefault();
        if (contributors === null) return
        const newContributors = refreshFullNames().filter(name => contributors.includes(name));
        const response = await fetch(`http://localhost:4000/projects/${projectId}/team/update`, {
          method: "PATCH",
          body: JSON.stringify({newContributors}),
          headers: {'Content-Type': 'application/json'},
        });
        const updatedProject = await response.json();
        dispatch(setViewProject({ viewProject: updatedProject }))
        if (response.status === 200) {
          setContributors([]);
          refreshTeam()
          refreshNotTeam()
        } else {
          setContributors([]);
          alert('failed');
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
            maxWidth="md"
        >
            <DialogTitle id="alert-dialog-title">
            Add team members
            </DialogTitle>
            <form onSubmit={newPerson}>
            <DialogContent
            >
                <DialogContentText>
                    Select people to add to the team:
                </DialogContentText>
                <Box
                height="100%"
                width="100%"
                display="flex"
                alignItems="flex-start"
                justifyContent="stretch"
                >
                    <Stack spacing={2} direction="row" marginLeft="1rem"> 
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
                                sx={{ backgroundColor: palette.grey[100] }}
                                >
                                {notTeam.map((name) => (
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
                    </Stack>
                        {/* <Box display="flex" mt="0.5rem" justifyContent="end" mr="1rem">
                            <Button type="submit" variant="outlined" color="secondary">Create</Button>
                        </Box> */}
                </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="secondary">Close</Button>
            <Button type="submit" onClick={handleFn} autoFocus color="secondary">
                Add
            </Button>
            </DialogActions>
            </form>
        </Dialog>
        </div>
    );
    }
