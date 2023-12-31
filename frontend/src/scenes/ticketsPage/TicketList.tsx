import BlockBox from '@/components/BlockBox'
import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Box, Button, Chip, FormControl, MenuItem, OutlinedInput, Stack, TextField, Theme, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BootstrapInput } from '@/components/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { setProjects, setUsers, setTickets } from '@/state';

const TicketList = () => {
    // PAGE CONTROL
    const navigate = useNavigate();

    // DATA

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const [tickets, setTickets] = useState([])
    const [projects, setProjects] = useState([])
    // const tickets = useSelector((state) => state.tickets);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        getTickets();
        getRelevantProjects();
    }, []
    );

    // STYLING
    const ticketsColumns = [
        {
            field: "title",
            headerName: "Title",
            flex: 1,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "authorName",
            headerName: "Author",
            flex: 0.75,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "assignedNames",
            headerName: "Assigned to",
            flex: 1,
            renderCell: (params: GridCellParams) => `${params.value.join(", ")} `,
        },
        {
            field: "priority",
            headerName: "Priority",
            flex: 0.75,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "type",
            headerName: "Type",
            flex: 0.75,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.75,
            renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "time",
            headerName: "Time",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `${params.value} hr`,
        },

    ];

    // API FUNCTIONS

    async function getTickets() {
        const response = await fetch(`http://localhost:4000/tickets/get`, {
            method: "GET",
            headers: { Authorization: token },
            });
        const data = await response.json();
        console.log(data)
        setTickets(data)
        // dispatch(setTickets({ tickets: data}))
    }
    async function getRelevantProjects() {
        const response = await fetch(`http://localhost:4000/projects/get/relevant`, {
            method: "GET",
            headers: { Authorization: token },
        });
        const data = await response.json();
        setProjects(data)
        // dispatch(setTickets({ tickets: data}))
    }

    function goToProject(id){
        navigate(`/projects/${id}`)
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
                    rows={tickets || []}
                    columns={ticketsColumns}
                    onRowSelectionModelChange={(id) => {
                        const ticketId = id.pop()
                        const relevantProject = projects.find((project) =>
                            (project.tickets.includes(ticketId))
                        )
                        // console.log(relevantProject._id)
                        // 65173c6891e1c6d378b1e3f3
                        goToProject(relevantProject._id)
                }}
                />
                </Box>
            </BlockBox>
        </>
    )
}

export default TicketList