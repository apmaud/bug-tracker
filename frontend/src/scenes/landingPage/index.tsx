import BlockBox from '@/components/BlockBox'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import ProjectList from './ProjectList';
import TicketPriority from './TicketPriority';
import TicketStatus from './TicketStatus';
import TicketType from './TicketType';

const gridTemplateLargeScreens = `
    "a a a"
    "a a a"
    "a a a"
    "b c d"
    "b c d"

`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "b"
  "c"
  "d"
`;



const Landing = () => {
  const { palette } = useTheme();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
  return (
    <Box
      width="100%" 
      height="100%" 
      display="grid"
      gap="3rem"
      paddingTop="12rem"
      sx={
        isAboveMediumScreens
            ? {
              gridAutoColumns: "1fr 1fr 1fr",
                // gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                gridAutoRows: "80px",
                gridTemplateAreas: gridTemplateLargeScreens,
              } 
            : {
                gridAutoColumns: "1fr",
                gridAutoRows: "1fr",
                gridTemplateAreas: gridTemplateSmallScreens,
              }
        }
    >

      <ProjectList />
      <TicketPriority />
      <TicketStatus />
      <TicketType />
    </Box>
  )
}

export default Landing