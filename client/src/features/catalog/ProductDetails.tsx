import { Button, Divider, Grid, ImageListItem, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../App/api/agent";
import NotFound from "../../App/Errors/NotFound";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { Product } from "../../App/Models/Product";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { PriceFormat } from "../../App/util/util";
import { removeItem, setBasket } from "../Basket/BasketSlice";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { basket } = useAppSelector(state => state.basket);

    const dispatch = useAppDispatch();
    const [product, setproduct] = useState<Product | null>(null);
    const [loading, setloading] = useState(true);
    const [quantity, setquantity] = useState(0);
    const [submitting, setsubmitting] = useState(false);
    const item = basket?.items.find(i => i.productID == product?.id);

    useEffect(() => {
        if (item) setquantity(item.quantity);
        agent.catalog.details(id)
            .then(response => setproduct(response))
            .catch((error) => console.log(error))
            .finally(() => setloading(false))
    }, [id, item])
    function onChangeQuantity(event: any) {
        if (event.target.value >= 0) {
            setquantity(parseInt(event.target.value));
        }
    }
    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedquantity = item ? quantity - item.quantity : quantity;
            agent.Basket.addItem(product?.id!, updatedquantity)
                .then(basket => dispatch(setBasket(basket))).catch(e => console.log(e))
        } else {
            const updatedquantity = item.quantity - quantity;
            agent.Basket.removeItem(product?.id!, updatedquantity)
                .then(() => dispatch(removeItem({ productid: product?.id!, quantity: updatedquantity }))).catch(e => console.log(e))
        }
    }
    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
    if (loading) return (<LoadingComponent message="Product Details...." />)
    //if (!product) return <Typography sx={{ textAlign: 'center', mt: 20 }} variant="h6" color='primary'>
    //    Product not found..</Typography>
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
                                disabled={item?.quantity === quantity || !item && quantity === 0}
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