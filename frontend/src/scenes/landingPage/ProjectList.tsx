import BlockBox from '@/components/BlockBox'
import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Box, Button, Chip, FormControl, MenuItem, OutlinedInput, Stack, TextField, Theme, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BootstrapInput } from '@/components/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { setProjects, setUsers } from '@/state';
import AddProjectDialog from './dialogs/AddProjectDialog';
import DeleteProjectDialog from './dialogs/DeleteProjectDialog';

const ProjectList = () => {
  // PAGE CONTROL
  const navigate = useNavigate();

  // DATA

  const dispatch = useDispatch();
  // const projects = useSelector((state) => state.projects);
  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);
  const [projects, setProjects] = useState([])

  useEffect(() => {
      getProjects();
      getUsers();
  }, []
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
  const renderDeleteButton = (params) => {
    return (
        <strong>
            <DeleteProjectDialog
                params={params.row}
                refreshTickets={getProjects}
            />
        </strong>
    )
}

  const projectColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params: GridCellParams) => <a href={`/projects/${params.id}`}>{params.value}</a>,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "contributorNames",
      headerName: "Contributors",
      flex: 1,
      renderCell: (params: GridCellParams) => `${params.value.join(", ")} `,
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.4,
      renderCell: renderDeleteButton,

    },

  ];

  // API FUNCTIONS

  // async function getProjects() {
  //   const response = await fetch('http://localhost:4000/projects/get', {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   setProjects(data)
  //   // dispatch(setProjects({ projects: data}))
  // }
  
  const getProjects = useCallback(async () => {
    const response = await fetch('http://localhost:4000/projects/get', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setProjects(data)
}, [projects])

  async function getUsers() {
    const response = await fetch('http://localhost:4000/users/get', {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setUsers({ users: data}))
  }

  function getFullNames(){
    const fullNames = users.map(
      function(user){
        return `${user.fullName}`
    })
    return fullNames
  }

  function goToProject(id){
    navigate(`/projects/${id}`)
  }
  
  
  return (
    <>
        <BlockBox
            gridArea="a"
            minWidth="770px"
        >
          <Box
            pt="1rem"
            pl="1rem"
            pr="1rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3" fontSize="18px">Project List</Typography>
            <AddProjectDialog 
              refreshProjects={getProjects}
              getFullNames={getFullNames}
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
                columnHeaderHeight={25}
                getRowHeight={() => 'auto'}
                hideFooter={true}
                rows={projects || []}
                columns={projectColumns}
                onRowSelectionModelChange={(id) => {
                  const projectId = id.pop()
                  goToProject(projectId)
                }}
                onCellClick={(params, events) => {
                  if (params.field === "delete") {
                    events.stopPropagation()
                    console.log(params)
                  }}
                }
              />
            </Box>
        </BlockBox>
    </>
  )
}

export default ProjectList