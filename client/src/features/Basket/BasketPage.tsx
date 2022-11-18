import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../App/api/agent";
import { useStoreContext } from "../../App/context/StoreContext";
import { PriceFormat } from "../../App/util/util";
import BasketSummary from "./BasketSummary";
import { Link } from 'react-router-dom';
export default function BasketPage() {
    const { basket, setBasket, removeItem } = useStoreContext();
    const [loading, setloading] = useState(false);
    function handleAddItem(productid: number) {
        setloading(true);
        agent.Basket.addItem(productid)
            .then((basket) => setBasket(basket))
            .catch((error) => console.log(error))
            .finally(() => setloading(false));
    }
    function handleRemoveItem(productid: number, quantity = 1) {
        setloading(true);
        agent.Basket.removeItem(productid, quantity).then(() => removeItem(productid, quantity))
            .catch((e) => console.log(e)).finally(() => setloading(false));
    }
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
                                        <img src={item.pictureURL} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{PriceFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={() => handleRemoveItem(item.productID)} color='error'> <Remove sx={{ fontSize: "15px" }} /> </IconButton>
                                    {item.quantity}
                                    <IconButton onClick={() => handleAddItem(item.productID)} color='success'> <Add sx={{ fontSize: "15px" }} /> </IconButton>
                                </TableCell>
                                <TableCell align="right">{PriceFormat(item.price * item.quantity)}</TableCell>
                                <TableCell align="right"><IconButton onClick={() => handleRemoveItem(item.productID, item.quantity)} color='error'><Delete />
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