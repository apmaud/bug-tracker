import { useContext, useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import BugReportSharpIcon from '@mui/icons-material/BugReportSharp';
import { Box, Typography, useTheme } from '@mui/material'
import ConfirmationNumberSharpIcon from '@mui/icons-material/ConfirmationNumberSharp';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useDispatch } from "react-redux";
import { setLogout } from "@/state";
import { useSelector } from "react-redux";

const Hnavbar = (props) => {
    // grabs the theme settings from theme.ts, grabs the pallete object from exported themeSettings
    const { palette } = useTheme();
    // state determining what page we are on, so we can highlight the text for the page
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const fullName = `${user.firstName} ${user.lastName}`;
    const selected = props.current
    const isAdmin = useSelector((state) => {
        if (state.role === "Administrator") {
          return true
        }
        else {
          return false
        }
      }
    );

    return (
        <Box
            width="1fr"
            height="100%"
            p="2rem 1rem 2rem 1rem"
            color={ palette.grey[300]}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            bgcolor={palette.background.light}
        >
            {/* DIRECTORY */}
            <Box>
                <Box
                    gap="1rem"
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                >
                    {/* HEADER */}
                    <Box 
                        gap="1rem"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        minWidth="0"
                    >
                        <BugReportSharpIcon sx={{ fontSize: "auto" }} />
                        <Typography variant="h4" fontSize="20px">Bug Tracker</Typography>
                    </Box>
                    {/* DASHBOARD TAB */}

                    <Box 
                        display="flex"
                        flexDirection="column"
                        gap="1rem"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ "&:hover": {color: palette.primary[100]}}}
                    >
                        <GridViewSharpIcon
                            sx={{ fontSize: "auto", marginRight: "2px"}}
                        />
                        <Link
                            to="/dashboard"
                            style={{
                                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                                textDecoration: "inherit",
                                fontSize: "18px",
                                paddingLeft: "1rem"
                            }}
                        >
                            Dashboard
                        </Link>
                    </Box>

                    {/* TICKETS TAB */}

                    <Box 
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        gap="1rem"
                        justifyContent="space-between"
                        sx={{ "&:hover": {color: palette.primary[100]}}}
                    >
                        <ConfirmationNumberSharpIcon
                            sx={{ fontSize: "auto", marginRight: "2px"}}
                        />
                        <Link
                            to="/tickets"
                            style={{
                                color: selected === "tickets" ? "inherit" : palette.grey[700],
                                textDecoration: "inherit",
                                fontSize: "18px",
                                paddingLeft: "1rem"
                            }}
                        >
                            Tickets
                        </Link>
                    </Box>

                    {/* ADMINISTRATION TAB */}
                    {isAdmin && (
                    <Box 
                        display="flex"
                        alignItems="center"
                        flexDirection="column"
                        gap="1rem"
                        justifyContent="space-between"
                        sx={{ "&:hover": {color: palette.primary[100]}}}
                    >
                        <AdminPanelSettingsSharpIcon
                            sx={{ fontSize: "auto", marginRight: "2px"}}
                        />
                        <Link
                            to="/admin"
                            style={{
                                color: selected === "admin" ? "inherit" : palette.grey[700],
                                textDecoration: "inherit",
                                fontSize: "18px",
                                paddingLeft: "1rem"
                            }}
                        >
                            Administration
                        </Link>
                    </Box>
                    )}
                    {/* LOGIN TAB AND LOGIN TABS */}
                    
                    <Box 
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    gap="1rem"
                    justifyContent="space-between"
                    sx={{ "&:hover": {color: palette.primary[100]}}}
                    >
                        <LoginIcon
                            sx={{ fontSize: "auto", marginRight: "2px"}}
                        />
                        <Link
                            to="/"
                            onClick={() => dispatch(setLogout())}
                            style={{
                                color: selected === "login" ? "inherit" : palette.grey[700],
                                textDecoration: "inherit",
                                fontSize: "18px",
                                paddingLeft: "1rem"
                            }}
                        >
                            Logout
                        </Link>
                    </Box>   
                    <Typography paddingTop="40px" variant="h4" fontSize="18px">{fullName}</Typography>             
                </Box>
            </Box>
        
        </Box>
    )
}

export default Hnavbar