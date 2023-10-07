import { Box, useMediaQuery, useTheme } from '@mui/material'
import Vnavbar from '@/components/VnavigationBar';
import Hnavbar from "@/components/HnavigationBar";
import TicketList from './UserList';
import Header from './Header';
import UserList from './UserList';

const gridTemplateLargeScreens = `
  "h h h"
  "a a a"
  "a a a"
  "a a a"
  "a a a"
  "a a a"
  "a a a"

`;

const gridTemplateSmallScreens = `
  "h"
  "a"
  "a"
  "a"
  "a"
  "."
`;



const Admin = () => {
  const { palette } = useTheme();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1008px)")
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
          <Vnavbar current="admin"/>
        )}
        {!isAboveMediumScreens && (
          <Box
          minWidth="765px"
          >
            <Hnavbar current="admin" />
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
        <UserList />
      </Box>
    </Box>
  )
}

export default Admin