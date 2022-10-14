import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Catalog from '../../features/catalog/catalog';
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
            <CssBaseline />
            <Container>
                <Header checked={mode} handlechange={handlechange} />
                <Catalog />
            </Container>
        </ThemeProvider>
    );
}
export default App;