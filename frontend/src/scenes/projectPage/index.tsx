import { Box, useMediaQuery, useTheme } from '@mui/material'
import Vnavbar from '@/components/VnavigationBar';
import Hnavbar from "@/components/HnavigationBar";
import Team from './Team';
import TicketInfo from './TicketInfo';
import TicketList from './Tickets';
import Header from './Header';

const gridTemplateLargeScreens = `
    "h h h h h"
    "a a b b b"
    "a a b b b"
    "a a b b b"
    "c c c d d"
    "c c c d d"
    "c c c d d"
`;

const gridTemplateSmallScreens = `
    "h"
    "a"
    "b"
    "b"
    "c"
    "c"
    "d"
`;



const Project = () => {
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
                gap: "3rem"
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
          <Vnavbar />
        )}
        {!isAboveMediumScreens && (
          <Box
          minWidth="765px"
          >
            <Hnavbar />
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
                  gridAutoRows: "1fr",
                  gridTemplateAreas: gridTemplateLargeScreens,
                  paddingTop: "6rem",
                } 
              : {
                  gridTemplateColumns: "minmax(765px, 1fr)",
                  gridAutoRows: "auto",
                  gridTemplateAreas: gridTemplateSmallScreens,
                  paddingTop: "3rem",
                }
        }
      >
        <Header />
        <Team />
        <TicketList />
      </Box>
    </Box>
  )
}

export default Project