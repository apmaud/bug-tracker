import BlockBox from '@/components/BlockBox'
import { Button, FormControl, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { BootstrapInput } from '../../components/TextField'

const RegistrationBox = () => {
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
        } else {
          alert('registration failed');
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
        <Typography variant="h3" fontSize="36px">Registration</Typography>
        <form className="register" onSubmit={register}>
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
            <Button type="submit" variant="outlined" color="secondary">Register</Button>
        </form>
        </BlockBox>
    )
}

export default RegistrationBox