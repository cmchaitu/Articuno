import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, CssBaseline } from '@mui/material';
import Catalog from '../../features/catalog/catalog';
import './App.css';
import Header from './Header';

function App() {
    const theme = createTheme({
        palette: { mode: 'dark' }
    })
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Header />
                <Catalog />
            </Container>
        </ThemeProvider>
    );
}
export default App;