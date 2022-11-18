import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../App/api/agent";
import { useStoreContext } from "../../App/context/StoreContext";
import { Product } from "../../App/Models/Product";
import { PriceFormat } from "../../App/util/util";
interface Props {
    product: Product
}
export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);
    const { setBasket } = useStoreContext();
    function handleAddItem(productID: number) {
        setLoading(true);
        agent.Basket.addItem(productID)
            .then((basket) => setBasket(basket))
            .catch(error => console.log(error)).finally(() => setLoading(false))
    }
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
                {loading
                    ? <Button sx={{ color: 'white' }}
                        size="small"><CircularProgress size="small" /></Button>
                    :
                    <Button
                        onClick={() => handleAddItem(product.id)}
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