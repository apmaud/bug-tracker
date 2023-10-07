import { Box, Typography } from '@mui/material'

const Header = () => {
  return (
    <>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            gridArea="h"
            paddingLeft="5rem"
        >
            
            <Typography variant="h3" fontSize="28px">TICKETS ASSIGNED</Typography>
        </Box>
    </>
  )
}

export default Header