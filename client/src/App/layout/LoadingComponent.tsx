import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingComponent() {
    return (
        <><Typography sx={{ textAlign: 'center', mt: 20 }} variant="h6" color='primary'>
            Loading..</Typography>
            <Box sx={{
                mt: 2,
                justifyContent: "center",
                alignItems: "center", display: 'flex'
            }}>
                <CircularProgress />
            </Box>
        </>
    );
}

export default LoadingComponent;