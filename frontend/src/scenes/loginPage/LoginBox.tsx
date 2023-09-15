import BlockBox from '@/components/BlockBox'
import { Button, FormControl, Stack, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { BootstrapInput } from '../../components/TextField'
import { UserContext } from '@/UserContext'
import { Navigate } from 'react-router-dom'

const RegistrationBox = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUserInfo } = useContext(UserContext);

    async function login(ev){
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/users/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        } else {
            alert('wrong credentials');
        }
    }
    return (
        <BlockBox
        minHeight="500px"
        minWidth="500px"
        width="65%" 
        height="65%" 
        display="flex"
        gap="3rem"
        paddingTop="10rem"
        flexDirection="column"
        alignItems="center"
        >
        <Typography variant="h3" fontSize="36px">Login</Typography>
        <form className="register" onSubmit={login}>
            <Stack spacing={2} direction="row" sx={{marginBottom: 4}}> 
                <FormControl variant="standard">
                    <Typography color="secondary">Username</Typography>
                    <BootstrapInput id="username" onChange={ev => setUsername(ev.target.value)} value={username}/>
                </FormControl>
                <FormControl variant="standard">
                    <Typography color="secondary">Password</Typography>
                    <BootstrapInput onChange={ev => setPassword(ev.target.value)} value={password}/>
                </FormControl>
            </Stack>
            <Button type="submit" variant="outlined" color="secondary">Login</Button>
        </form>
        </BlockBox>
    )
}

export default RegistrationBox