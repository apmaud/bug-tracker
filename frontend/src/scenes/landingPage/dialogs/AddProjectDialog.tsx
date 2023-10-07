import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { setViewProject } from '@/state';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Chip, Dialog, DialogTitle, FormControl, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from '@mui/material';

export default function AddProjectDialog(params) {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.viewProject)
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [open, setOpen] = React.useState(false);
    const projectId = params.projectId
    const refreshProjects = params.refreshProjects
    const getFullNames = params.getFullNames
    
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [contributors, setContributors] = React.useState<string[]>([]);
    
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFn = () => {
        setOpen(false);
    };

    async function newProject(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/projects/post', {
          method: 'POST',
          body: JSON.stringify({name, description, contributors}),
          headers: {'Content-Type': 'application/json'},
        });
        if (response.status === 200) {
          setName("");
          setDescription("");
          setContributors([]);
          refreshProjects();
        } else {
          setName("");
          setDescription("");
          setContributors([]);
          alert('project creation failed');
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
            Add Project
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
            Add new project
            </DialogTitle>
            <form onSubmit={newProject}>
            <DialogContent
            >
                <DialogContentText>
                    Fill out all the information:
                </DialogContentText>
                <Box
                height="100%"
                width="100%"
                >
                    <Stack spacing={2} direction="row" marginLeft="1rem"> 
                        <Stack spacing={2} direction="column" sx={{marginBottom: 4}}> 
                            <FormControl variant="standard">
                                <Typography color="secondary">Name</Typography>
                                <TextField
                                    id="name" 
                                    onChange={ev => setName(ev.target.value)}
                                    value={name}
                                    style={{background: palette.grey[100]}}
                                />
                            </FormControl>
                            <FormControl variant="standard" sx={{ width: 300 }}>
                                <Typography color="secondary">Description</Typography>
                                <TextField
                                    id="name" 
                                    onChange={ev => setDescription(ev.target.value)}
                                    value={description}
                                    multiline
                                    rows={3}
                                    style={{background: palette.grey[100]}}
                                />
                            </FormControl>
                        </Stack>
                        <FormControl variant="standard" sx={{ width: 300 }}>
                            <Typography color="secondary">Contributors</Typography>
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
                                {getFullNames().map((name) => (
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
