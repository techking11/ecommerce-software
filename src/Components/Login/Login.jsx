import { Box, Button, FormControl, Input, InputAdornment, InputLabel, Paper, Typography } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';

import "./Login.css";

function Login() {
    return <Box className="box">
        <Paper elevation={3} sx={{ p: 10, width: 600 }}>
            <Typography variant="h5" component="h2" color="primary">
                Login Form
            </Typography>
            <FormControl fullWidth variant="standard" sx={{ mt: 3 }}>
                <InputLabel
                    htmlFor="emailId" className="label">Enter your email.</InputLabel>

                <Input
                    id="emailId"
                    startAdornment={
                        <InputAdornment position="start">
                            <MailIcon />
                        </InputAdornment>}
                />
            </FormControl>

            <FormControl fullWidth variant="standard" sx={{ my: 4 }}>
                <InputLabel
                    htmlFor="passwordId">Enter your password.</InputLabel>

                <Input
                    id="passwordId"
                    startAdornment={
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button
                variant="contained" color="primary" sx={{ textTransform: 'capitalize' }}>Login</Button>
        </Paper>
    </Box>
}

export default Login;