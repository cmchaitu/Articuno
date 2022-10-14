import { AppBar, FormControlLabel, FormGroup, Switch, Toolbar, Typography } from "@mui/material";
import artlogo from '../layout/articuno.png';

interface Props {
    checked: boolean,
    handlechange: () => void
}

export default function Header({ checked, handlechange }: Props) {
    return (
        <AppBar sx={{ mb: 4 }} position="static" color='inherit'>
            <Toolbar>
                <img src={artlogo} className="App-logo" alt="logo" />

                <Typography variant="h1" color='primary' >
                    Articuno
                </Typography>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={checked} onChange={handlechange} color="primary" aria-label='Dark'
                    />} label="Dark Mode" />
                </FormGroup>

            </Toolbar>
        </AppBar>)
}