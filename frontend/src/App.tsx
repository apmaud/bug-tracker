import { useContext, useEffect, useMemo, useState } from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Landing from "@/scenes/landingPage"
import Login from "@/scenes/loginPage";
import Register from "@/scenes/registerPage";
import Tickets from "@/scenes/ticketsPage";
import Admin from "@/scenes/adminPage";
import LoginRegister from "@/scenes/loginRegisterPage";
import Project from "@/scenes/projectPage";
import { useSelector } from "react-redux";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const isAuth = Boolean(useSelector((state) => state.token));
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
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <Box height="100%" width="100%" display="flex" justifyContent="flex-start">
              <Box
                className="content"
                height="100%"
                width="100%"
              >
                <Routes>
                  <Route path="/" element={<LoginRegister />} />
                  <Route path ="/dashboard" element={isAuth ? <Landing /> : <Navigate to="/" />} />
                  <Route path="/tickets" element={isAuth ? <Tickets /> : <Navigate to="/" />} />
                  <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/dashboard" />} />
                  <Route path="/projects/:projectId" element={isAuth ? <Project /> : <Navigate to="/" />} />
                </Routes>
              </Box>
            </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
