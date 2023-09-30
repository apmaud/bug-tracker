import BlockBox from '@/components/BlockBox'
import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Box, Button, Chip, FormControl, MenuItem, OutlinedInput, Stack, TextField, Theme, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BootstrapInput } from '@/components/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { setProjects, setUsers } from '@/state';

const ProjectList = () => {
  // PAGE CONTROL
  const [pageType, setPageType] = useState("list");
  const isList = pageType === "list";
  const isNew = pageType === "new";
  const navigate = useNavigate();

  // DATA

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contributors, setContributors] = React.useState<string[]>([]);
  useEffect(() => {
    if(pageType === "list"){
      getProjects();
    }
    else{
      getUsers();
    }
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
  const projectColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.4,
      renderCell: (params: GridCellParams) => <a href={`/projects/${params.id}`}>{params.value}</a>,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.4,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "contributorNames",
      headerName: "Contributors",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value.join(", ")} `,
    },

  ];

  // API FUNCTIONS
  async function newProject(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/projects/post', {
      method: 'POST',
      body: JSON.stringify({name, description, contributors}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.status === 200) {
      alert('new project created');
      setName("");
      setDescription("");
      setContributors([]);
      setPageType("list");
      getProjects();
    } else {
      setName("");
      setDescription("");
      setContributors([]);
      alert('project creation failed');
    }
  }

  async function getProjects() {
    const response = await fetch('http://localhost:4000/projects/get', {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setProjects({ projects: data}))
  }

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
              <Typography variant="h3" fontSize="18px">Project List</Typography>
            )}
            {isNew && (
              <Typography variant="h3" fontSize="18px">New Project</Typography>
            )}
            <Button
            variant="outlined" 
            color="secondary"
            onClick={() => {
              setPageType(isList ? "new" : "list");
            }}
            >
            {isList
                ? "New Project"
                : "Project List"}
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
                columnHeaderHeight={25}
                getRowHeight={() => 'auto'}
                hideFooter={true}
                rows={projects || []}
                columns={projectColumns}
                onRowSelectionModelChange={(id) => {
                  const projectId = id.pop()
                  goToProject(projectId)
              }}
              />
            </Box>
          )} 
          {isNew && (
            <Box
            height="100%"
            width="100%"
            >
              <form onSubmit={newProject}>
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

export default ProjectList