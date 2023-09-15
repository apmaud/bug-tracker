import React from 'react'
import Navbar from '@/components/NavigationBar'
import { Box, useMediaQuery, useTheme } from '@mui/material'

const Tickets = () => {
  return (
    <Box height="100%" width="100%" display="flex" justifyContent="flex-start">
      <Navbar current="tickets"/>
      <Box></Box>
    </Box>
  )
}

export default Tickets