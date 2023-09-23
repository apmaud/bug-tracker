import BlockBox from '@/components/BlockBox'
import { Box, Button, Chip, FormControl, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setViewProject, setUsers } from '@/state';

const Team = () => {

    // PAGE CONTROL
    const [pageType, setPageType] = useState("list");
    const isList = pageType === "list";
    const isNew = pageType === "new";

    // API STATES
    const dispatch = useDispatch();
    const project = useSelector((state) => state.viewProject);
    const users = useSelector((state) => state.users);
    // const [project, setProject] = useState({});
    // const [users, setUsers] = useState([]);
    const [notTeam, setNotTeam] = useState(null);
    const [projectTeam, setProjectTeam] = useState(null);
    const token = useSelector((state) => state.token);
    const [contributors, setContributors] = useState([]);
    const {projectId} = useParams();
    useEffect(() => {
        if (pageType === "list"){
            getProject();
            getUsers();
        }
        else{
            getUsers();
            getNotTeamUsers()
        }
        },[]
    );

    // STYLING
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
    const teamColumns = [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        renderCell: (params: GridCellParams) => `${params.value}`,
      },
    ];

    // API FUNCTIONS

    async function getProject() {
        const response = await fetch(`http://localhost:4000/projects/${projectId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            });
        const data = await response.json();
        dispatch(setViewProject({ viewProject: data}))
        const ids = data.contributors
        const names = data.contributors
        getProjectTeam();
        getNotTeamUsers();
    }

    async function getUsers() {
        const response = await fetch('http://localhost:4000/users/get', {
            method: "GET",
        });
        const data = await response.json();
        dispatch(setUsers({ users: data}))
        getProjectTeam();
        getNotTeamUsers();
    }

    const getProjectTeam = useCallback(async () => {
        const response = await fetch(`http://localhost:4000/projects/${projectId}/team`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setProjectTeam(data);
    }, [projectTeam])

    // Add a new person to the project
    async function newPerson(ev){
        ev.preventDefault();
        if (contributors === null) return
        const newContributors = getFullNames().filter(name => contributors.includes(name));
        console.log(newContributors)
        const response = await fetch(`http://localhost:4000/projects/${projectId}/team/update`, {
          method: "PATCH",
          body: JSON.stringify({newContributors}),
          headers: {'Content-Type': 'application/json'},
        });
        const updatedProject = await response.json();
        dispatch(setViewProject({ viewProject: updatedProject }))
        if (response.status === 200) {
          alert('new person added');
          setPageType("list");
          setContributors([]);
        } else {
          setContributors([]);
        }
    }
    

    function getFullNames(){
        const fullNames = users.map(
          function(user){
            return `${user.fullName}`
        })
        return fullNames
    }

    // Used to display all the options for people not on the team to add
    const getNotTeamUsers = useCallback(async () => {
        const team = project.contributorNames;
        const total = getFullNames();
        const notTeam = total.filter(name => !team.includes(name));
        setNotTeam(notTeam);
    }, [notTeam])
    // function getNotTeamUsers() {
    //     const team = project.contributorNames;
    //     const total = getFullNames();
    //     const notTeam = total.filter(name => !team.includes(name));
    //     setNotTeam(notTeam);
    // }

    return (
        <>
            <BlockBox
                gridArea="a"
            >
                <Box
                    pt="1rem"
                    pl="1rem"
                    pr="1rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {isList && (
                    <Typography variant="h3" fontSize="18px">Team</Typography>
                    )}
                    {isNew && (
                    <Typography variant="h3" fontSize="18px">Users</Typography>
                    )}
                    <Button
                        variant="outlined" 
                        color="secondary"
                        onClick={() => {
                        setPageType(isList ? "new" : "list");
                        }}
                    >
                        {isList
                            ? "Add"
                            : "Team"}
                    </Button>
                </Box>

                
                {isList && (
                    <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            // the & targets a class, in the child compnent-> datagrid!
                            color: palette.grey[300],
                            border: "none",
                            fontSize: "1rem",
                        },
                        "& .MuiDataGrid-cell": {
                            borderbottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderbottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        '& .MuiDataGrid-row': {
                            minHeight: '50px !important',
                        },
                        "& .MuiDataGrid-columnSeparators": {
                            visbility: "hidden",
                        },
                    }}
                    >
                        <DataGrid
                            sx={{minWidth: "250px"}}
                            columnHeaderHeight={25}
                            getRowHeight={() => 'auto'}
                            hideFooter={true}
                            rows={projectTeam || []}
                            columns={teamColumns}
                        />
                    </Box>
                )}

                {isNew && (
                    <Box
                    height="100%"
                    width="100%"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="stretch"
                    >
                        <form onSubmit={newPerson}>
                            <Stack spacing={2} direction="row" marginLeft="1rem"> 
                                <FormControl variant="standard" sx={{ minWidth: "250px"}}>
                                    <Typography color="secondary">People</Typography>
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
                                </FormControl>
                            </Stack>
                            <Box display="flex" mt="0.5rem" justifyContent="end" mr="1rem">
                                <Button type="submit" variant="outlined" color="secondary">Create</Button>
                            </Box>
                        </form>
                    </Box>
                )}
            </BlockBox>
        </>
    )
}

export default Team