import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { PriceFormat } from "../../App/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "./BasketSlice";
import BasketSummary from "./BasketSummary";
export default function BasketPage() {
    const { basket } = useAppSelector(state => state.basket);

    const dispatch = useAppDispatch();
    if (!basket)
        return (<Typography sx={{ mt: 20 }} component="h6" variant="h6" color='primary' >
            Basket is Empty
        </Typography>)

    return (
        <>
            <TableContainer sx={{ mt: 20 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Products</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureURL} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{PriceFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={() => dispatch(removeBasketItemAsync({ productID: item.productID, quantity: 1 }))
                                    } color='error'> <Remove sx={{ fontSize: "15px" }} /> </IconButton>
                                    {item.quantity}
                                    <IconButton onClick={() => dispatch(addBasketItemAsync({ productID: item.productID }))} color='success'> <Add sx={{ fontSize: "15px" }} /> </IconButton>
                                </TableCell>
                                <TableCell align="right">{PriceFormat(item.price * item.quantity)}</TableCell>
                                <TableCell align="right"><IconButton onClick={() => dispatch(removeBasketItemAsync({ productID: item.productID, quantity: item.quantity }))} color='error'><Delete />
                                </IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >CheckOut
                    </Button>
                </Grid>

            </Grid>
        </>
    )
}