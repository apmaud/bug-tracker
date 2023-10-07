import BlockBox from '@/components/BlockBox'
import { Box, Button, Chip, Dialog, DialogTitle, FormControl, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setViewProject, setUsers } from '@/state';
import DeleteTeamDialog from './dialogs/DeleteTeamDialog';
import AddTeamDialog from './dialogs/AddTeamDialog';

const Team = () => {

    // PAGE CONTROL
    const [pageType, setPageType] = useState("list");
    const isList = pageType === "list";
    const isNew = pageType === "new";

    // API STATES
    const dispatch = useDispatch();
    const project = useSelector((state) => state.viewProject);
    const users = useSelector((state) => state.users);
    const [notTeam, setNotTeam] = useState([]);
    const [projectTeam, setProjectTeam] = useState(null);
    const token = useSelector((state) => state.token);
    const {projectId} = useParams();

    useEffect(() => {
            getProject();
            getUsers();
            getUsers();
            getNotTeamUsers()
        },[]
    );

    // DIALOGS
    const renderDeleteButton = (params) => {
        return (
            <strong>
                <DeleteTeamDialog
                    params={params.row}
                    projectId={projectId}
                    refreshTeam={getProjectTeam}
                    refreshNotTeam={getNotTeamUsers}
                />
            </strong>
        )
    }


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
      {
        field: "delete",
        headerName: "",
        flex: 0.3,
        renderCell: renderDeleteButton,
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


    function getFullNames(){
        const fullNames = users.map(
          function(user){
            return `${user.fullName}`
        })
        return fullNames
    }
    const getNotTeamUsers = useCallback(async () => {
        const team = project.contributorNames;
        const total = getFullNames();
        const notTeam = total.filter(name => !team.includes(name));
        setNotTeam(notTeam);
    }, [notTeam, project])

    return (
        <>
            <BlockBox
                gridArea="a"
                minWidth="394px"
            >
                <Box
                    pt="1rem"
                    pl="1rem"
                    pr="1rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="h3" fontSize="18px">Team</Typography>
                    <AddTeamDialog 
                    projectId={projectId}
                    refreshTeam={getProjectTeam}
                    refreshNotTeam={getNotTeamUsers}
                    notTeam={notTeam}
                    refreshFullNames={getFullNames}
                    />
                </Box>
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
            </BlockBox>
        </>
    )
}

export default Team