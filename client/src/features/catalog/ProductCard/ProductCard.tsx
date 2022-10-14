import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../../App/Models/Product";
interface Props {
    product: Product
}
export default function ProductCard({ product }: Props) {
    return (
        <Card >
            <CardHeader
                avatar=
                {
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }

                title={product.name}

                titleTypographyProps={{
                    sx: { fontWeight: 'bold' }
                }}
            />
            {/*image="https://picsum.photos/200" https://lorempokemon.fakerapi.it/pokemon/200/*/}
            <CardMedia
                component="img"
                height="300"
                image={product.pictureUrl}
                alt="Image failed to load"
                sx={{ bgcolor: 'secondary.light' }}
            />
            <CardContent>
                <Typography gutterBottom color='secondary' variant="h6" component="div">
                    ${product.price / 100}
                </Typography>
                <Typography variant="body2" color='secondary'>
                    Type: {product.type}-- Brand: {product.brand}

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>

        //<ListItem key={product.id}>
        //    <ListItemAvatar><Avatar variant="square" src='https://lorempokemon.fakerapi.it/pokemon/200' />
        //    </ListItemAvatar>
        //    {product.name} - {product.price}
        //</ListItem>
    )
}