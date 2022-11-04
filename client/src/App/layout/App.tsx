import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import aboutpage from '../../features/about/aboutpage';
import Catalog from '../../features/catalog/catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import contactpage from '../../features/contact/contactpage';
import HomePage from '../../features/home/homepage';
import NotFound from '../Errors/NotFound';
import ServerError from '../Errors/ServerError';
import './App.css';
import Header from './Header';

function App() {
    const [mode, setmode] = useState(false)
    const palettetype = mode ? 'dark' : 'light'
    function handlechange() {
        setmode(!mode)
    }

    const theme = createTheme({
        palette: { mode: palettetype }
    })
    return (
        <ThemeProvider theme={theme}>
            <ToastContainer position='bottom-left' hideProgressBar />
            <CssBaseline />
            <Container>
                <Header checked={mode} handlechange={handlechange} />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/about' component={aboutpage} />
                    <Route path='/contact' component={contactpage} />
                    <Route exact path='/catalog' component={Catalog} />
                    <Route path='/catalog/:id' component={ProductDetails} />
                    <Route path='/server-error' component={ServerError} />
                    <Route component={NotFound} />
                </Switch>

            </Container>
        </ThemeProvider>
    );
}
export default App;