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

const vNavbar = (props) => {
    // grabs the theme settings from theme.ts, grabs the pallete object from exported themeSettings
    const { palette } = useTheme();
    // state determining what page we are on, so we can highlight the text for the page
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    const fullName = `${user.fullName}`;
    const selected = props.current
    return (
        <Box
            p="3rem 1.5rem 1rem 1.5rem"
            color={ palette.grey[300]}
            display="flex"
            flexDirection="column"
            justifyContent="stretch"
            alignItems="center"
            bgcolor={palette.background.light}
        >
            {/* TOP */}
            <Box 
                gap="0.75rem"
                display="flex"
                flexDirection="column"
                justifyContent="stretch"
                alignItems="center"
                paddingBottom="5rem"
            >
                <BugReportSharpIcon sx={{ fontSize: "38px" }} />
                <Typography variant="h4" fontSize="28px">Bug Tracker</Typography>
            </Box>
            {/* DIRECTORY */}
            <Box>
                <Box
                    gap="2rem"
                    display="flex"
                    flexDirection="column"
                    justifyContent="stretch"
                    alignItems="flex-start"
                >

                    {/* DASHBOARD TAB */}

                    <Box 
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ "&:hover": {color: palette.primary[100]}}}
                    >
                        <GridViewSharpIcon
                            sx={{ fontSize: "24px", marginRight: "2px"}}
                        />
                        <Link
                            to="/dashboard"
                            style={{
                                color: selected === "dashboard" ? "inherit" : palette.grey[700],
                                textDecoration: "inherit",
                                fontSize: "20px",
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
                        justifyContent="space-between"
                        sx={{ "&:hover": {color: palette.primary[100]}}}
                    >
                        <ConfirmationNumberSharpIcon
                            sx={{ fontSize: "24px", marginRight: "2px"}}
                        />
                        <Link
                            to="/tickets"
                            style={{
                                color: selected === "tickets" ? "inherit" : palette.grey[700],
                                textDecoration: "inherit",
                                fontSize: "20px",
                                paddingLeft: "1rem"
                            }}
                        >
                            Tickets
                        </Link>
                    </Box>

                    {/* ADMINISTRATION TAB */}

                    <Box 
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ "&:hover": {color: palette.primary[100]}}}
                    >
                        <AdminPanelSettingsSharpIcon
                            sx={{ fontSize: "24px", marginRight: "2px"}}
                        />
                        <Link
                            to="/admin"
                            style={{
                                color: selected === "admin" ? "inherit" : palette.grey[700],
                                textDecoration: "inherit",
                                fontSize: "20px",
                                paddingLeft: "1rem"
                            }}
                        >
                            Administration
                        </Link>
                    </Box>

                    {/* LOGIN TAB AND LOGIN TABS */}
                    
                            <Box
                            gap="2rem"
                            display="flex"
                            flexDirection="column"
                            justifyContent="stretch"
                            alignItems="flex-start"
                            paddingTop="275%"
                            >
                                <Box 
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ "&:hover": {color: palette.primary[100]}}}
                                >
                                    <LoginIcon
                                        sx={{ fontSize: "24px", marginRight: "2px"}}
                                    />
                                    <Link
                                        to="/"
                                        onClick={() => dispatch(setLogout())}
                                        style={{
                                            color: selected === "login" ? "inherit" : palette.grey[700],
                                            textDecoration: "inherit",
                                            fontSize: "20px",
                                            paddingLeft: "1rem"
                                        }}
                                    >
                                        Logout
                                    </Link>
                                    
                                </Box>
                                <Typography variant="h4" fontSize="20px">{fullName}</Typography>
                            </Box> 
                            
                </Box>
            </Box>
        
        </Box>
    )
}

export default vNavbar