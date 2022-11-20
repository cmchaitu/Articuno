import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../App/Models/Product";
import { useAppDispatch, useAppSelector } from "../../App/store/configureStore";
import { PriceFormat } from "../../App/util/util";
import { addBasketItemAsync } from "../Basket/BasketSlice";
interface Props {
    product: Product
}
export default function ProductCard({ product }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card sx={{ bgcolor: 'cornflowerblue' }}>
            <CardHeader
                avatar=
                {
                    <Avatar sx={{
                        color: 'black',
                        bgcolor: 'white'
                    }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }

                title={product.name}

                titleTypographyProps={{
                    sx: { fontWeight: 'bold', color: 'white' }
                }}
            />
            {/*image="https://picsum.photos/200" https://lorempokemon.fakerapi.it/pokemon/200/*/}
            <CardMedia
                component="img"
                width='200' height='auto'
                image={product.pictureUrl}
                alt="Image failed to load"
                sx={{ bgcolor: 'cornflowerblue' }}
            />
            <CardContent>
                <Typography gutterBottom color='white' variant="h6" component="div">
                    {PriceFormat(product.price)}
                </Typography>
                <Typography variant="body2" color='white'>
                    Type: {product.type}
                </Typography>
                <Typography variant="body2" color='white'>
                    Brand: {product.brand}
                </Typography>
            </CardContent>
            <CardActions>
                {status.includes('pendingAddingBasketItem' + product.id)
                    ? <Button sx={{ color: 'white' }}
                        size="small"><CircularProgress size="small" /></Button>
                    :
                    <Button
                        onClick={() => dispatch(addBasketItemAsync({ productID: product.id }))}
                        sx={{ color: 'white' }}
                        size="small">Add to Cart
                    </Button>
                }
                <Button sx={{ color: 'white' }} component={Link} to={`/catalog/${product.id}`} size="small">
                    View
                </Button>
            </CardActions>
        </Card >

    )
}