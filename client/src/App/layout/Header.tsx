import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, FormControlLabel, FormGroup, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import artlogo from '../layout/articuno.png';

interface Props {
    checked: boolean,
    handlechange: () => void
}

export default function Header({ checked, handlechange }: Props) {
    const midlinks =
        [
            { title: 'Catalog', path: '/catalog' },
            { title: 'About', path: '/about' },
            { title: 'Contact', path: '/contact' }
        ]

    const rightlinks =
        [
            { title: 'Login', path: '/login' },
            { title: 'Register', path: '/register' },

        ]

    return (
        <AppBar sx={{ mb: 4, bgcolor: 'royalblue ' }} position="sticky">
            <Toolbar>
                <img src={artlogo} className="App-logo" alt="logo" />

                <Typography variant="h3" color='white' sx={{ fontWeight: 'bold' }} >
                    Articuno
                </Typography>
                <List sx={{ display: 'flex' }} >
                    {midlinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{
                                color: 'white',
                                typography: 'h6',
                                bgcolor: 'inherit',
                                '&:hover': { color: 'black' },
                                '&.active': { color: 'black', fontWeight: 'bold' }
                            }}

                        >{title}
                        </ListItem>

                    ))
                    }
                    <IconButton sx={{
                        color: 'white',
                        '&:hover': { color: 'black' }
                    }} >
                        <Badge badgeContent={4}>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </List>

                <List sx={{ display: 'flex' }} >
                    {rightlinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{ typography: 'h6', bgcolor: 'secondary' }}
                        >{title}
                        </ListItem>

                    ))
                    }

                </List>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={checked} onChange={handlechange} color="primary" aria-label='Dark'
                    />} label="Dark Mode" />
                </FormGroup>

            </Toolbar>
        </AppBar >)
}