import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, FormControlLabel, FormGroup, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import artlogo from '../layout/articuno.png';

interface Props {
    checked: boolean,
    handlechange: () => void
}

export default function Header({ checked, handlechange }: Props) {
    const { basket } = useStoreContext();

    const itemcount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

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
        <AppBar sx={{ bgcolor: 'cornflowerblue' }} position="absolute">
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box display='flex' alignItems='center'>
                    <img src={artlogo} className="App-logo" alt="logo" />
                    <Typography component={NavLink} to='/'
                        variant="h6" color='white' sx={{ fontWeight: 'bold', textDecoration: 'inherit' }} >
                        Articuno
                    </Typography>
                </Box>
                <Box display='flex' alignItems='center' >

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
                                    '&.active': { color: 'black' }
                                }}

                            >{title}
                            </ListItem>

                        ))
                        }
                    </List>

                </Box>
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' sx={{
                        color: 'white',
                        '&:hover': { color: 'black' }
                    }} >
                        <Badge badgeContent={itemcount}>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

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
                </Box>

            </Toolbar>
        </AppBar >)
}