import { AppBar, Toolbar, Typography } from "@mui/material";
import artlogo from '../layout/articuno.png';

export default function Header() {
    return (
        <AppBar sx={{ mb: 4 }} position="static" color='inherit'>
            <Toolbar>
                <img src={artlogo} className="App-logo" alt="logo" />

                <Typography variant="h1" color='primary' >
                    Articuno
                </Typography>

            </Toolbar>
        </AppBar>)
}