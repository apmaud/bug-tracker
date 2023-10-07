import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    FormControl, 
    Stack,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";
import { setPage } from "@/state";
import Dropzone from "react-dropzone";

import BlockBox from '@/components/BlockBox'
import { BootstrapInput } from '@/components/TextField'
import BugReportSharpIcon from '@mui/icons-material/BugReportSharp';
import { useSelector } from "react-redux";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    username: yup.string().email("invalid username").required("required"),
    password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    username: yup.string().email("invalid username").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
};

const initialValuesLogin = {
    username: "",
    password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/users/post', {
      method: 'POST',
      body: JSON.stringify({username, password, firstName, lastName}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
      setUsername('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setPageType("login");
    } else {
      setUsername('');
      setPassword('');
      setFirstName('');
      setLastName('');
      alert('registration failed');
    }
  }

  async function login(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'},
    });
    const loggedIn = await response.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
          role: loggedIn.role
        }),
      );
    };
    navigate("/dashboard");
  }

  async function handleFormSubmit(ev){
    if (isLogin) await login(ev);
    if (isRegister) await register(ev);
  }

  return (
    <BlockBox
        minHeight="500px"
        minWidth="500px"
        maxWidth="600px"
        maxHeight="600px"
        width="65%" 
        height="65%" 
        display="flex"
        gap="3rem"
        paddingTop="6.5rem"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
    >
      <Box
        display="flex"
        gap="1rem"
      >
        <BugReportSharpIcon sx={{ fontSize: "38px", color: palette.grey[100] }} />
        <Typography variant="h3" fontSize="36px" sx={{paddingBottom: "1rem"}}>Bug Tracker</Typography>
      </Box>
      <form onSubmit={handleFormSubmit}>
        <Typography variant="h3" fontSize="26px" sx={{paddingBottom: "1rem"}}>{isLogin ? "LOGIN" : "REGISTRATION"}</Typography>
          {isRegister && (
            <>
              <Stack spacing={2} direction="row" sx={{marginBottom: 4}}> 
                <FormControl variant="standard">
                  <Typography color="secondary">First Name</Typography>
                  <BootstrapInput onChange={ev => setFirstName(ev.target.value)} value={firstName}/>
                </FormControl>
                <FormControl variant="standard">
                  <Typography color="secondary">Last Name</Typography>
                  <BootstrapInput onChange={ev => setLastName(ev.target.value)} value={lastName}/>
                </FormControl>
              </Stack>
            </>
          )}
          <Stack spacing={2} direction="row" sx={{marginBottom: 4}}> 
            <FormControl variant="standard">
              <Typography color="secondary">Username</Typography>
              <BootstrapInput id="username" onChange={ev => setUsername(ev.target.value)} value={username}/>
            </FormControl>
            <FormControl variant="standard">
              <Typography color="secondary">Password</Typography>
              <BootstrapInput type="password" onChange={ev => setPassword(ev.target.value)} value={password}/>
            </FormControl>
          </Stack>
          <Button type="submit" variant="outlined" color="secondary">{isLogin ? "LOGIN" : "REGISTER"}</Button>
          <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
              }}
              sx={{
                paddingTop: "1rem",
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
        </form>
    </BlockBox>
  )
}
export default Form;