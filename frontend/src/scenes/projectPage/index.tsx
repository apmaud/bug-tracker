import { Box, useMediaQuery, useTheme } from '@mui/material'
import Vnavbar from '@/components/vNavigationBar';
import Hnavbar from "@/components/hNavigationBar";
import Team from './Team';
import TicketInfo from './TicketInfo';
import TicketList from './TicketList';
import Header from './Header';

const gridTemplateLargeScreens = `
    "h h h"
    "a b b"
    "a b b"
    "c c c"
    "c c c"
`;

const gridTemplateSmallScreens = `
    "h"
    "a"
    "b"
    "b"
    "c"
    "c"
`;



const Project = () => {
  const { palette } = useTheme();
  const isAboveMediumScreens = useMediaQuery("(min-width: 600px)")
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
        <TicketInfo />
      </Box>
    </Box>
  )
}

export default Project