import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Container sx={{ mt: 20 }} component={Paper}>

            <Typography variant='h3' color='error' gutterBottom>
                Not Found</Typography>
            <Divider />

            <Button sx={{ color: 'error' }} component={Link} to={`/catalog`} size="small">
                Go Back to Store
            </Button>
        </Container >);
}

export default NotFound;