import React from 'react'
import Navbar from '@/components/vNavigationBar';
import { Box, useMediaQuery, useTheme } from '@mui/material'

const Admin = () => {
  return (
    <Box height="100%" width="100%" display="flex" justifyContent="flex-start">
      <Navbar current="admin"/>
      <Box></Box>
    </Box>
  )
}

export default Admin