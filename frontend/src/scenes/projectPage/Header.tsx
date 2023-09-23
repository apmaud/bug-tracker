import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Header = () => {
  useEffect(() => {
    getProjectName()
  }, [])
  const {projectId} = useParams();
  const [projectName, setProjectName] = useState()
  const token = useSelector((state) => state.token);
  async function getProjectName(){
    const response = await fetch(`http://localhost:4000/projects/${projectId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });
    const data = await response.json();
    setProjectName(data.name)
  }
  return (
    <>
        <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="flex-start"
            gridArea="h"
            paddingLeft="5rem"
            gap="10rem"
        >
            <Typography variant="h3" fontSize="28px">PROJECT</Typography>
            <Typography variant="h3" fontSize="28px">{projectName}</Typography>
        </Box>
    </>
  )
}

export default Header