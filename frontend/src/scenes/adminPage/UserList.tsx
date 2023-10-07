import BlockBox from '@/components/BlockBox'
import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Box, Button, Chip, FormControl, MenuItem, OutlinedInput, Stack, TextField, Theme, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BootstrapInput } from '@/components/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { setProjects, setUsers, setTickets } from '@/state';
import SetUserRoleDialog from './dialogs/SetUserRoleDialog';

const UserList = () => {
    // PAGE CONTROL
    const navigate = useNavigate();

    // DATA
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const [tickets, setTickets] = useState([])
    const [projects, setProjects] = useState([])
    // const tickets = useSelector((state) => state.tickets);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        getUsers()
    }, []
    );

    // STYLING
    const renderEditButton = (params) => {
        return (
            <strong>
                <SetUserRoleDialog
                    userInfo={params.row}
                    refreshUsers={getUsers}
                />
            </strong>
        )
    }

    const usersColumns = [
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "Edit",
            headerName: "",
            flex: 0.5,
            renderCell: renderEditButton,
      
        },
    ];

    // API FUNCTIONS

    async function getUsers() {
        const response = await fetch('http://localhost:4000/users/get', {
            method: "GET",
        });
        const data = await response.json();
        dispatch(setUsers({ users: data}))
    }


    return (
        <>
            <BlockBox
                gridArea="a"
                minWidth="800px"
            >
            <Box
                pt="1rem"
                pl="1rem"
                pr="1rem"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Typography variant="h3" fontSize="18px">Tickets</Typography>
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
                    columnHeaderHeight={25}
                    getRowHeight={() => 'auto'}
                    hideFooter={true}
                    rows={users || []}
                    columns={usersColumns}
                />
                </Box>
            </BlockBox>
        </>
    )
}

export default UserList