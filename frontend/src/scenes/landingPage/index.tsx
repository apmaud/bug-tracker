import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import ProjectList from './ProjectList';
import TicketPriority from './TicketPriority';
import TicketStatus from './TicketStatus';
import TicketType from './TicketType';
import Vnavbar from '@/components/vNavigationBar';
import Hnavbar from "@/components/hNavigationBar";
import Header from './Header';

const gridTemplateLargeScreens = `
    "h h h"
    "a a a"
    "a a a"
    "a a a"
    "b c d"
    "b c d"

`;

const gridTemplateSmallScreens = `
  "h"
  "a"
  "a"
  "b"
  "c"
  "d"
`;



const Landing = () => {
  const { palette } = useTheme();
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
        <TicketPriority />
        <TicketStatus />
        <TicketType />
      </Box>
    </Box>
  )
}

export default Landing