import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import aboutpage from '../../features/about/aboutpage';
import BasketPage from '../../features/Basket/BasketPage';
import Catalog from '../../features/catalog/catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import CheckOutPage from '../../features/checkout/CheckoutPage';
import contactpage from '../../features/contact/contactpage';
import HomePage from '../../features/home/homepage';
import agent from '../api/agent';
import { useStoreContext } from '../context/StoreContext';
import NotFound from '../Errors/NotFound';
import ServerError from '../Errors/ServerError';
import { getCookie } from '../util/util';
import './App.css';
import Header from './Header';
import LoadingComponent from './LoadingComponent';

function App() {
    const { setBasket } = useStoreContext();
    const [loading, setloading] = useState(true);
    useEffect(() => {
        const buyerID = getCookie("buyerID");
        if (buyerID) {
            agent.Basket.get().then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setloading(false))
        }
        else setloading(false);
    }, [setBasket])

    const [mode, setmode] = useState(false)
    const palettetype = mode ? 'dark' : 'light'
    function handlechange() {
        setmode(!mode)
    }

    const theme = createTheme({
        palette: { mode: palettetype }
    })
    if (loading) { return <LoadingComponent message="Initializing App ....." /> }

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
                    <Route path='/basket' component={BasketPage} />
                    <Route path='/checkout' component={CheckOutPage} />
                    <Route component={NotFound} />
                </Switch>

            </Container>
        </ThemeProvider>
    );
}
export default App;