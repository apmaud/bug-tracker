import { useMemo } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Landing from "@/scenes/landingPage"
import Login from "@/scenes/loginPage";
import Register from "@/scenes/registerPage";
import Tickets from "@/scenes/ticketsPage";
import Admin from "@/scenes/adminPage";
import Navbar from "@/components/NavigationBar";
import { UserContextProvider } from "./UserContext";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <UserContextProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box height="100%" width="100%" display="flex" justifyContent="flex-start">
              <Navbar />
              <Box
                className="content"
                height="100%" 
                width="100%"
              >
                <Routes>
                  <Route path ="/" element={<Landing />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Box>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  )
}

export default App
