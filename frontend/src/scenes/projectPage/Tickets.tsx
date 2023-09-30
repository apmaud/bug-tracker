import BlockBox from '@/components/BlockBox'
import { Box, Button, Chip, FormControl, FormHelperText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setViewProject, setUsers, setTickets, setTicket, setViewComments } from '@/state';
import ProjectList from '../landingPage/ProjectList';

const TicketList = () => {

    // PAGE CONTROL
    const [pageType, setPageType] = useState("list");
    const isList = pageType === "list";
    const isNew = pageType === "new";
    const isView = pageType === "view"

    // API STATES
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.tickets);
    const users = useSelector((state) => state.users);
    const comments = useSelector((state) => state.viewComments);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const project = useSelector((state) => state.viewProject)
    const authorName = `${user.fullName}`
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [type, setType] = useState("")
    const [timeEst, setTimeEst] = useState(0)
    const [contributors, setContributors] = useState([]);
    const [comment, setComment] = useState("")
    const [ticketData, setTicketData] = useState({});
    const [ticketId, setTicketId] = useState("");

    const {projectId} = useParams();
    useEffect(() => {
        if (pageType === "list"){
            getTickets();
            getUsers();
        }
        else{
            getTickets();
            // getComments()
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
        field: "assignedNames",
        headerName: "Assigned to",
        flex: 1,
        renderCell: (params: GridCellParams) => `${params.value.join(", ")}`,
      },
    ];
    const ticketCommentsColumns = [
        {
          field: "comment",
          headerName: "Comment",
          flex: 1,
          renderCell: (params: GridCellParams) => `${params.value}`,
        },
        {
            field: "author",
            headerName: "Author",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `${params.value}`,
          },
        {
          field: "createdAt",
          headerName: "Date",
          flex: 0.5,
        //   valueFormatter: params => new Date(params?.value).toLocaleString(),
          renderCell: (params: GridCellParams) => `${new Date(params.value).toLocaleString()}`,
        },
      ];

    // API FUNCTIONS
    
    async function getTickets() {
        const response = await fetch(`http://localhost:4000/tickets/${projectId}/get`, {
            method: "GET",
            headers: { Authorization: token },
            });
        const data = await response.json();
        console.log(data)
        dispatch(setTickets({ tickets: data}))
    }

    async function getUsers() {
        const response = await fetch('http://localhost:4000/users/get', {
            method: "GET",
        });
        const data = await response.json();
        dispatch(setUsers({ users: data}))
        // getProjectTeam();
        // getNotTeamUsers();
    }

    // const getProjectTeam = useCallback(async () => {
    //     const response = await fetch(`http://localhost:4000/projects/${projectId}/team`, {
    //         method: "GET",
    //         headers: { Authorization: `Bearer ${token}` },
    //     });
    //     const data = await response.json();
    //     setProjectTeam(data);
    // }, [projectTeam])

    // Add a new person to the project
    async function newTicket(ev){
        ev.preventDefault();
        const response = await fetch(`http://localhost:4000/tickets/${projectId}/post`, {
          method: "POST",
          body: JSON.stringify({title, description, contributors, status, priority, type, timeEst, token, authorName}),
          headers: {'Content-Type': 'application/json'},
        });
        if (response.status === 200) {
          alert('new ticket added');
          setPageType("list");
          setTitle("")
          setDescription("")
          setStatus("")
          setPriority("")
          setType("")
          setTimeEst(0)
          setContributors([]);
          getTickets();
        } else {
          setTitle("")
          setDescription("")
          setStatus("")
          setPriority("")
          setType("")
          setTimeEst("")
          setContributors([]);
        }
    }
    
    async function newComment(ev){
        ev.preventDefault();
        const response = await fetch(`http://localhost:4000/tickets/${ticketData._id}/comments/post`, {
            method: "POST",
            body: JSON.stringify({comment}),
            headers: { Authorization: token, 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            alert('new comment added');
            setComment("");
            getComments(ticketId);
        } else {
            alert('comment failed')
        }
    }


    async function getComments(ticketId) {
        const response = await fetch(`http://localhost:4000/tickets/${ticketId}/comments`, {
            method: "GET",
            headers: { Authorization: token },
        });
        const responseData = await response.json();
        console.log(responseData)
        dispatch(setViewComments({ viewComments: responseData}))
    }

    function viewTicketData(selectedData) {
        setTicketData(selectedData)
        setPageType("view")
    }


    // Used to display all the options for people not on the team to add
    // const getNotTeamUsers = useCallback(async () => {
    //     const team = project.contributorNames;
    //     const total = getFullNames();
    //     const notTeam = total.filter(name => !team.includes(name));
    //     setNotTeam(notTeam);
    // }, [notTeam])
    // function getNotTeamUsers() {
    //     const team = project.contributorNames;
    //     const total = getFullNames();
    //     const notTeam = total.filter(name => !team.includes(name));
    //     setNotTeam(notTeam);
    // }

    return (
        <>
            <BlockBox
                gridArea="b"
                minWidth="615px"
            >
                <Box
                    pt="1rem"
                    pl="1rem"
                    pr="1rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box
                    >
                        <Typography variant="h3" fontSize="18px">Assigned Tickets</Typography>
                    </Box>
                    <Box
                    height="2rem"
                    >
                        {(isList || isView) && (
                            <Button
                            variant="outlined" 
                            color="secondary"
                            onClick={() => {
                            setPageType("new");
                            }}
                            >
                                Add Ticket
                            </Button>
                        )}
                    </Box>
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
                            sx={{minWidth: "600px"}}
                            columnHeaderHeight={25}
                            getRowHeight={() => 'auto'}
                            hideFooter={true}
                            rows={tickets || []}
                            columns={ticketsColumns}
                            onRowSelectionModelChange={async (id) => {
                                const ticketId = id.pop()
                                const ticket = tickets.find((ticket) => ticket.id === ticketId)
                                console.log(ticket)
                                setTicketId(ticketId);
                                setTicketData(ticket)
                                getComments(ticketId)
                                setPageType("view")
                                // const selectedRowData = ids.map((id) => tickets.find((ticket) => ticket.id === id));
                                // const selectedData = selectedRowData.pop()
                                // setTicketData(selectedData)
                                // setPageType("view")
                            }}
                        />
                    </Box>
                
            </BlockBox>
            {isNew && (
              <BlockBox
              gridArea="c"
              minWidth="615px"
              >
                <Box
                pt="1rem"
                pl="1rem"
                pr="1rem"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                >
                    <Typography variant="h3" fontSize="18px">New Ticket</Typography>
                </Box>
                <Box
                    height="100%"
                    width="100%"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="stretch"
                    >
                        <form onSubmit={newTicket}>
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
                                            {project.contributorNames.map((name) => (
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
                                    <Button type="submit" variant="outlined" color="secondary" sx={{height: "2.5rem"}}>Create</Button>
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
                                    {isNew && (
                                    <Button sx={{height: "2.5rem"}} variant="outlined" color="secondary" onClick={() => {setPageType("list");}}>Cancel</Button>
                                    )}
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
              </BlockBox>
            )}
            {isView && (
                <>
                    <BlockBox
                    gridArea="c"
                    minWidth="615px"
                    >
                        <Box
                        display="flex"
                        flexDirection="column"
                        gap="1.5rem"
                        >
                            <Box
                            pt="1rem"
                            pl="1rem"
                            pr="1rem"
                            pb="0.5rem"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            borderBottom="solid"
                            borderColor={palette.grey[600]}
                            >
                                <Typography variant="h3" fontSize="18px">Ticket Information</Typography>
                            </Box>
                            <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"

                            borderColor={palette.grey[600]}
                            >
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Typography variant="h5" fontSize="16px">Title</Typography>
                                    <Typography variant="h3" fontSize="22px">{ticketData.title}</Typography>                                
                                </Box>
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Typography variant="h5" fontSize="18px">Description</Typography>
                                    <Typography variant="h3" fontSize="22px">{ticketData.description}</Typography> 
                                </Box>
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Typography variant="h5" fontSize="18px">Author</Typography>
                                    <Typography variant="h3" fontSize="22px">{ticketData.authorName}</Typography> 
                                </Box>
                            </Box>
                            <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            borderBottom="solid"
                            borderColor={palette.grey[600]}
                            >
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Typography variant="h5" fontSize="18px">Priority</Typography>
                                    <Typography variant="h3" fontSize="22px">{ticketData.priority}</Typography> 
                                </Box>
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Typography variant="h5" fontSize="18px">Status</Typography>
                                    <Typography variant="h3" fontSize="22px">{ticketData.status}</Typography> 
                                </Box>
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Typography variant="h5" fontSize="18px">Type</Typography>
                                    <Typography variant="h3" fontSize="22px">{ticketData.type}</Typography> 
                                </Box>
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Typography variant="h5" fontSize="18px">Time Estimate(hours)</Typography>
                                    <Typography variant="h3" fontSize="22px">{ticketData.time}</Typography> 
                                </Box>
                            </Box>
                            <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            >
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Typography variant="h5" fontSize="18px">Assigned</Typography>
                                    <Typography variant="h3" fontSize="22px">{ticketData.assignedNames.join(", ")}</Typography> 
                                </Box>
                                <Box
                                p="0.5rem"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                                gap="0.5rem"
                                >
                                    <Button 
                                    variant="outlined" 
                                    color="secondary"
                                    onClick={() => {
                                    setPageType("list");
                                    }}
                                    >
                                        Close
                                    </Button>
                                </Box>
                            </Box>         
                        </Box>
                    </BlockBox>
                    <BlockBox
                    gridArea="d"
                    >
                        <Box
                        display="flex"
                        flexDirection="column"
                        gap="1.5rem"
                        >
                            <Box
                            pt="1rem"
                            pl="1rem"
                            pr="1rem"
                            pb="0.5rem"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            borderBottom="solid"
                            borderColor={palette.grey[600]}
                            >
                                <Typography variant="h3" fontSize="18px">Comments</Typography>
                            </Box>
                            <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            gap="1.5rem"
                            >
                                <Box
                                mt="0.5rem"
                                p="0 0.5rem"
                                height="100%"
                                width="100%"
                                display="flex"
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        // the & targets a class, in the child compnent-> datagrid!
                                        color: palette.grey[100],
                                        border: "none",
                                        fontSize: "1rem",
                                        minWidth: "15rem"
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderbottom: `1px solid ${palette.grey[800]} !important`,
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        display: "none",
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
                                        sx={{height: "10rem", width: "22rem"}}
                                        columnHeaderHeight={25}
                                        getRowHeight={() => 'auto'}
                                        hideFooter={true}
                                        rows={comments || []}
                                        columns={ticketCommentsColumns}
                                    />
                                </Box>
                                <Box>
                                    <form onSubmit={newComment}>
                                        <Stack spacing={2} direction="row" sx={{marginBottom: 4}}> 
                                            <FormControl variant="standard" required sx={{ width: "15rem" }}>
                                                <TextField
                                                    id="comments"
                                                    onChange={ev => setComment(ev.target.value)}
                                                    value={comment}
                                                    label="Enter a comment here"
                                                    style={{background: palette.grey[100], height: "3rem"}}
                                                />
                                            </FormControl>
                                            <Button 
                                            variant="outlined" 
                                            color="secondary"
                                            type="submit"
                                            >
                                                Comment
                                            </Button>
                                        </Stack>
                                    </form>
                                </Box>
                            </Box>
                        </Box>
                    </BlockBox>
                </>
            )}

        </>
    )
}

export default TicketList