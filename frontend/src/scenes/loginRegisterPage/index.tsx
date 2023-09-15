import { Box, Stack, TextField, Typography, useTheme, makeStyles, FormControl, InputLabel, Button } from '@mui/material';
import Form from './Form';

const loginRegisterPage = () => {
  const { palette } = useTheme();
  return (
    <Box
      width="100%" 
      height="100%" 
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Form />
    </Box>
    )
}

export default loginRegisterPage