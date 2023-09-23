import { Box, useMediaQuery, useTheme } from '@mui/material'
import Vnavbar from '@/components/vNavigationBar';
import Hnavbar from "@/components/hNavigationBar";

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



const Tickets = () => {
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
          <Vnavbar current="tickets"/>
        )}
        {!isAboveMediumScreens && (
          <Box
          minWidth="765px"
          >
            <Hnavbar current="tickets" />
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
                  paddingTop: "12rem",
                } 
              : {
                  gridTemplateColumns: "minmax(765px, 1fr)",
                  gridAutoRows: "1fr",
                  gridTemplateAreas: gridTemplateSmallScreens,
                  paddingTop: "3rem",
                }
        }
      >

      </Box>
    </Box>
  )
}

export default Tickets