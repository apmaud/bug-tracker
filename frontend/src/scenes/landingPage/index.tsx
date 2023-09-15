import { Box, useMediaQuery, useTheme } from '@mui/material'
import ProjectList from './ProjectList';
import TicketPriority from './TicketPriority';
import TicketStatus from './TicketStatus';
import TicketType from './TicketType';
import Navbar from '@/components/NavigationBar';

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
    <Box height="100%" width="100%" display="flex" justifyContent="flex-start">
      <Navbar current="dashboard"/>
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
    </Box>
  )
}

export default Landing