import { Box, Stack, TextField, Typography, useTheme, makeStyles, FormControl, InputLabel, Button } from '@mui/material';
import RegistrationBox from './RegistrationBox';

const Register = () => {
  const { palette } = useTheme();
  return (
    <Box
      width="100%" 
      height="100%" 
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <RegistrationBox />
    </Box>
    )
}

export default Register