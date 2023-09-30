import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import ProjectList from './ProjectList';
import TicketPriority from './TicketPriority';
import TicketStatus from './TicketStatus';
import TicketType from './TicketType';
import Vnavbar from '@/components/vNavigationBar';
import Hnavbar from "@/components/hNavigationBar";
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { setTickets } from '@/state';
import { useEffect, useState } from 'react';

const gridTemplateLargeScreens = `
    "h h h"
    "a a a"
    "a a a"
    "a a a"
    "a a a"
    "e e e"
    "e e e"

`;

const gridTemplateSmallScreens = `
  "h"
  "a"
  "a"
  "e"
`;

const gridTemplatePieCharts = `
  "b c d"
`;



const Landing = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  // const tickets = useSelector((state) => state.tickets);
  const token = useSelector((state) => state.token);
  const [tickets, setTickets] = useState([])
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
  useEffect(() => {
        getTickets();
  },[]);
  const isAboveMediumScreens = useMediaQuery("(min-width: 800px)")
  return (
    <Box 
      height="100%" 
      width="100%"
      sx={
        isAboveMediumScreens
            ? {
                display: "flex",
                justifyContent: "flex-start",
                gridTemplateAreas: gridTemplateLargeScreens,
                gap: "3rem",
              } 
            : {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                gridTemplateAreas: gridTemplateSmallScreens,
              }
      }
    >

        {isAboveMediumScreens && (
          <Vnavbar current="dashboard"/>
        )}
        {!isAboveMediumScreens && (
          <Box
          minWidth="765px"
          >
            <Hnavbar current="dashboard" />
          </Box>
        )}

      <Box
        width="100%" 
        height="100%" 
        display="grid"
        gap="3rem"
        sx={
          isAboveMediumScreens
              ? {
                  gridAutoColumns: "1fr 1fr 1fr",
                  // gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                  gridAutoRows: "80px",
                  gridTemplateAreas: gridTemplateLargeScreens,
                  paddingTop: "6rem",
                } 
              : {
                  gridTemplateColumns: "minmax(765px, 1fr)",
                  gridAutoRows: "1fr",
                  gridTemplateAreas: gridTemplateSmallScreens,
                  paddingTop: "3rem",
                }
        }
      >
        <Header />
        <ProjectList />
        <Box
          gridArea="e"
          display="grid"
          sx={{gridTemplateAreas: gridTemplatePieCharts}}
        >
          <TicketPriority 
            tickets={tickets}
          />
          <TicketStatus 
            tickets={tickets}
          />
          <TicketType 
            tickets={tickets}
          />
        </Box>

      </Box>
    </Box>
  )
}

export default Landing