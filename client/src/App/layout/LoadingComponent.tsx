import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingComponent(props: any) {
    return (
        <><Typography sx={{ textAlign: 'center', mt: 20 }} variant="h6" color='primary'>
            {props.message}</Typography>
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