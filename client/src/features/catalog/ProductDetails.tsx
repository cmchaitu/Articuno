import { Button, Divider, Grid, ImageListItem, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../App/Errors/NotFound";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { PriceFormat } from "../../App/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "../Basket/BasketSlice";
import { fetchProductAsync, productselectors } from "./catalogslice";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { basket } = useAppSelector(state => state.basket);
    //todo add loading button and use status from appselector
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => productselectors.selectById(state, id));
    const [quantity, setquantity] = useState(0);
    const item = basket?.items.find(i => i.productID === product?.id);
    const { status: productstatus } = useAppSelector(state => state.catalog)
    useEffect(() => {
        if (item) setquantity(item.quantity);
        if (!product) dispatch(fetchProductAsync(id));
    }, [id, item, dispatch, product])

    function onChangeQuantity(event: any) {
        if (event.target.value >= 0) {
            setquantity(parseInt(event.target.value));
        }
    }
    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedquantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productID: product?.id!, quantity: updatedquantity }))
        } else {
            const updatedquantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productID: product?.id!, quantity: updatedquantity }))
        }
    }

    if (productstatus.includes('pending')) {
        return (<LoadingComponent message="Product Details...." />)
    }

    if (!product) return <NotFound />
    return (
        <>

            <Typography sx={{ textAlign: 'center', mt: 20 }} variant="h4" color='primary'>
                {product.name}</Typography>
            <Grid sx={{ mt: 2 }} container spacing={0}>

                <Grid item xs={2}>
                    <ImageListItem key={product.id} sx={{ width: '500', height: '500' }}>
                        <img
                            src={product.pictureUrl}
                            alt={product.name}
                            loading="lazy"
                        />
                    </ImageListItem>
                </Grid>
                <Divider orientation="vertical" flexItem>
                    Details
                </Divider>
                <Grid item xs={8}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">

                        <TableBody sx={{ align: 'center' }}>
                            <TableRow

                            >
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Brand</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Price</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="center">QuantityinStock</TableCell>
                            </TableRow>
                            <TableRow
                                key={product.id}

                            >

                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{PriceFormat(product.price)}</TableCell>
                                <TableCell align="center">{product.description}</TableCell>
                                <TableCell align="center">{product.quantityInStock}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={onChangeQuantity}
                                variant="outlined"
                                type="number"
                                label="Quantity in Cart"
                                value={quantity}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                disabled={item?.quantity === quantity || (!item && quantity === 0)}
                                onClick={handleUpdateCart}
                                sx={{ height: '55px' }}
                                color='primary'
                                fullWidth size='large'
                                variant='contained' >{item ? 'Update' : 'Add'}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}